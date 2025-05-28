import {initializeApp} from 'firebase/app';
import {getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCprz6z-F5X5gFkfM1T-XgGSyi7P8CDRYQ",
  authDomain: "auth-869c1.firebaseapp.com",
  projectId: "auth-869c1",
  storageBucket: "auth-869c1.firebasestorage.app",
  messagingSenderId: "11908714840",
  appId: "1:11908714840:web:281d76ce0910cb3893152d",
  measurementId: "G-QQENDT4MFH"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export {auth, provider, signInWithPopup};
