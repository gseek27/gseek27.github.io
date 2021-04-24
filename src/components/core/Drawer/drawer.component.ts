import {
  CoreService,
  FirebaseService,
  LoaderService,
  Session,
  SessionModel
} from '@/sdk';
import { Component } from 'vue-property-decorator';
import VueWrapper from '../Vue/vue.wrapper';

@Component
export default class DrawerComponent extends VueWrapper {
  // Properties
  public DrawerLinks = [
    { Title: 'Home', Icon: 'mdi-home-variant-outline' },
    { Title: 'Add Blog Post', Icon: 'mdi-text-box-plus-outline' },
    { Title: 'Your Blog Posts', Icon: 'mdi-text-box-outline' },
    { Title: 'Profile', Icon: 'mdi-account-outline' }
  ];

  // Services
  private CoreService = new CoreService();
  private Session = new Session();
  private FirebaseSrv = new FirebaseService();

  get UserSession() {
    return this.Session.SessionValue ?? new SessionModel();
  }

  public async logout() {
    new LoaderService().showFullScreenLoader('Loggin out...');
    try {
      await this.FirebaseSrv.Auth.signOut();
      this.Session.clear();
      this.$router.push({ name: 'Home' });
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
