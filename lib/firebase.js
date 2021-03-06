import firebase from 'firebase/app'
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
    // apiKey: process.env.NEXT_PUBLIC_API_KEY,
    // authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
    // projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
    // storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
    // messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
    // appId: process.env.NEXT_PUBLIC_APP_ID
    apiKey: "AIzaSyCsVr5QLEwamJhUNh0Dn3tbftEDpZZg8MI",
    authDomain: "work-hour-register.firebaseapp.com",
    projectId: "work-hour-register",
    storageBucket:"work-hour-register.appspot.com",
    messagingSenderId: "572343904490",
    appId:"1:572343904490:web:f822f45dff50ffad428f93"

};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

// export const firestore = firebase.firestore();
export const storage = firebase.storage();
export const db = firebase.firestore()