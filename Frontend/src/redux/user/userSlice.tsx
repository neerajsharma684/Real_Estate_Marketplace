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

const initialState: UserState = {
    currentUser: Cookies.get('access_token') ? {name: "Deafult User", email: "default@example.com"} : null,
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
            Cookies.set('access_token', 'some_token'); // Set a token or user info in cookies
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