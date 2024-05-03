// __tests__/usePreviewImg.test.js

import { renderHook, act } from '@testing-library/react-hooks';
import usePreviewImg from '../hooks/usePreviewImg';
import useShowToast from '../hooks/useShowToast';

// Mock dependencies
jest.mock('../hooks/useShowToast');

describe('usePreviewImg', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('selects an image successfully', () => {
    const file = new File(['(⌐□_□)'], 'test.png', { type: 'image/png' });
    const readerResult = 'data:image/png;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIj4KICA8Y2lyY2xlIGN4PSIwIiBjeT0iMCIgcj0iMCIgc3R5bGU9ImZpbGw6cmVkOyIvPg==';
    const readerMock = {
      onloadend: null,
      readAsDataURL: jest.fn(),
      result: readerResult,
    };
    global.FileReader = jest.fn(() => readerMock);
    const showToastMock = jest.fn();
    useShowToast.mockImplementation(() => showToastMock);

    const { result } = renderHook(() => usePreviewImg());

    act(() => {
      result.current.handleImageChange({ target: { files: [file] } });
    });

    expect(showToastMock).not.toHaveBeenCalled();
    expect(result.current.selectedFile).toBe(readerResult);
    expect(readerMock.readAsDataURL).toHaveBeenCalledWith(file);
  });

  test('shows error when file size is too large', () => {
    const largeFile = new File(['(⌐□_□)'], 'large.png', { type: 'image/png', size: 3 * 1024 * 1024 });
    const showToastMock = jest.fn();
    useShowToast.mockImplementation(() => showToastMock);

    const { result } = renderHook(() => usePreviewImg());

    act(() => {
      result.current.handleImageChange({ target: { files: [largeFile] } });
    });

    expect(showToastMock).toHaveBeenCalledWith('Error', 'File size must be less than 2MB', 'error');
    expect(result.current.selectedFile).toBe(null);
  });

  test('shows error when selecting a non-image file', () => {
    const nonImageFile = new File(['(⌐□_□)'], 'document.txt', { type: 'text/plain' });
    const showToastMock = jest.fn();
    useShowToast.mockImplementation(() => showToastMock);

    const { result } = renderHook(() => usePreviewImg());

    act(() => {
      result.current.handleImageChange({ target: { files: [nonImageFile] } });
    });

    expect(showToastMock).toHaveBeenCalledWith('Error', 'Please select an image file', 'error');
    expect(result.current.selectedFile).toBe(null);
  });

  test('initializes state correctly', () => {
    const { result } = renderHook(() => usePreviewImg());

    expect(result.current.selectedFile).toBe(null);
  });
});
