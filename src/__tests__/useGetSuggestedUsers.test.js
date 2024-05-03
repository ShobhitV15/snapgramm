// __tests__/useGetSuggestedUsers.test.js

import { renderHook, act } from '@testing-library/react-hooks';
import useGetSuggestedUsers from '../hooks/useGetSuggestedUsers';
import useAuthStore from '../store/authStore';
import useShowToast from '../hooks/useShowToast';
import { getDocs, query } from 'firebase/firestore';
import { firestore } from '../firebase/firebase';

// Mock dependencies
jest.mock('../store/authStore');
jest.mock('../hooks/useShowToast');
jest.mock('firebase/firestore');

describe('useGetSuggestedUsers', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('fetches suggested users successfully', async () => {
    const authUser = {
      uid: 'testUserId',
      following: ['userId1']
    };
    useAuthStore.mockReturnValue(authUser);
    useShowToast.mockImplementation(() => jest.fn());
    const mockQuerySnapshot = {
      forEach: jest.fn((callback) => {
        callback({
          id: 'suggestedUserId1',
          data: () => ({
            uid: 'suggestedUserId1',
            // Other user data...
          })
        });
        callback({
          id: 'suggestedUserId2',
          data: () => ({
            uid: 'suggestedUserId2',
            // Other user data...
          })
        });
      })
    };
    getDocs.mockResolvedValue(mockQuerySnapshot);

    const { result, waitForNextUpdate } = renderHook(() => useGetSuggestedUsers());

    await waitForNextUpdate();

    expect(query).toHaveBeenCalledWith(
      collection(firestore, 'users'),
      where('uid', 'not-in', [authUser.uid, ...authUser.following]),
      orderBy('uid'),
      limit(3)
    );
    expect(getDocs).toHaveBeenCalled();
    expect(result.current.suggestedUsers).toEqual([
      {
        id: 'suggestedUserId1',
        uid: 'suggestedUserId1',
        // Other user data...
      },
      {
        id: 'suggestedUserId2',
        uid: 'suggestedUserId2',
        // Other user data...
      }
    ]);
    expect(result.current.isLoading).toBe(false);
  });

  // Similar tests for no suggested users, error handling, and initial loading state
});
