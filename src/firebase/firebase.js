import * as firebase from 'firebase';

let firebaseConfig = {
  apiKey: 'AIzaSyBpg2InuI8EiZhI6tgU0ZLR38WVIMtVwic',
  authDomain: 'micro-avenue-237301.firebaseapp.com',
  databaseURL: 'https://micro-avenue-237301.firebaseio.com',
  projectId: 'micro-avenue-237301',
  storageBucket: 'micro-avenue-237301.appspot.com',
  messagingSenderId: '670302176078',
  appId: '1:670302176078:web:dffbc02d069c7ac1a6141f',
  measurementId: 'G-WNSGJ143ES'
};

firebase.initializeApp(firebaseConfig);

const database = firebase.database();

let googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { firebase, database as default, googleAuthProvider };
