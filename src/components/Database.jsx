
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getDatabase } from "firebase/database"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCJFa6cXm5Ke3zSbAqf_LWBFqOu89jNNnU",
  authDomain: "exampleweb-d9b02.firebaseapp.com",
  databaseURL: "https://exampleweb-d9b02-default-rtdb.firebaseio.com",
  projectId: "exampleweb-d9b02",
  storageBucket: "exampleweb-d9b02.appspot.com",
  messagingSenderId: "600339271287",
  appId: "1:600339271287:web:94ab3058cc9a27b1d54072",
  measurementId: "G-37SWLS665N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db=getDatabase(app);