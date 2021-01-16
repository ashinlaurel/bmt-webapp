import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
import "firebase/storage";

var config = {
  apiKey: "AIzaSyAkzKuW2mENCmjPc2womDILHLfvkbXRuEo",
  authDomain: "bmt-church-final.firebaseapp.com",
  projectId: "bmt-church-final",
  databaseURL: "https://bmt-church-final-default-rtdb.firebaseio.com/",
  storageBucket: "bmt-church-final.appspot.com",
  messagingSenderId: "276132237189",
  appId: "1:276132237189:web:6797287d66c886d52f3eec",
  measurementId: "G-K94XKLJ0YX",
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

// const db = firebase.database();
const db = firebase.firestore();
const rdb = firebase.database();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage, rdb };
