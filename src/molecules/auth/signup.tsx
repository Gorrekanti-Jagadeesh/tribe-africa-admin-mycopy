import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { auth, db, doc, setDoc } from '../../../firebaseDB';

interface User {
  accessToken: string | null;
  uid: string | null;
  email: string | null;
}

const Signup: React.FC<{ setIsOpen: (open: boolean) => void }> = ({ setIsOpen }) => {
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
      const user: User = {
        accessToken: accessToken,
        uid: firebaseUser.uid,
        email: firebaseUser.email,
      };

      const userId: string = user.uid ? user.uid : '';

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

  return (
    <div className="bg-white p-5 rounded-lg shadow-lg w-80">
      <h2 className="text-xl font-semibold mb-4">Sign Up</h2>
      <input
        type="text"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        className="border p-2 w-full mb-2"
      />
      <input
        type="text"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        className="border p-2 w-full mb-2"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 w-full mb-2"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 w-full mb-2"
      />
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="border p-2 w-full mb-2"
      />
      {error && <p className="text-red-500 mb-2">{error}</p>} {/* Show error message */}
      <button className="bg-purple-600 text-white p-2 rounded w-full" onClick={handleSignup}>
        Sign Up
      </button>
      <button className="mt-4 bg-gray-300 text-black p-2 rounded w-full" onClick={() => setIsOpen(false)}>
        Close
      </button>
    </div>
  );
};

export default Signup;
