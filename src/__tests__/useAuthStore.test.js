// __tests__/useAuthStore.test.js

import { act } from '@testing-library/react-hooks';
import { create } from 'zustand';
import useAuthStore from '../store/authStore';

// Mock localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: jest.fn(key => store[key]),
    setItem: jest.fn((key, value) => {
      store[key] = value.toString();
    }),
    clear: jest.fn(() => {
      store = {};
    })
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

describe('useAuthStore', () => {
  afterEach(() => {
    localStorage.clear();
  });

  test('user is initially null', () => {
    const { getState } = create(useAuthStore);
    expect(getState().user).toBeNull();
  });

  test('login function sets user', () => {
    const { getState } = create(useAuthStore);
    const testUser = { name: 'Test User', email: 'test@example.com' };
    act(() => {
      getState().login(testUser);
    });
    expect(getState().user).toEqual(testUser);
    expect(localStorage.setItem).toHaveBeenCalledWith('user-info', JSON.stringify(testUser));
  });

  test('logout function sets user to null and clears localStorage', () => {
    const { getState } = create(useAuthStore);
    act(() => {
      getState().logout();
    });
    expect(getState().user).toBeNull();
    expect(localStorage.removeItem).toHaveBeenCalledWith('user-info');
  });

  test('setUser function sets user', () => {
    const { getState } = create(useAuthStore);
    const testUser = { name: 'Test User', email: 'test@example.com' };
    act(() => {
      getState().setUser(testUser);
    });
    expect(getState().user).toEqual(testUser);
    expect(localStorage.setItem).toHaveBeenCalledWith('user-info', JSON.stringify(testUser));
  });

  test('user is retrieved from localStorage on initialization', () => {
    const storedUser = { name: 'Stored User', email: 'stored@example.com' };
    localStorage.setItem('user-info', JSON.stringify(storedUser));
    const { getState } = create(useAuthStore);
    expect(getState().user).toEqual(storedUser);
  });
});
