import firebase from "firebase/app";
import "firebase/storage";
import { store } from "../store";

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
const idPerson: number = store.getState().rootSlice.idPerson;
export const userTripRef: firebase.storage.Reference = storage
  .ref()
  .child(`images/trips/${idPerson}`);
export const profileRef: firebase.storage.Reference = storage
  .ref()
  .child(`images/profile/${idPerson}`);

export const avatar =
  "https://firebasestorage.googleapis.com/v0/b/tripper-7aba4.appspot.com/o/images%2Fgeneral%2Favatar.png?alt=media&token=ba6845de-8324-418c-bad7-aec081782625";
export { firebase };
