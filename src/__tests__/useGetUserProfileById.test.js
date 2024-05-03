// __tests__/useGetUserProfileById.test.js

import { renderHook, act } from '@testing-library/react-hooks';
import useGetUserProfileById from '../hooks/useGetUserProfileById';
import useShowToast from '../hooks/useShowToast';
import { getDoc } from 'firebase/firestore';
import { firestore } from '../firebase/firebase';

// Mock dependencies
jest.mock('../hooks/useShowToast');
jest.mock('firebase/firestore');

describe('useGetUserProfileById', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('fetches user profile successfully', async () => {
    const mockUserId = 'testUserId';
    const mockUserProfile = {
      uid: mockUserId,
      displayName: 'Test User',
      // Other user profile data...
    };
    const mockDocRef = {
      exists: true,
      data: jest.fn().mockReturnValue(mockUserProfile)
    };
    getDoc.mockResolvedValue(mockDocRef);
    useShowToast.mockImplementation(() => jest.fn());

    const { result, waitForNextUpdate } = renderHook(() => useGetUserProfileById(mockUserId));

    await waitForNextUpdate();

    expect(getDoc).toHaveBeenCalledWith(firestore, 'users', mockUserId);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.userProfile).toEqual(mockUserProfile);
  });

  test('handles no user profile found', async () => {
    const mockUserId = 'nonExistentUserId';
    const mockDocRef = { exists: false };
    getDoc.mockResolvedValue(mockDocRef);
    useShowToast.mockImplementation(() => jest.fn());

    const { result, waitForNextUpdate } = renderHook(() => useGetUserProfileById(mockUserId));

    await waitForNextUpdate();

    expect(getDoc).toHaveBeenCalledWith(firestore, 'users', mockUserId);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.userProfile).toBeNull();
  });

  test('handles error during fetching user profile', async () => {
    const mockUserId = 'testUserId';
    const mockError = new Error('User profile not found');
    getDoc.mockRejectedValue(mockError);
    const showToastMock = jest.fn();
    useShowToast.mockReturnValue(showToastMock);

    const { result, waitForNextUpdate } = renderHook(() => useGetUserProfileById(mockUserId));

    await waitForNextUpdate();

    expect(getDoc).toHaveBeenCalledWith(firestore, 'users', mockUserId);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.userProfile).toBeNull();
    expect(showToastMock).toHaveBeenCalledWith('Error', mockError.message, 'error');
  });

  test('sets loading state to true initially', async () => {
    const mockUserId = 'testUserId';
    getDoc.mockReturnValue(new Promise(() => {}));
    useShowToast.mockImplementation(() => jest.fn());

    const { result } = renderHook(() => useGetUserProfileById(mockUserId));

    expect(result.current.isLoading).toBe(true);
    expect(result.current.userProfile).toBeNull();
  });
});
