import VueWrapper from '@/components/core/Vue/vue.wrapper';
import { CoreService, FirebaseService, LoaderService, Session } from '@/sdk';
import firebase from 'firebase/app';
import { Component } from 'vue-property-decorator';

@Component
export default class ProfileComponent extends VueWrapper {
  // Properties
  public DisplayName = new Session().SessionValue!.DisplayName;
  public Password = '';
  private FirebaseSrv = new FirebaseService();

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
