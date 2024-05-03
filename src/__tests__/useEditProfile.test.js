// __tests__/useEditProfile.test.js

import { renderHook, act } from '@testing-library/react-hooks';
import useEditProfile from '../hooks/useEditProfile';
import useAuthStore from '../store/authStore';
import useShowToast from '../hooks/useShowToast';
import useUserProfileStore from '../store/userProfileStore';
import { uploadString, getDownloadURL } from 'firebase/storage';
import { doc, updateDoc } from 'firebase/firestore';
import { firestore, storage } from '../firebase/firebase';

// Mock dependencies
jest.mock('../store/authStore');
jest.mock('../hooks/useShowToast');
jest.mock('../store/userProfileStore');
jest.mock('firebase/storage');
jest.mock('firebase/firestore');

describe('useEditProfile', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('successfully updates profile with inputs and file', async () => {
    const authUser = {
      uid: 'testUserId',
      fullName: 'Test User',
      username: 'testuser',
      bio: 'Test bio',
      profilePicURL: 'old_profile_pic_url'
    };
    useAuthStore.mockReturnValue(authUser);
    useShowToast.mockImplementation(() => jest.fn());
    useUserProfileStore.mockImplementation(() => jest.fn());

    const selectedFile = 'test_file_data_url';
    const inputs = {
      fullName: 'New Name',
      username: 'newusername',
      bio: 'New bio'
    };

    const { result } = renderHook(() => useEditProfile());

    await act(async () => {
      await result.current.editProfile(inputs, selectedFile);
    });

    expect(uploadString).toHaveBeenCalledWith(expect.anything(), selectedFile, 'data_url');
    expect(getDownloadURL).toHaveBeenCalledWith(expect.anything());
    expect(updateDoc).toHaveBeenCalledWith(expect.anything(), {
      ...authUser,
      fullName: inputs.fullName,
      username: inputs.username,
      bio: inputs.bio,
      profilePicURL: expect.any(String) // new profile pic URL
    });
    expect(localStorage.setItem).toHaveBeenCalledWith('user-info', JSON.stringify(expect.any(Object))); // updated user
    expect(useAuthStore).toHaveBeenCalledWith(expect.any(Function)); // setUser
    expect(useUserProfileStore).toHaveBeenCalledWith(expect.any(Function)); // setUserProfile
    expect(useShowToast).toHaveBeenCalledWith('Success', 'Profile updated successfully', 'success');
  });

  // Similar tests for other scenarios: without file, with file but without inputs, and error handling
});
