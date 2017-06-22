import firebase from 'firebase';

// Initialize Firebase
var config = {
  apiKey: 'AIzaSyASLZxofJJ9tFC2s0ScuOAwASqRY3VJ-qw',
  authDomain: 'skycast-69be3.firebaseapp.com',
  databaseURL: 'https://skycast-69be3.firebaseio.com',
  projectId: 'skycast-69be3',
  storageBucket: 'skycast-69be3.appspot.com',
  messagingSenderId: '756441479'
};
firebase.initializeApp(config);

export default firebase;

export const database = firebase.database();
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();
export const twitterAuthProvider = new firebase.auth.TwitterAuthProvider();
export const githubAuthProvider = new firebase.auth.GithubAuthProvider();
