import VueWrapper from '@/components/core/Vue/vue.wrapper';
import { CoreService, FirebaseService, LoaderService, Session } from '@/sdk';
import firebase from 'firebase/app';
import { Component } from 'vue-property-decorator';

@Component
export default class ProfileComponent extends VueWrapper {
  // Properties
  public DisplayName = new Session().SessionValue!.DisplayName;
<<<<<<< HEAD
  public PhotoUrl = new Session().SessionValue!.PhotoUrl;
  public File: File | null = null;
  public Password = '';
  private FirebaseSrv = new FirebaseService();
  public AddNewPic = false;
=======
  public Password = '';
  private FirebaseSrv = new FirebaseService();
>>>>>>> c0cca08596d4e7304c3e5c69f4a34a9188538bc3

  // Services
  private LoaderService = new LoaderService();

  // Methods
  public async updateProfile() {
    this.LoaderService.showFullScreenLoader('Updating profile...');
    try {
      if (this.Password) {
        const currPass = prompt('Enter your current password');

        if (!currPass) {
          new LoaderService().hideFullScreenLoader();
          return;
        }

        const credential = firebase.auth.EmailAuthProvider.credential(
          new Session().SessionValue!.Email,
          currPass
        );
        await this.FirebaseSrv.Auth.currentUser?.reauthenticateWithCredential(
          credential
        );
        await this.FirebaseSrv.Auth.currentUser?.updatePassword(this.Password);
      }

<<<<<<< HEAD
      if (this.File) {
        const ref = this.FirebaseSrv.Storage.ref()
          .child(
            `profile-pics/${
              this.FirebaseSrv.Auth.currentUser?.uid
            }.${File.name.split('.').pop()}`
          )
          .put(this.File);
        new LoaderService().showFullScreenLoader('Updating profile...');
        ref.on(
          'state_changed',
          undefined,
          () => {
            new CoreService().showAlert(
              'Something went wrong while uploading the profile picture.',
              'error'
            );
          },
          async () => {
            const photoURL = await ref.snapshot.ref.getDownloadURL();

            this.PhotoUrl = photoURL;

            await Promise.all([
              await this.FirebaseSrv.Auth.currentUser?.updateProfile({
                displayName: this.DisplayName,
                photoURL
              }),
              await this.FirebaseSrv.Db.collection('/users')
                .doc(new Session().SessionValue?.Id)
                .update({
                  DisplayName: this.DisplayName,
                  PhotoUrl: photoURL
                })
            ]);

            new Session().Session.next({
              ...new Session().SessionValue!,
              DisplayName: this.DisplayName,
              PhotoUrl: photoURL
            });

            new Session().save();

            new CoreService().showAlert(
              'Your profile has been updated successfully!'
            );
            new LoaderService().hideFullScreenLoader();

            this.File = null;
            this.AddNewPic = false;
          }
        );
      } else {
        await Promise.all([
          await this.FirebaseSrv.Auth.currentUser?.updateProfile({
            displayName: this.DisplayName
          }),
          await this.FirebaseSrv.Db.collection('/users')
            .doc(new Session().SessionValue?.Id)
            .update({
              DisplayName: this.DisplayName
            })
        ]);
        new Session().Session.next({
          ...new Session().SessionValue!,
          DisplayName: this.DisplayName
        });

        new Session().save();

        new CoreService().showAlert(
          'Your profile has been updated successfully!'
        );
      }
=======
      await Promise.all([
        await this.FirebaseSrv.Auth.currentUser?.updateProfile({
          displayName: this.DisplayName
        }),
        await this.FirebaseSrv.Db.collection('/users')
          .doc(new Session().SessionValue?.Id)
          .update({
            DisplayName: this.DisplayName
          })
      ]);

      new Session().Session.next({
        ...new Session().SessionValue!,
        DisplayName: this.DisplayName
      });

      new Session().save();

      new CoreService().showAlert(
        'Your profile has been updated successfully!'
      );
>>>>>>> c0cca08596d4e7304c3e5c69f4a34a9188538bc3
    } catch (err) {
      new CoreService().showAlert(
        this.FirebaseSrv.getErrorMessage(err),
        'error'
      );
    } finally {
      new LoaderService().hideFullScreenLoader();
    }
  }
}
