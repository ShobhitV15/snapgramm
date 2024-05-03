// __tests__/useGetUserPosts.test.js

import { renderHook, act } from '@testing-library/react-hooks';
import useGetUserPosts from '../hooks/useGetUserPosts';
import usePostStore from '../store/postStore';
import useShowToast from '../hooks/useShowToast';
import useUserProfileStore from '../store/userProfileStore';
import { getDocs, query } from 'firebase/firestore';
import { firestore } from '../firebase/firebase';

// Mock dependencies
jest.mock('../store/postStore');
jest.mock('../hooks/useShowToast');
jest.mock('../store/userProfileStore');
jest.mock('firebase/firestore');

describe('useGetUserPosts', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('fetches user posts successfully', async () => {
    const userProfile = { uid: 'testUserId' };
    useUserProfileStore.mockReturnValue(userProfile);
    useShowToast.mockImplementation(() => jest.fn());
    const mockQuerySnapshot = {
      forEach: jest.fn((callback) => {
        callback({
          id: 'postId1',
          data: () => ({
            createdBy: 'testUserId',
            createdAt: 1624426828000, // Sample timestamp
            // Other post data...
          })
        });
        callback({
          id: 'postId2',
          data: () => ({
            createdBy: 'testUserId',
            createdAt: 1624426828000, // Sample timestamp
            // Other post data...
          })
        });
      })
    };
    getDocs.mockResolvedValue(mockQuerySnapshot);

    const { result, waitForNextUpdate } = renderHook(() => useGetUserPosts());

    await waitForNextUpdate();

    expect(query).toHaveBeenCalledWith(
      collection(firestore, 'posts'),
      where('createdBy', '==', userProfile.uid)
    );
    expect(getDocs).toHaveBeenCalled();
    expect(result.current.posts).toEqual([
      {
        id: 'postId1',
        createdBy: 'testUserId',
        createdAt: 1624426828000,
        // Other post data...
      },
      {
        id: 'postId2',
        createdBy: 'testUserId',
        createdAt: 1624426828000,
        // Other post data...
      }
    ]);
    expect(result.current.isLoading).toBe(false);
  });

  // Similar tests for no user profile, error handling, and initial loading state
});
