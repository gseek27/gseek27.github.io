import VueWrapper from '@/components/core/Vue/vue.wrapper';
import {
  CoreService,
  FirebaseService,
  LoaderService,
  SignupModel,
  UserModel
} from '@/sdk';
import { Component } from 'vue-property-decorator';

@Component
export default class SignupComponent extends VueWrapper {
  // Properties
  public SignupData = new SignupModel();
  private FirebaseSrv = new FirebaseService();

  // Methods
  public async signup() {
    const { Email, Password, DisplayName } = this.SignupData;
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

      await user.updateProfile({ displayName: DisplayName });

      await this.FirebaseSrv.Db.collection('/users')
        .doc(user.uid)
        .set({
          UserId: user.uid,
          DisplayName: user.displayName,
          Email: user.email
        } as UserModel);

      this.$router.push('/login');
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
