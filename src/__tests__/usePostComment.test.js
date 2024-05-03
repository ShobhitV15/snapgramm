// __tests__/usePostComment.test.js

import { renderHook, act } from '@testing-library/react-hooks';
import usePostComment from '../hooks/usePostComment';
import useShowToast from '../hooks/useShowToast';
import useAuthStore from '../store/authStore';
import usePostStore from '../store/postStore';
import { doc, updateDoc } from 'firebase/firestore';
import { firestore } from '../firebase/firebase';

// Mock dependencies
jest.mock('../hooks/useShowToast');
jest.mock('../store/authStore');
jest.mock('../store/postStore');
jest.mock('firebase/firestore');

describe('usePostComment', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('adds a comment successfully', async () => {
    const mockPostId = 'post123';
    const mockComment = 'This is a test comment';
    const mockAuthUser = { uid: 'user123' };
    const mockNewComment = {
      comment: mockComment,
      createdAt: expect.any(Number),
      createdBy: mockAuthUser.uid,
      postId: mockPostId,
    };
    const updateDocMock = jest.fn();
    updateDoc.mockReturnValue(new Promise(() => {}));
    useAuthStore.mockReturnValue(mockAuthUser);
    useShowToast.mockImplementation(() => jest.fn());
    usePostStore.mockReturnValue({ addComment: jest.fn() });

    const { result } = renderHook(() => usePostComment());

    await act(async () => {
      await result.current.handlePostComment(mockPostId, mockComment);
    });

    expect(updateDoc).toHaveBeenCalledWith(
      doc(firestore, 'posts', mockPostId),
      { comments: expect.arrayContaining([mockNewComment]) }
    );
    expect(usePostStore().addComment).toHaveBeenCalledWith(mockPostId, mockNewComment);
    expect(result.current.isCommenting).toBe(false);
  });

  test('handles user not logged in', async () => {
    const mockPostId = 'post123';
    const mockComment = 'This is a test comment';
    useAuthStore.mockReturnValue(null);
    const showToastMock = jest.fn();
    useShowToast.mockReturnValue(showToastMock);

    const { result } = renderHook(() => usePostComment());

    await act(async () => {
      await result.current.handlePostComment(mockPostId, mockComment);
    });

    expect(showToastMock).toHaveBeenCalledWith('Error', 'You must be logged in to comment', 'error');
    expect(updateDoc).not.toHaveBeenCalled();
    expect(usePostStore().addComment).not.toHaveBeenCalled();
    expect(result.current.isCommenting).toBe(false);
  });

  test('handles error during comment posting', async () => {
    const mockPostId = 'post123';
    const mockComment = 'This is a test comment';
    const mockError = new Error('Something went wrong');
    updateDoc.mockRejectedValue(mockError);
    const mockAuthUser = { uid: 'user123' };
    useAuthStore.mockReturnValue(mockAuthUser);
    const showToastMock = jest.fn();
    useShowToast.mockReturnValue(showToastMock);
    usePostStore.mockReturnValue({ addComment: jest.fn() });

    const { result } = renderHook(() => usePostComment());

    await act(async () => {
      await result.current.handlePostComment(mockPostId, mockComment);
    });

    expect(showToastMock).toHaveBeenCalledWith('Error', mockError.message, 'error');
    expect(usePostStore().addComment).not.toHaveBeenCalled();
    expect(result.current.isCommenting).toBe(false);
  });

  test('initializes state correctly', () => {
    const { result } = renderHook(() => usePostComment());

    expect(result.current.isCommenting).toBe(false);
  });
});
