
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCUl5i3X6mBTswUvCdt8LfAjX9uy-7E-uY",
  authDomain: "fakestoreapi-af1a6.firebaseapp.com",
  projectId: "fakestoreapi-af1a6",
  storageBucket: "fakestoreapi-af1a6.appspot.com",
  messagingSenderId: "585979483769",
  appId: "1:585979483769:web:ecc6a6d854ff6b0d3466a8",
  measurementId: "G-4T8KJS148J"
};

if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
}

export {firebase};
// // Initialize Firebase
// export const FIREBASEAPP = initializeApp(firebaseConfig);
// export const FIREBASE_AUTH = getAuth(FIREBASEAPP);
// const analytics = getAnalytics(FirebaseApp);