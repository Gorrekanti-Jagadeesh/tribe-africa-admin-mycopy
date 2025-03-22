import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from 'react/jsx-runtime';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { auth, db, doc, setDoc } from '../../../firebaseDB';
import Button from '@atoms/custom-button/button';
const Signup = ({ setIsOpen }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const handleSignup = async () => {
    if (password !== confirmPassword) {
      setError("Passwords don't match!");
      return;
    }
    try {
      // Create a new user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user; // Firebase User object
      // Get the accessToken from the Firebase user
      const accessToken = await firebaseUser.getIdToken();
      // Ensure uid is not null
      if (!firebaseUser.uid) {
        throw new Error('User UID is missing');
      }
      // Create a custom User object that matches your interface
      const user = {
        accessToken: accessToken,
        uid: firebaseUser.uid,
        email: firebaseUser.email,
      };
      const userId = user.uid ? user.uid : '';
      // Save user details to Firestore
      const userDocRef = doc(db, 'users', userId);
      await setDoc(userDocRef, {
        displayName: `${firstName} ${lastName}`,
        email: user.email,
        uid: user.uid,
        lastLogin: new Date().toISOString(),
        accessToken: user.accessToken,
        photoURL:
          'https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg',
        // Add any other fields you want to store
      });
      // Close the signup modal
      setIsOpen(false);
    } catch (error) {
      // Check if the error is an instance of Error before accessing the message
      if (error instanceof Error) {
        console.error('Error during signup:', error.message);
        setError(error.message);
      } else {
        console.error('An unknown error occurred:', error);
        setError('An unknown error occurred');
      }
    }
  };
  return _jsxs(_Fragment, {
    children: [
      _jsx('input', {
        type: 'text',
        placeholder: 'First Name',
        value: firstName,
        onChange: (e) => setFirstName(e.target.value),
        className: 'border p-3 rounded-lg w-full mb-4',
      }),
      _jsx('input', {
        type: 'text',
        placeholder: 'Last Name',
        value: lastName,
        onChange: (e) => setLastName(e.target.value),
        className: 'border p-3 rounded-lg w-full mb-4',
      }),
      _jsx('input', {
        type: 'email',
        placeholder: 'Email',
        value: email,
        onChange: (e) => setEmail(e.target.value),
        className: 'border p-3 rounded-lg w-full mb-4',
      }),
      _jsx('input', {
        type: 'password',
        placeholder: 'Password (at least 8 characters)',
        value: password,
        onChange: (e) => setPassword(e.target.value),
        className: 'border p-3 rounded-lg w-full mb-4',
      }),
      _jsx('input', {
        type: 'password',
        placeholder: 'Confirm Password',
        value: confirmPassword,
        onChange: (e) => setConfirmPassword(e.target.value),
        className: 'border p-3 rounded-lg w-full mb-4',
      }),
      error && _jsx('p', { className: 'text-red-500 mb-4', children: error }),
      _jsx(Button, { className: 'w-full mb-2', onClick: handleSignup, children: 'Sign Up' }),
    ],
  });
};
export default Signup;
