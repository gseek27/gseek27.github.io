import { FirebaseError } from '@/globals';
import { singleton } from '@/sdk/core';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import { messages } from './firebase-messages';

@singleton
export class FirebaseService {
  public App: firebase.app.App;
  public Db: firebase.firestore.Firestore;
  public Auth: firebase.auth.Auth;
  public Storage: firebase.storage.Storage;

  constructor() {
    this.App = firebase.initializeApp({
      apiKey: 'AIzaSyAzCyrbfIqZxduw6uAHQ8radUPdxb3O5PU',
      authDomain: 'itslit-a4408.firebaseapp.com',
      projectId: 'itslit-a4408',
      storageBucket: 'itslit-a4408.appspot.com',
      messagingSenderId: '20427553503',
      appId: '1:20427553503:web:4e8679a99c852622c3876a'
    });
    this.Db = this.App.firestore();
    this.Auth = this.App.auth();
    this.Storage = this.App.storage();
  }

  public getErrorMessage(err: FirebaseError | string) {
    if (typeof err === 'object') {
      const { code, message } = err;
      if (code in messages.error) {
        return (<any>messages.error)[code] as string;
      }
      return message;
    }
    return err;
  }
}
