import { createSlice } from '@reduxjs/toolkit';

import { InitialStateFriend, User } from '../../types/interface';

const initialState: InitialStateFriend = {
    friends: [], 
    isFriendsFetched: false 
};

const friendSlice = createSlice({
    name: 'friend', 
    initialState, 

    reducers: {
        setFriends: (state, action): void => {
            const friends: Array<User> = action.payload;
            state.friends = friends;
        }, 
        
        clearFriends: (state): void => {
            state.friends = [];
        },

        setIsFriendsFetched: (state): void => {
            state.isFriendsFetched = true;
        }, 

        removeIsFriendsFetched: (state): void => {
            state.isFriendsFetched = false;
        },

        addFriend: (state, action): void => {
            const newFriend: User = action.payload; 
            const allFriends: Array<User> = state.friends;
            const isFriendsFetched: boolean = state.isFriendsFetched;

            if (!isFriendsFetched)
            {
                return;
            }

            const isFriend: boolean = !!allFriends.find( (eachFriend: User): boolean => {
                return eachFriend._id === newFriend._id;
            });

            if (isFriend)
            {
                return;
            }

            allFriends.push(newFriend);
            state.friends = allFriends;
        }, 

        removeFriend: (state, action): void => {
            const id: string = action.payload;
            const prevFriends: Array<User> = state.friends;
            const isFriendsFetched: boolean = state.isFriendsFetched;

            if (!isFriendsFetched)
            {
                return;
            }

            const newFriends: Array<User> = prevFriends.filter( (eachFriend: User): boolean => {
                return eachFriend._id !== id;
            });

            state.friends = newFriends;
        }
    }
});

export const {
    setFriends, 
    clearFriends, 
    setIsFriendsFetched, 
    removeIsFriendsFetched,
    addFriend, 
    removeFriend
} = friendSlice.actions;

export default friendSlice.reducer;