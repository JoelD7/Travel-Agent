import firebase from "firebase/app";
import "firebase/storage";
import { store } from "../store";
import { Person } from "../types";

var firebaseConfig = {
  apiKey: "AIzaSyBCrNnyYWSbUOHAIE6W3CZ2Ai-zOx1hJ0g",
  authDomain: "tripper-7aba4.firebaseapp.com",
  projectId: "tripper-7aba4",
  storageBucket: "tripper-7aba4.appspot.com",
  messagingSenderId: "398111938648",
  appId: "1:398111938648:web:51654f1c0af4a52fcd522d",
  measurementId: "G-1F2M9M1MGK",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const storage = firebase.storage();

export function getUserTripRef(): firebase.storage.Reference {
  const person: Person | undefined = store.getState().authSlice.person;

  return storage.ref().child(`images/trips/${person ? person.uuid : 0}`);
}

export function getProfileRef(): firebase.storage.Reference {
  const person: Person | undefined = store.getState().authSlice.person;

  return storage.ref().child(`images/profile/${person ? person.uuid : 0}`);
}

export { firebase };
