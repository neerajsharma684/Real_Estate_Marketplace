import { createSlice, current }  from '@reduxjs/toolkit';

const initialState = {
    currentUser: null,
    error: null,
    loading: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        siginInStart: (state) => {
            state.loading = true;
        }
    }
});