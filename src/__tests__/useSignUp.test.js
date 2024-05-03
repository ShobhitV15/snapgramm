// __tests__/useSignUp.test.js

import { renderHook, act } from '@testing-library/react-hooks';
import useSignUp from '../hooks/useSignUp';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { collection, getDocs, query } from 'firebase/firestore';
import { auth, firestore } from '../firebase/firebase';

// Mock useCreateUserWithEmailAndPassword
jest.mock('react-firebase-hooks/auth', () => ({
  useCreateUserWithEmailAndPassword: jest.fn(),
}));

// Mock firestore functions
jest.mock('firebase/firestore', () => ({
  collection: jest.fn(),
  getDocs: jest.fn(),
  query: jest.fn(),
}));

// Mock local storage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: (key) => store[key],
    setItem: (key, value) => store[key] = value,
    clear: () => store = {},
  };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// Mock useShowToast hook
const showToastMock = jest.fn();
jest.mock('../hooks/useShowToast', () => jest.fn(() => showToastMock));

// Mock store functions
const loginUserMock = jest.fn();
jest.mock('../store/authStore', () => ({
  __esModule: true,
  default: jest.fn(() => loginUserMock),
}));

describe('useSignUp', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('signs up a user successfully', async () => {
    useCreateUserWithEmailAndPassword.mockReturnValue([
      { user: { uid: 'mockUserId' } }, // mock user data
      null, // no loading
      false, // no error
    ]);

    const { result, waitForNextUpdate } = renderHook(() => useSignUp());

    await act(async () => {
      await result.current.signup({
        email: 'test@example.com',
        username: 'testuser',
        password: 'password',
        fullName: 'Test User',
      });
      await waitForNextUpdate();
    });

    expect(showToastMock).not.toHaveBeenCalled();
    expect(loginUserMock).toHaveBeenCalled();
    expect(localStorage.getItem('user-info')).toBeTruthy();
    expect(localStorage.getItem('user-info')).toEqual(expect.stringContaining('"uid":"mockUserId"'));
    expect(collection).toHaveBeenCalledWith(firestore, 'users');
    expect(useCreateUserWithEmailAndPassword).toHaveBeenCalledWith(auth, 'test@example.com', 'password');
  });

  test('handles missing input fields', async () => {
    const { result } = renderHook(() => useSignUp());

    await act(async () => {
      await result.current.signup({
        email: '',
        username: '',
        password: '',
        fullName: '',
      });
    });

    expect(showToastMock).toHaveBeenCalledWith('Error', 'Please fill all the fields', 'error');
    expect(loginUserMock).not.toHaveBeenCalled();
  });

  test('handles existing username', async () => {
    query.mockReturnValue({ empty: false });

    const { result } = renderHook(() => useSignUp());

    await act(async () => {
      await result.current.signup({
        email: 'test@example.com',
        username: 'existinguser',
        password: 'password',
        fullName: 'Test User',
      });
    });

    expect(showToastMock).toHaveBeenCalledWith('Error', 'Username already Exist', 'error');
    expect(loginUserMock).not.toHaveBeenCalled();
  });

  test('handles signup failure', async () => {
    useCreateUserWithEmailAndPassword.mockReturnValue([
      null, // no user data
      new Error('Signup failed'), // error
      false, // no loading
    ]);

    const { result } = renderHook(() => useSignUp());

    await act(async () => {
      await result.current.signup({
        email: 'test@example.com',
        username: 'testuser',
        password: 'password',
        fullName: 'Test User',
      });
    });

    expect(showToastMock).toHaveBeenCalledWith('Error', 'Signup failed', 'error');
    expect(loginUserMock).not.toHaveBeenCalled();
  });
});
