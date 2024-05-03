// __tests__/useShowToast.test.js

import { renderHook } from '@testing-library/react-hooks';
import { useToast } from '@chakra-ui/react';
import useShowToast from '../hooks/useShowToast';

// Mock useToast
jest.mock('@chakra-ui/react', () => ({
  useToast: jest.fn(),
}));

describe('useShowToast', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('showToast function calls useToast with correct parameters', () => {
    const toastMock = jest.fn();
    useToast.mockReturnValue(toastMock);

    const { result } = renderHook(() => useShowToast());

    // Call the showToast function
    result.current('Test Title', 'Test Description', 'success');

    // Check if useToast has been called with the correct parameters
    expect(toastMock).toHaveBeenCalledWith({
      title: 'Test Title',
      description: 'Test Description',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  });

  // Additional tests can be added to ensure useCallback works correctly
});
