import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { auth, db, doc, setDoc } from '../../../../firebaseDB';

const SignupModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
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
      const user: any = userCredential.user; // Get the user object

      // Save user details to Firestore
      const userDocRef = doc(db, 'users', user.uid); // Save by user ID
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
      onClose();
    } catch (error: any) {
      console.error('Error during signup:', error);
      setError(error.message); // Show the error message
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
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
        <button className="mt-4 bg-gray-300 text-black p-2 rounded w-full" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default SignupModal;
