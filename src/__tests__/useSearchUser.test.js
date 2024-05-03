// __tests__/useSearchUser.test.js

import { renderHook, act } from '@testing-library/react-hooks';
import useSearchUser from '../hooks/useSearchUser';
import useShowToast from '../hooks/useShowToast';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { firestore } from '../firebase/firebase';

// Mock dependencies
jest.mock('../hooks/useShowToast');
jest.mock('firebase/firestore', () => ({
  collection: jest.fn(),
  getDocs: jest.fn(),
  query: jest.fn(),
  where: jest.fn(),
}));

describe('useSearchUser', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('finds user', async () => {
    const username = 'testuser';
    const userData = { username, fullName: 'Test User' };
    const getDocsMock = jest.fn(() => ({
      empty: false,
      forEach: (callback) => callback({ data: () => userData }),
    }));
    const showToastMock = jest.fn();
    useShowToast.mockImplementation(() => showToastMock);
    getDocs.mockImplementation(getDocsMock);

    const { result } = renderHook(() => useSearchUser());

    await act(async () => {
      await result.current.getUserProfile(username);
    });

    expect(showToastMock).not.toHaveBeenCalled();
    expect(result.current.isLoading).toBe(false);
    expect(result.current.user).toEqual(userData);
  });

  test('handles user not found', async () => {
    const username = 'nonexistentuser';
    const getDocsMock = jest.fn(() => ({ empty: true }));
    const showToastMock = jest.fn();
    useShowToast.mockImplementation(() => showToastMock);
    getDocs.mockImplementation(getDocsMock);

    const { result } = renderHook(() => useSearchUser());

    await act(async () => {
      await result.current.getUserProfile(username);
    });

    expect(showToastMock).toHaveBeenCalledWith('Error', 'User not found', 'error');
    expect(result.current.isLoading).toBe(false);
    expect(result.current.user).toBeNull();
  });

  test('handles errors', async () => {
    const username = 'testuser';
    const errorMsg = 'Something went wrong';
    const getDocsMock = jest.fn(() => {
      throw new Error(errorMsg);
    });
    const showToastMock = jest.fn();
    useShowToast.mockImplementation(() => showToastMock);
    getDocs.mockImplementation(getDocsMock);

    const { result } = renderHook(() => useSearchUser());

    await act(async () => {
      await result.current.getUserProfile(username);
    });

    expect(showToastMock).toHaveBeenCalledWith('Error', errorMsg, 'error');
    expect(result.current.isLoading).toBe(false);
    expect(result.current.user).toBeNull();
  });

  test('initializes state correctly', () => {
    const { result } = renderHook(() => useSearchUser());

    expect(result.current.isLoading).toBe(false);
    expect(result.current.user).toBeNull();
  });
});
