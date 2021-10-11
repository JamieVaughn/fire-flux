// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
// import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js'
import { getFirestore, collection, doc, getDocs, getDoc, setDoc, addDoc, query, where, limit } from 'firebase/firestore'
// import { getFirestore, collection, doc, getDocs, getDoc, setDoc, addDoc, query,where, limit } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js'
// import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIRESTORE_APIKEY,
  authDomain: import.meta.env.VITE_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MSGSENDERID,
  appId: import.meta.env.VITE_APP_ID,
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth()
const db = getFirestore()
// const usersCollection = collection(db, 'users')
// const usersCollection = query(collection(db, 'users'), where('firstName', '==', 'jamie'), limit(5))
// const users = await getDocs(usersCollection)

// const testPost = doc(db, 'posts/ABCTUjwbyPgDE8FWNBZs')

// const citiesRef = collection(db, "cities");

// setDoc(doc(citiesRef, "SF"), {
//     name: "San Francisco", state: "CA", country: "USA",
//     capital: false, population: 860000,
//     regions: ["west_coast", "norcal"] });
// setDoc(doc(citiesRef, "LA"), {
//     name: "Los Angeles", state: "CA", country: "USA",
//     capital: false, population: 3900000,
//     regions: ["west_coast", "socal"] });
// setDoc(doc(citiesRef, "DC"), {
//     name: "Washington, D.C.", state: null, country: "USA",
//     capital: true, population: 680000,
//     regions: ["east_coast"] });
// setDoc(doc(citiesRef, "TOK"), {
//     name: "Tokyo", state: null, country: "Japan",
//     capital: true, population: 9000000,
//     regions: ["kanto", "honshu"] });
// setDoc(doc(citiesRef, "BJ"), {
//     name: "Beijing", state: null, country: "China",
//     capital: true, population: 21500000,
//     regions: ["jingjinji", "hebei"] });


    
// const user = doc(db, 'users/id')
// const postObj = {
//   authorName: 'jamie vaughn',
//   category: 'html',
//   creationTime: new Date(Date.now()).toISOString(),
//   link: 'https://htmldog.com',
//   notes: 'html reference',
//   summary: 'htmldog site',
//   title: 'HTMLDog'
// }
// setDoc(testPost, postObj, {merge: true}) // merge will create doc if it doesn't exist and noly merge the fields provided if it does
// addDoc(usersCollection, userObj)

export { 
  auth,
  db,
  firebaseApp,
 }
