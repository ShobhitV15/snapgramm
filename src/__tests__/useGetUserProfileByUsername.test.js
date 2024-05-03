// __tests__/useGetUserProfileByUsername.test.js

import { renderHook } from '@testing-library/react-hooks';
import useGetUserProfileByUsername from '../hooks/useGetUserProfileByUsername';
import useShowToast from '../hooks/useShowToast';
import useUserProfileStore from '../store/userProfileStore';
import { collection, getDocs, query } from 'firebase/firestore';
import { firestore } from '../firebase/firebase';

// Mock dependencies
jest.mock('../hooks/useShowToast');
jest.mock('../store/userProfileStore');
jest.mock('firebase/firestore');

describe('useGetUserProfileByUsername', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('fetches user profile successfully', async () => {
    const mockUsername = 'testuser';
    const mockUserProfile = {
      username: mockUsername,
      // Other user profile data...
    };
    const mockDocRef = {
      data: jest.fn().mockReturnValue(mockUserProfile)
    };
    const mockQuerySnapshot = {
      empty: false,
      forEach: jest.fn((callback) => {
        callback(mockDocRef);
      })
    };
    query.mockReturnValue(mockQuerySnapshot);
    useShowToast.mockImplementation(() => jest.fn());
    useUserProfileStore.mockReturnValue({ userProfile: null, setUserProfile: jest.fn() });

    const { result, waitForNextUpdate } = renderHook(() => useGetUserProfileByUsername(mockUsername));

    await waitForNextUpdate();

    expect(query).toHaveBeenCalledWith(
      collection(firestore, 'users'),
      where('username', '==', mockUsername)
    );
    expect(result.current.isLoading).toBe(false);
    expect(result.current.userProfile).toEqual(mockUserProfile);
  });

  test('handles no user profile found', async () => {
    const mockUsername = 'nonexistentuser';
    const mockQuerySnapshot = {
      empty: true
    };
    query.mockReturnValue(mockQuerySnapshot);
    useShowToast.mockImplementation(() => jest.fn());
    const setUserProfileMock = jest.fn();
    useUserProfileStore.mockReturnValue({ userProfile: null, setUserProfile: setUserProfileMock });

    const { result, waitForNextUpdate } = renderHook(() => useGetUserProfileByUsername(mockUsername));

    await waitForNextUpdate();

    expect(query).toHaveBeenCalledWith(
      collection(firestore, 'users'),
      where('username', '==', mockUsername)
    );
    expect(result.current.isLoading).toBe(false);
    expect(result.current.userProfile).toBeNull();
    expect(setUserProfileMock).toHaveBeenCalledWith(null);
  });

  test('handles error during fetching user profile', async () => {
    const mockUsername = 'testuser';
    const mockError = new Error('User profile not found');
    query.mockRejectedValue(mockError);
    const showToastMock = jest.fn();
    useShowToast.mockReturnValue(showToastMock);
    useUserProfileStore.mockReturnValue({ userProfile: null, setUserProfile: jest.fn() });

    const { result, waitForNextUpdate } = renderHook(() => useGetUserProfileByUsername(mockUsername));

    await waitForNextUpdate();

    expect(query).toHaveBeenCalledWith(
      collection(firestore, 'users'),
      where('username', '==', mockUsername)
    );
    expect(result.current.isLoading).toBe(false);
    expect(result.current.userProfile).toBeNull();
    expect(showToastMock).toHaveBeenCalledWith('Error', mockError.message, 'error');
  });

  test('sets loading state to true initially', () => {
    const mockUsername = 'testuser';
    const setUserProfileMock = jest.fn();
    useUserProfileStore.mockReturnValue({ userProfile: null, setUserProfile: setUserProfileMock });
    query.mockReturnValue(new Promise(() => {}));
    useShowToast.mockImplementation(() => jest.fn());

    const { result } = renderHook(() => useGetUserProfileByUsername(mockUsername));

    expect(result.current.isLoading).toBe(true);
    expect(result.current.userProfile).toBeNull();
  });
});
