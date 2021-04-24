import { formatRelative } from 'date-fns';
import firebase from 'firebase/app';

export const getTimestamp = () =>
  new firebase.firestore.Timestamp(Date.now() / 1000, window.performance.now());

export const fromNow = (sec: number) => formatRelative(sec * 1000, Date.now());
<<<<<<< HEAD

export const dummyImage =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1gviNqoTft8qOllju-I8sFySXgrSVEqoPYg&usqp=CAU';
=======
>>>>>>> c0cca08596d4e7304c3e5c69f4a34a9188538bc3
