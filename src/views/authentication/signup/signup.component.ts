import VueWrapper from '@/components/core/Vue/vue.wrapper';
import { dummyImage } from '@/globals';
import {
  CoreService,
  FirebaseService,
  LoaderService,
  Session,
  SessionModel,
  SignupModel,
  UserModel
} from '@/sdk';
import firebase from 'firebase/app';
import { Component } from 'vue-property-decorator';
import router from 'src/router/index';

@Component
export default class SignupComponent extends VueWrapper {
  // Properties
  public SignupData = new SignupModel();
  private FirebaseSrv = new FirebaseService();

  // Methods
  public async signup() {
    const { Email, Password, DisplayName, File } = this.SignupData;
    new LoaderService().showLinearLoader('Signing up...');

    try {
      const {
        user
      } = await this.FirebaseSrv.Auth.createUserWithEmailAndPassword(
        Email!,
        Password!
      );

      if (!user) {
        throw new Error('Something went wrong.');
      }
      if (File) {
        const ref = this.FirebaseSrv.Storage.ref()
          .child(`profile-pics/${user.uid}.${File.name.split('.').pop()}`)
          .put(File);
        ref.on(
          'state_changed',
          () => {
            new LoaderService().showLinearLoader('Signing up...');
          },
          () => {
            new CoreService().showAlert(
              'Something went wrong while uploading the profile picture.',
              'error'
            );
          },
          async () => {
            const photoURL = await ref.snapshot.ref.getDownloadURL();

            await user.updateProfile({
              displayName: DisplayName,
              photoURL
            });
            await this.saveUserInFirestore({ ...user, photoURL });

            this.saveSession({ ...user, photoURL });

            new LoaderService().hideLinearLoader();
          }
        );
      } else {
        await user.updateProfile({
          displayName: DisplayName,
          photoURL: dummyImage
        });
        await this.saveUserInFirestore(user);

        this.saveSession(user);
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

  public async thirdPartyLogin(type: 'google' | 'twitter' = 'google') {
    new LoaderService().showLinearLoader(`Signing up with ${type}...`);
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
