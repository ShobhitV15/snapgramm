// __tests__/useLikePost.test.js

import { renderHook, act } from '@testing-library/react-hooks';
import useLikePost from '../hooks/useLikePost';
import useShowToast from '../hooks/useShowToast';
import useAuthStore from '../store/authStore';
import { doc, updateDoc } from 'firebase/firestore';
import { firestore } from '../firebase/firebase';

// Mock dependencies
jest.mock('../hooks/useShowToast');
jest.mock('../store/authStore');
jest.mock('firebase/firestore');

describe('useLikePost', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('likes a post successfully', async () => {
    const mockPost = { id: 'post123', likes: ['user123'] };
    const mockAuthUser = { uid: 'user123' };
    const updateDocMock = jest.fn();
    updateDoc.mockReturnValue(new Promise(() => {}));
    useAuthStore.mockReturnValue(mockAuthUser);
    useShowToast.mockImplementation(() => jest.fn());

    const { result, waitForNextUpdate } = renderHook(() => useLikePost(mockPost));

    await act(async () => {
      await result.current.handleLikePost();
      await waitForNextUpdate();
    });

    expect(updateDoc).toHaveBeenCalledWith(
      doc(firestore, 'posts', mockPost.id),
      { likes: expect.arrayContaining([mockAuthUser.uid]) }
    );
    expect(result.current.isLiked).toBe(true);
    expect(result.current.likes).toBe(2); // One like added
  });

  test('unlikes a post successfully', async () => {
    const mockPost = { id: 'post123', likes: ['user123'] };
    const mockAuthUser = { uid: 'user123' };
    const updateDocMock = jest.fn();
    updateDoc.mockReturnValue(new Promise(() => {}));
    useAuthStore.mockReturnValue(mockAuthUser);
    useShowToast.mockImplementation(() => jest.fn());

    const { result, waitForNextUpdate } = renderHook(() => useLikePost(mockPost));

    await act(async () => {
      await result.current.handleLikePost(); // Unlike post
      await waitForNextUpdate();
    });

    expect(updateDoc).toHaveBeenCalledWith(
      doc(firestore, 'posts', mockPost.id),
      { likes: expect.not.arrayContaining([mockAuthUser.uid]) }
    );
    expect(result.current.isLiked).toBe(false);
    expect(result.current.likes).toBe(0); // One like removed
  });

  test('handles user not logged in', async () => {
    const mockPost = { id: 'post123', likes: ['user123'] };
    useAuthStore.mockReturnValue(null);
    const showToastMock = jest.fn();
    useShowToast.mockReturnValue(showToastMock);

    const { result } = renderHook(() => useLikePost(mockPost));

    await act(async () => {
      await result.current.handleLikePost();
    });

    expect(showToastMock).toHaveBeenCalledWith('Error', 'You must be logged in to like a post', 'error');
  });

  test('handles error during liking/unliking post', async () => {
    const mockPost = { id: 'post123', likes: ['user123'] };
    const mockError = new Error('Something went wrong');
    updateDoc.mockRejectedValue(mockError);
    const mockAuthUser = { uid: 'user123' };
    useAuthStore.mockReturnValue(mockAuthUser);
    const showToastMock = jest.fn();
    useShowToast.mockReturnValue(showToastMock);

    const { result } = renderHook(() => useLikePost(mockPost));

    await act(async () => {
      await result.current.handleLikePost();
    });

    expect(showToastMock).toHaveBeenCalledWith('Error', mockError.message, 'error');
  });

  test('initializes state correctly', () => {
    const mockPost = { id: 'post123', likes: ['user123'] };
    const mockAuthUser = { uid: 'user123' };
    useAuthStore.mockReturnValue(mockAuthUser);

    const { result } = renderHook(() => useLikePost(mockPost));

    expect(result.current.isLiked).toBe(true);
    expect(result.current.likes).toBe(1);
    expect(result.current.isUpdating).toBe(false);
  });
});
