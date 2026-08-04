import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { auth, db, doc, setDoc } from '../../../firebaseDB';
import Button from '@atoms/custom-button/button';

interface User {
  accessToken: string | null;
  uid: string | null;
  email: string | null;
}

interface SignupProps {
  setIsOpen: (open: boolean) => void;
}

const Signup: React.FC<SignupProps> = ({ setIsOpen }) => {
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
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      const firebaseUser = userCredential.user;

      const accessToken = await firebaseUser.getIdToken();

      if (!firebaseUser.uid) {
        throw new Error('User UID is missing');
      }

      const user: User = {
        accessToken,
        uid: firebaseUser.uid,
        email: firebaseUser.email,
      };

      const userId = user.uid ?? '';

      await setDoc(doc(db, 'users', userId), {
        displayName: `${firstName} ${lastName}`,
        email: user.email,
        uid: user.uid,
        lastLogin: new Date().toISOString(),
        accessToken: user.accessToken,
        photoURL:
          'https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg',
      });

      setIsOpen(false);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  };

  return (
    <>
      <input
        type="text"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        className="border p-3 rounded-lg w-full mb-4"
      />

      <input
        type="text"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        className="border p-3 rounded-lg w-full mb-4"
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-3 rounded-lg w-full mb-4"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-3 rounded-lg w-full mb-4"
      />

      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="border p-3 rounded-lg w-full mb-4"
      />

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <Button className="w-full mb-2" onClick={handleSignup}>
        Sign Up
      </Button>
    </>
  );
};

export default Signup;
