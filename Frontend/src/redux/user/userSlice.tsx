import { createSlice }  from '@reduxjs/toolkit';
import Cookies from 'js-cookie';


interface User {
    name: string;
    email: string;
}

interface UserState {
    currentUser: User | null;
    loading: boolean;
}

const getUserFromCookie = (): User | null => {
    const cookie = Cookies.get('access_token');
    if (cookie) {
      try {
        const user = JSON.parse(cookie);
        return { name: user.name, email: user.email };
      } catch (error) {
        console.error('Error parsing cookie:', error);
        return null;
      }
    }
    return null;
  };

const initialState: UserState = {
    currentUser: getUserFromCookie(),
    loading: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        signInStart: (state) => {
            state.loading = true;
        },
        signInSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            Cookies.set('access_token', JSON.stringify(action.payload)); // Set a token or user info in cookies
        },
        signInFailure: (state) => {
            state.loading = false;
        },
        signout: (state) => {
            state.currentUser = null;
            Cookies.remove('access_token');
        }
    }
});

export const { signInStart, signInSuccess, signInFailure, signout } = userSlice.actions;

export default userSlice.reducer;