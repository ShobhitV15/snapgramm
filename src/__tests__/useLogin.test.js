// __tests__/useLogin.test.js

import { renderHook, act } from '@testing-library/react-hooks';
import useLogin from '../hooks/useLogin';

// Mock dependencies
jest.mock('../useShowToast', () => () => jest.fn());
jest.mock('../store/authStore', () => ({
  __esModule: true,
  default: jest.fn(),
}));
jest.mock('react-firebase-hooks/auth', () => ({
  useSignInWithEmailAndPassword: jest.fn(),
}));
jest.mock('firebase/firestore', () => ({
  doc: jest.fn(),
  getDoc: jest.fn(),
}));

describe('useLogin', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('login function successfully logs in user', async () => {
    const showToastMock = jest.fn();
    require('../useShowToast').default.mockImplementation(() => showToastMock);
    const loginUserMock = jest.fn();
    require('../store/authStore').default.mockImplementation(() => loginUserMock);
    const signInWithEmailAndPasswordMock = jest.fn();
    require('react-firebase-hooks/auth').useSignInWithEmailAndPassword.mockReturnValue([
      signInWithEmailAndPasswordMock,
      null,
      false,
      null,
    ]);

    const mockUser = { uid: 'mockUserId' };
    const mockDocData = { some: 'data' };
    const mockInputs = { email: 'test@example.com', password: '123456' };

    const { result, waitForNextUpdate } = renderHook(() => useLogin());

    await act(async () => {
      await result.current.login(mockInputs);
      await waitForNextUpdate();
    });

    expect(signInWithEmailAndPasswordMock).toHaveBeenCalledWith(mockInputs.email, mockInputs.password);

    expect(localStorage.setItem).toHaveBeenCalledWith('user-info', JSON.stringify(mockDocData));

    expect(loginUserMock).toHaveBeenCalledWith(mockDocData);

    expect(showToastMock).not.toHaveBeenCalled();
  });

  test('login function handles missing input fields', async () => {
    const showToastMock = jest.fn();
    require('../useShowToast').default.mockImplementation(() => showToastMock);
    const loginUserMock = jest.fn();
    require('../store/authStore').default.mockImplementation(() => loginUserMock);

    const { result } = renderHook(() => useLogin());

    const mockInputs = { email: '', password: '' };

    await act(async () => {
      await result.current.login(mockInputs);
    });

    expect(showToastMock).toHaveBeenCalledWith('error', 'Please provide email and password', 'error');

    expect(loginUserMock).not.toHaveBeenCalled();
  });

  test('login function handles authentication errors', async () => {
    const showToastMock = jest.fn();
    require('../useShowToast').default.mockImplementation(() => showToastMock);
    const loginUserMock = jest.fn();
    require('../store/authStore').default.mockImplementation(() => loginUserMock);

    const signInWithEmailAndPasswordMock = jest.fn();
    signInWithEmailAndPasswordMock.mockRejectedValue(new Error('Authentication failed'));
    require('react-firebase-hooks/auth').useSignInWithEmailAndPassword.mockReturnValue([
      signInWithEmailAndPasswordMock,
      null,
      false,
      null,
    ]);

    const { result, waitForNextUpdate } = renderHook(() => useLogin());

    const mockInputs = { email: 'test@example.com', password: '123456' };

    await act(async () => {
      await result.current.login(mockInputs);
      await waitForNextUpdate();
    });

    expect(showToastMock).toHaveBeenCalledWith('error', 'Authentication failed', 'error');

    expect(loginUserMock).not.toHaveBeenCalled();
  });
});
