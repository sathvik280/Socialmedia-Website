import { createSlice } from '@reduxjs/toolkit';

import { InitialStateWindow, ChatFriend } from '../../types/interface';

const initialState: InitialStateWindow = {
    isOpen: false, 
    selectedFriend: {
        _id: '', 
        name: '', 
        imageName: '',
        imageUrl: ''
    }
};

const windowSlice = createSlice({
    name: 'window', 
    initialState, 

    reducers: {
        setIsOpen: (state): void => {
            state.isOpen = true;
        }, 

        removeIsOpen: (state): void => {
            state.isOpen = false;
        }, 

        setSelectedFriend: (state, action): void => {
            const selectedFriend: ChatFriend = action.payload; 
            state.selectedFriend = selectedFriend;
        }, 

        removeSelectedFriend: (state): void => {
            state.selectedFriend = {
                _id: '', 
                name: '', 
                imageName: '', 
                imageUrl: ''
            };
        }
    }
});

export const {
    setIsOpen, 
    removeIsOpen, 
    setSelectedFriend, 
    removeSelectedFriend
} = windowSlice.actions;

export default windowSlice.reducer;