import VueWrapper from '@/components/core/Vue/vue.wrapper';
import { dummyImage } from '@/globals';
import {
  CoreService,
  FirebaseService,
  LoaderService,
  LoginModel,
  Session,
  SessionModel,
  UserModel
} from '@/sdk';
import firebase from 'firebase/app';
import { Component } from 'vue-property-decorator';

@Component
export default class LoginComponent extends VueWrapper {
  // Properties
  public LoginData = new LoginModel();
  private FirebaseSrv = new FirebaseService();

  public async login() {
    const { Email, Password } = this.LoginData;
    new LoaderService().showLinearLoader('Logging in...');

    try {
      const { user } = await this.FirebaseSrv.Auth.signInWithEmailAndPassword(
        Email!,
        Password!
      );

      if (!user) {
        throw new Error('Something went wrong.');
      }

      this.saveSession(user);
    } catch (err) {
      new CoreService().showAlert(
        this.FirebaseSrv.getErrorMessage(err),
        'error'
      );
    } finally {
      new LoaderService().hideLinearLoader();
    }
  }

  public async thirdPartyLogin(type: 'google' | 'twitter' = 'google') {
    new LoaderService().showLinearLoader('Signing up with Google...');
    try {
      const { user } = await this.FirebaseSrv.Auth.signInWithPopup(
        new firebase.auth[
          type === 'twitter' ? 'TwitterAuthProvider' : 'GoogleAuthProvider'
        ]()
      );

      if (user?.uid) {
        const { empty } = await this.FirebaseSrv.Db.collection('/users')
          .where('email', '==', user.email)
          .limit(1)
          .get();

        if (empty) {
          await this.saveUserInFirestore(user);
        }
        this.saveSession(user);
      } else {
        throw new Error('Something went wrong.');
      }
    } catch (err) {
      new CoreService().showAlert(
        this.FirebaseSrv.getErrorMessage(err),
        'error'
      );
    } finally {
      new LoaderService().hideLinearLoader();
    }
  }

  public saveSession({ displayName, email, uid, photoURL }: firebase.User) {
    new Session().Session.next(
      new SessionModel({
        Id: uid,
        DisplayName: displayName!,
        Email: email!,
        PhotoUrl: photoURL ?? dummyImage
      })
    );
    new Session().save();

    this.$router.push({ name: 'Home' });
  }

  public async saveUserInFirestore({
    displayName,
    email,
    uid,
    photoURL
  }: firebase.User) {
    await this.FirebaseSrv.Db.collection('/users')
      .doc(uid)
      .set({
        UserId: uid,
        DisplayName: displayName,
        Email: email,
        PhotoUrl: photoURL ?? dummyImage
      } as UserModel);
  }
}
