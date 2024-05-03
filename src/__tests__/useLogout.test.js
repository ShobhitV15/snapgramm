// __tests__/useLogout.test.js

import { renderHook, act } from '@testing-library/react-hooks';
import useLogout from '../hooks/useLogout';

// Mock dependencies
jest.mock('react-firebase-hooks/auth', () => ({
  useSignOut: jest.fn(),
}));
jest.mock('../store/authStore', () => ({
  __esModule: true,
  default: jest.fn(),
}));
jest.mock('../useShowToast', () => jest.fn());

describe('useLogout', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('handleLogout successfully logs out user', async () => {
    const showToastMock = jest.fn();
    require('../useShowToast').mockImplementation(() => showToastMock);
    const logoutUserMock = jest.fn();
    require('../store/authStore').default.mockImplementation(() => logoutUserMock);
    const signOutMock = jest.fn();
    require('react-firebase-hooks/auth').useSignOut.mockReturnValue([signOutMock, false, null]);

    const { result } = renderHook(() => useLogout());

    await act(async () => {
      await result.current.handleLogout();
    });

    expect(signOutMock).toHaveBeenCalled();
    expect(localStorage.removeItem).toHaveBeenCalledWith('user-info');
    expect(logoutUserMock).toHaveBeenCalled();
    expect(showToastMock).not.toHaveBeenCalled();
  });

  test('handleLogout handles errors', async () => {
    const showToastMock = jest.fn();
    require('../useShowToast').mockImplementation(() => showToastMock);
    const logoutUserMock = jest.fn();
    require('../store/authStore').default.mockImplementation(() => logoutUserMock);
    const signOutMock = jest.fn();
    signOutMock.mockRejectedValue(new Error('Logout failed'));
    require('react-firebase-hooks/auth').useSignOut.mockReturnValue([signOutMock, false, null]);

    const { result } = renderHook(() => useLogout());

    await act(async () => {
      await result.current.handleLogout();
    });

    expect(showToastMock).toHaveBeenCalledWith('Error', 'Logout failed', 'error');
    expect(localStorage.removeItem).not.toHaveBeenCalled();
    expect(logoutUserMock).not.toHaveBeenCalled();
  });
});
