import { formatRelative } from 'date-fns';
import firebase from 'firebase/app';

export const getTimestamp = () =>
  new firebase.firestore.Timestamp(Date.now() / 1000, window.performance.now());

export const fromNow = (sec: number) => formatRelative(sec * 1000, Date.now());
