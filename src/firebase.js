// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBoM2WRVfZXs0eQ5VRCOqMTn7CEDOTBnJY",
  authDomain: "thetradejournal-412c4.firebaseapp.com",
  projectId: "thetradejournal-412c4",
  storageBucket: "thetradejournal-412c4.appspot.com",
  messagingSenderId: "991721514589",
  appId: "1:991721514589:web:f500cab6c04bf9eb77cfb4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
