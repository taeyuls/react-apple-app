// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCCe36MViC3S8Txje83TCbbZ8vWoiIOPMs",
  authDomain: "react-apple-tv-5be3e.firebaseapp.com",
  projectId: "react-apple-tv-5be3e",
  storageBucket: "react-apple-tv-5be3e.appspot.com",
  messagingSenderId: "805540773387",
  appId: "1:805540773387:web:d8a10b481f19714c4c910e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default app; // 'default'로 Firebase app을 내보내기
export { auth }; // 'auth' 객체도 내보내기
