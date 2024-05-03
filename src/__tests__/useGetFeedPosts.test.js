// __tests__/useGetFeedPosts.test.js

import { renderHook, act } from '@testing-library/react-hooks';
import useGetFeedPosts from '../hooks/useGetFeedPosts';
import useAuthStore from '../store/authStore';
import usePostStore from '../store/postStore';
import useShowToast from '../hooks/useShowToast';
import useUserProfileStore from '../store/userProfileStore';
import { getDocs, query, where } from 'firebase/firestore';
import { firestore } from '../firebase/firebase';

// Mock dependencies
jest.mock('../store/authStore');
jest.mock('../store/postStore');
jest.mock('../hooks/useShowToast');
jest.mock('../store/userProfileStore');
jest.mock('firebase/firestore');

describe('useGetFeedPosts', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('fetches feed posts successfully', async () => {
    const authUser = {
      uid: 'testUserId',
      following: ['userId1', 'userId2']
    };
    useAuthStore.mockReturnValue(authUser);
    const setPosts = jest.fn();
    usePostStore.mockReturnValue({ posts: [], setPosts });
    useShowToast.mockImplementation(() => jest.fn());
    const setUserProfile = jest.fn();
    useUserProfileStore.mockReturnValue({ setUserProfile });

    const mockQuerySnapshot = {
      forEach: jest.fn((callback) => {
        callback({
          id: 'postId1',
          data: () => ({
            createdBy: 'userId1',
            createdAt: 1624426828000, // Sample timestamp
            // Other post data...
          })
        });
        callback({
          id: 'postId2',
          data: () => ({
            createdBy: 'userId2',
            createdAt: 1624426828000, // Sample timestamp
            // Other post data...
          })
        });
      })
    };
    getDocs.mockResolvedValue(mockQuerySnapshot);

    const { result, waitForNextUpdate } = renderHook(() => useGetFeedPosts());

    await waitForNextUpdate();

    expect(query).toHaveBeenCalledWith(collection(firestore, 'posts'), where('createdBy', 'in', authUser.following));
    expect(getDocs).toHaveBeenCalled();
    expect(setPosts).toHaveBeenCalledWith([
      {
        id: 'postId1',
        createdBy: 'userId1',
        createdAt: 1624426828000,
        // Other post data...
      },
      {
        id: 'postId2',
        createdBy: 'userId2',
        createdAt: 1624426828000,
        // Other post data...
      }
    ]);
    expect(setIsLoading).toHaveBeenCalledWith(false);
  });

  // Similar tests for no followers, error handling, and initial loading state
});
