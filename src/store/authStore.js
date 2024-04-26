import {create} from 'zustand'

const useAuthStore = create((set) => ({
	user: JSON.parse(localStorage.getItem('user-info')) , // its checking if the user has anything in the loacal storage
	login: (user) => set({ user }),                      // if its there it sets the login state
	logout: () => set({ user: null }),
	setUser: (user) => set({ user }),
}));

export default useAuthStore;