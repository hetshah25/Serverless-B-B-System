// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyCg9KdaYqojjeDdwKmujEd12z9EMxwZBVA",
//   authDomain: "csci-project-bc588.firebaseapp.com",
//   projectId: "csci-project-bc588",
//   storageBucket: "csci-project-bc588.appspot.com",
//   messagingSenderId: "1052397462284",
//   appId: "1:1052397462284:web:8253600d47ff274c8a1f29",
//   measurementId: "G-5EWLD0XWL4"
// };

const firebaseConfig = {
  apiKey: "AIzaSyA-7ZYE7kmj72JixsG0rPmj6cjP6R_Kxyo",
  authDomain: "csci-project-8fdf7.firebaseapp.com",
  projectId: "csci-project-8fdf7",
  storageBucket: "csci-project-8fdf7.appspot.com",
  messagingSenderId: "282899005377",
  appId: "1:282899005377:web:cda19ea5ab6642c024f940",
  measurementId: "G-2141E2G10N"
};

// Initialize Firebase


const app = initializeApp(firebaseConfig);
export const firestoreDB = getFirestore(app);