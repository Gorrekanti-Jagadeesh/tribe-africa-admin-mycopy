// firebaseConfig.ts
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, setDoc } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCBIpRNW1m5_iKGSIl7crmUiFu8uVqhS-Y',
  authDomain: 'tribe-africa.firebaseapp.com',
  projectId: 'tribe-africa',
  storageBucket: 'tribe-africa.appspot.com',
  messagingSenderId: '519150995922',
  appId: '1:519150995922:web:e064b318e4aacd0466e00b',
  measurementId: 'G-V43ZTT37HJ',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Google Sign-in Function
const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential?.accessToken;
    const user = result.user;

    console.log('Logged in with Google:', user, token);

    // Save user details to Firestore
    const userDocRef = doc(db, 'users', user.uid); // Save by user ID
    await setDoc(userDocRef, {
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      uid: user.uid,
      accessToken: token,
      lastLogin: new Date().toISOString(),
    });

    return user;
  } catch (error) {
    console.error('Google Sign-in Error:', error);
  }
};

export { app, db, collection, addDoc, getDocs, doc, updateDoc, setDoc, storage, auth, signInWithGoogle };
