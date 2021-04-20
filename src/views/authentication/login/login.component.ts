import VueWrapper from '@/components/core/Vue/vue.wrapper';
import {
  CoreService,
  FirebaseService,
  LoaderService,
  LoginModel,
  Session,
  SessionModel
} from '@/sdk';
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
    } catch (err) {
      new CoreService().showAlert(
        this.FirebaseSrv.getErrorMessage(err),
        'error'
      );
    } finally {
      new LoaderService().hideLinearLoader();
    }
  }
}
