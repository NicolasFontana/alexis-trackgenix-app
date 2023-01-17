import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import store from 'redux/store';
import { setAuthentication } from 'redux/auth/actions';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
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
