// __tests__/GoogleAuth.test.js

import { render, fireEvent, waitFor } from '@testing-library/react';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth'; // Mocking useSignInWithGoogle
// Mocking auth and firestore
import GoogleAuth from '../components/AuthForm/GoogleAuth';
import useShowToast from '../hooks/useShowToast';
import useAuthStore from '../store/authStore';
import { auth, firestore } from '../firebase/firebase';

jest.mock('../hooks/useShowToast');
jest.mock('../store/authStore');
jest.mock('react-firebase-hooks/auth');
jest.mock('../firebase/firebase');

describe('GoogleAuth', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('handles Google authentication successfully', async () => {
    // Mock signInWithGoogle to return a user
    const newUser = {
      user: {
        uid: 'testUserId',
        email: 'test@example.com',
        displayName: 'Test User',
        photoURL: 'https://example.com/photo.jpg'
      }
    };
    useSignInWithGoogle.mockReturnValue([jest.fn().mockResolvedValue(newUser), false, null]);

    const { getByText } = render(<GoogleAuth prefix="Sign in" />);

    // Simulate click event on GoogleAuth component
    fireEvent.click(getByText('Sign in with Google'));

    // Wait for async operations to complete
    await waitFor(() => {
      expect(auth.signInWithGoogle).toHaveBeenCalled(); // Ensure signInWithGoogle is called
      expect(useShowToast).not.toHaveBeenCalled(); // Ensure useShowToast is not called
      expect(useAuthStore).toHaveBeenCalledWith(expect.any(Function)); // Ensure useAuthStore is called
      expect(firestore.doc).toHaveBeenCalledWith('users/testUserId'); // Ensure firestore.doc is called
      expect(firestore.setDoc).toHaveBeenCalled(); // Ensure firestore.setDoc is called
    });
  });

  test('handles Google authentication error', async () => {
    // Mock signInWithGoogle to return an error
    const error = new Error('Authentication failed');
    useSignInWithGoogle.mockReturnValue([jest.fn().mockResolvedValue(null), false, error]);

    const { getByText } = render(<GoogleAuth prefix="Sign in" />);

    // Simulate click event on GoogleAuth component
    fireEvent.click(getByText('Sign in with Google'));

    // Wait for async operations to complete
    await waitFor(() => {
      expect(auth.signInWithGoogle).toHaveBeenCalled(); // Ensure signInWithGoogle is called
      expect(useShowToast).toHaveBeenCalledWith('Error', 'Authentication failed', 'error'); // Ensure useShowToast is called with error message
      expect(useAuthStore).not.toHaveBeenCalled(); // Ensure useAuthStore is not called
      expect(firestore.doc).not.toHaveBeenCalled(); // Ensure firestore.doc is not called
      expect(firestore.setDoc).not.toHaveBeenCalled(); // Ensure firestore.setDoc is not called
    });
  });
});
