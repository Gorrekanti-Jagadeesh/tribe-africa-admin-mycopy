// firebaseConfig.ts
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCBIpRNW1m5_iKGSIl7crmUiFu8uVqhS-Y',
  authDomain: 'tribe-africa.firebaseapp.com',
  projectId: 'tribe-africa',
  storageBucket: 'tribe-africa.appspot.com',
  messagingSenderId: '519150995922',
  appId: '1:519150995922:web:e064b318e4aacd0466e00b',
  measurementId: 'G-V43ZTT37HJ',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Google Sign-in Function
export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential?.accessToken;
    const user = result.user;
    console.log('Logged in with Google:', user, token);
  } catch (error) {
    console.error('Google Sign-in Error:', error);
  }
};

export { auth };
