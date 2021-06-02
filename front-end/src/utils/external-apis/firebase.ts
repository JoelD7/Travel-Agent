import firebase from "firebase/app";
import "firebase/storage";

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
export { firebase };
