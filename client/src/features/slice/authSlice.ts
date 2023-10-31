import { createSlice } from '@reduxjs/toolkit';

import { InitialStateAuth, User } from '../../types/interface';

const initialState: InitialStateAuth = {
    token: '', 
    user: {
        _id: '', 
        name: '', 
        email: '', 
        location: '', 
        occupation: '', 
        imageName: '', 
        imageUrl: ''
    }
};

const authSlice = createSlice({
    name: 'auth', 
    initialState, 

    reducers: {
        setToken: (state, action): void => {
            const token: string = action.payload; 
            state.token = token;
        }, 

        removeToken: (state): void => {
            state.token = '';
        }, 

        setUser: (state, action): void => {
            const user: User = action.payload;
            state.user = user;
        },

        removeUser: (state): void => {
            state.user = {
                _id: '', 
                name: '', 
                email: '', 
                location: '', 
                occupation: '', 
                imageName: '', 
                imageUrl: ''
            };
        }
    }
});

export const {
    setToken,
    removeToken, 
    setUser, 
    removeUser 
} = authSlice.actions;

export default authSlice.reducer;