// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCAowCDyHC5b0HhhIBvxVqc0o3lLSMXnJM",
  authDomain: "vncodelab2.firebaseapp.com",
  databaseURL: "https://vncodelab2-default-rtdb.firebaseio.com",
  projectId: "vncodelab2",
  storageBucket: "vncodelab2.appspot.com",
  messagingSenderId: "852532707206",
  appId: "1:852532707206:web:5281cd31d29828fbc7f607"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;