import VueWrapper from '@/components/core/Vue/vue.wrapper';
<<<<<<< HEAD
import { dummyImage } from '@/globals';
=======
>>>>>>> c0cca08596d4e7304c3e5c69f4a34a9188538bc3
import {
  CoreService,
  FirebaseService,
  LoaderService,
<<<<<<< HEAD
  Session,
  SessionModel,
  SignupModel,
  UserModel
} from '@/sdk';
import firebase from 'firebase/app';
import { Component } from 'vue-property-decorator';
=======
  SignupModel,
  UserModel
} from '@/sdk';
import { Component } from 'vue-property-decorator';
import firebase from 'firebase/app';
>>>>>>> c0cca08596d4e7304c3e5c69f4a34a9188538bc3

@Component
export default class SignupComponent extends VueWrapper {
  // Properties
  public SignupData = new SignupModel();
  private FirebaseSrv = new FirebaseService();

  // Methods
  public async signup() {
<<<<<<< HEAD
    const { Email, Password, DisplayName, File } = this.SignupData;
=======
    const { Email, Password, DisplayName } = this.SignupData;
>>>>>>> c0cca08596d4e7304c3e5c69f4a34a9188538bc3
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
<<<<<<< HEAD
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
=======

      await user.updateProfile({ displayName: DisplayName });

      await this.FirebaseSrv.Db.collection('/users')
        .doc(user.uid)
        .set({
          UserId: user.uid,
          DisplayName: user.displayName,
          Email: user.email
        } as UserModel);

      this.$router.push('/login');
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
=======
>>>>>>> c0cca08596d4e7304c3e5c69f4a34a9188538bc3
}
