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
      apiKey: 'AIzaSyD-9pSQ8z8lVTI7gvYcMgaHhzuzStGQb1g',
      authDomain: 'its-lit-app.firebaseapp.com',
      projectId: 'its-lit-app',
      storageBucket: 'its-lit-app.appspot.com',
      messagingSenderId: '485487673473',
      appId: '1:485487673473:web:60caa2a9c9daddd6f98d80'
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
