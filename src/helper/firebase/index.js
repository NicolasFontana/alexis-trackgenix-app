import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import store from 'redux/store';
import { setAuthentication } from 'redux/auth/actions';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDCEUxeO4ORRr3gOKieUvpzW73gshzZZEA',
  authDomain: 'trackgenix-d4c99.firebaseapp.com',
  projectId: 'trackgenix-d4c99',
  storageBucket: 'trackgenix-d4c99.appspot.com',
  messagingSenderId: '796290839374',
  appId: '1:796290839374:web:5bfeffd1bdf21031f7e41f',
  measurementId: 'G-J0EPMLVEXT'
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export const tokenListener = () => {
  // Every time the token change, it is saved on sessionStorage
  firebase.auth().onIdTokenChanged(async (user) => {
    if (user) {
      const token = await user.getIdToken();
      const {
        claims: { role }
      } = await user.getIdTokenResult();
      sessionStorage.setItem('token', token);
      store.dispatch(
        setAuthentication({
          token,
          role
        })
      );
    } else {
      sessionStorage.removeItem('token');
      store.dispatch(setAuthentication());
    }
  });
};

export default firebaseApp;
