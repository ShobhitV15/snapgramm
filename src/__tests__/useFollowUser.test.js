// __tests__/useFollowUser.test.js

import { renderHook, act } from '@testing-library/react-hooks';
import useFollowUser from '../hooks/useFollowUser';
import useAuthStore from '../store/authStore';
import useUserProfileStore from '../store/userProfileStore';
import useShowToast from '../hooks/useShowToast';
import { updateDoc } from 'firebase/firestore';
import { firestore } from '../firebase/firebase';

// Mock dependencies
jest.mock('../store/authStore');
jest.mock('../store/userProfileStore');
jest.mock('../hooks/useShowToast');
jest.mock('firebase/firestore');

describe('useFollowUser', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('follows user successfully', async () => {
    const authUser = {
      uid: 'testUserId',
      following: ['userId1']
    };
    useAuthStore.mockReturnValue(authUser);
    const setUserProfile = jest.fn();
    useUserProfileStore.mockReturnValue({ userProfile: { followers: [] }, setUserProfile });
    useShowToast.mockImplementation(() => jest.fn());
    const { result } = renderHook(() => useFollowUser('userId2'));

    await act(async () => {
      await result.current.handleFollowUser();
    });

    expect(updateDoc).toHaveBeenCalledTimes(2); // updateDoc called twice
    // Ensure firestore updateDoc is called with correct parameters to follow the user
    expect(updateDoc.mock.calls[0][0]).toEqual(expect.anything()); // currentUserRef
    expect(updateDoc.mock.calls[0][1]).toEqual({
      following: expect.arrayContaining(['userId1', 'userId2'])
    });
    expect(updateDoc.mock.calls[1][0]).toEqual(expect.anything()); // userToFollowOrUnfollowRef
    expect(updateDoc.mock.calls[1][1]).toEqual({
      followers: expect.arrayContaining(['testUserId'])
    });
    expect(setUserProfile).toHaveBeenCalledWith(expect.any(Function)); // setUserProfile called with a function
    expect(setUserProfile.mock.calls[0][0]({ followers: [] })).toEqual({ followers: ['testUserId'] }); // setUserProfile called with updated userProfile
  });

  // Similar tests for unfollowing user, error handling, and initial state
});
