import { createSlice } from '@reduxjs/toolkit';

import { InitialStateProfile, Post } from '../../types/interface';

const initialState: InitialStateProfile = {
    profilePosts: [], 
    isProfilePostsFetched: false 
};

const profileSlice = createSlice({
    name: 'profile', 
    initialState, 

    reducers: {
        setIsProfilePostsFetched: (state): void => {
            state.isProfilePostsFetched = true;
        }, 

        removeIsProfilePostsFetched: (state): void => {
            state.isProfilePostsFetched = false;
        }, 

        setProfilePosts: (state, action): void => {
            const profilePosts: Array<Post> = action.payload; 
            state.profilePosts = profilePosts;
        },

        clearProfilePosts: (state): void => {
            state.profilePosts = [];
        }, 

        addProfilePost: (state, action): void => {
            const newPost: Post = action.payload; 
            const allPosts: Array<Post> = state.profilePosts; 

            allPosts.unshift(newPost); 
            state.profilePosts = allPosts;
        },

        likeProfilePost: (state, action): void => {
            const { postId, userId }: {
                postId: string, 
                userId: string 
            } = action.payload;

            const allPosts: Array<Post> = state.profilePosts;

            const updatedFeedPosts: Array<Post> = allPosts.map( (post: Post): Post => {
                if (post._id === postId)
                {
                    const likes: any = post.likes;

                    if (!likes[userId])
                    {
                        likes[userId] = true;
                    }

                    return {
                        ...post, 
                        likes 
                    };
                }

                return post;
            });

            state.profilePosts = updatedFeedPosts;
        },

        unlikeProfilePost: (state, action): void => {
            const { postId, userId }: {
                postId: string, 
                userId: string 
            } = action.payload;

            const allPosts: Array<Post> = state.profilePosts;

            const updatedFeedPosts: Array<Post> = allPosts.map( (post: Post): Post => {
                if (post._id === postId)
                {
                    const likes: any = post.likes;

                    if (likes[userId])
                    {
                        delete likes[userId];
                    }

                    return {
                        ...post, 
                        likes 
                    };
                }

                return post;
            });

            state.profilePosts = updatedFeedPosts;
        }
    }
});

export const {
    setIsProfilePostsFetched, 
    removeIsProfilePostsFetched, 
    setProfilePosts, 
    clearProfilePosts, 
    addProfilePost, 
    likeProfilePost, 
    unlikeProfilePost
} = profileSlice.actions;

export default profileSlice.reducer;