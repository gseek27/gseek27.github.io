import VueWrapper from '@/components/core/Vue/vue.wrapper';
<<<<<<< HEAD
import { dummyImage } from '@/globals';
=======
>>>>>>> c0cca08596d4e7304c3e5c69f4a34a9188538bc3
import {
  CoreService,
  FirebaseService,
  LoaderService,
  LoginModel,
  Session,
<<<<<<< HEAD
  SessionModel,
  UserModel
} from '@/sdk';
import firebase from 'firebase/app';
=======
  SessionModel
} from '@/sdk';
>>>>>>> c0cca08596d4e7304c3e5c69f4a34a9188538bc3
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

<<<<<<< HEAD
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
=======
      const { displayName, email, uid } = user;
      new Session().Session.next(
        new SessionModel({
          Id: uid,
          DisplayName: displayName!,
          Email: email!
        })
      );
      new Session().save();

      this.$router.push({ name: 'Home' });
>>>>>>> c0cca08596d4e7304c3e5c69f4a34a9188538bc3
    } catch (err) {
      new CoreService().showAlert(
        this.FirebaseSrv.getErrorMessage(err),
        'error'
      );
    } finally {
      new LoaderService().hideLinearLoader();
    }
  }
<<<<<<< HEAD

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
=======
>>>>>>> c0cca08596d4e7304c3e5c69f4a34a9188538bc3
}
