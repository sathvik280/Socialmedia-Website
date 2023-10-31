import { createSlice } from '@reduxjs/toolkit';

import { InitialStateHome, Post } from '../../types/interface';

const initialState: InitialStateHome = {
    feedPosts: [], 
    isFeedPostsFetched: false
};

const homeSlice = createSlice({
    name: 'home', 
    initialState, 

    reducers: {
        setIsFeedPostsFetched: (state): void => {
            state.isFeedPostsFetched = true;
        }, 

        removeIsFeedPostsFetched: (state): void => {
            state.isFeedPostsFetched = false;
        },

        setFeedPosts: (state, action): void => {
            const feedPosts: Array<Post> = action.payload; 
            state.feedPosts = feedPosts;
        },

        clearFeedPosts: (state): void => {
            state.feedPosts = [];
        },

        addFeedPost: (state, action): void => {
            const newPost: Post = action.payload; 
            const allPosts: Array<Post> = state.feedPosts; 

            allPosts.unshift(newPost); 
            state.feedPosts = allPosts;
        }, 

        likeFeedPost: (state, action): void => {
            const { postId, userId }: {
                postId: string, 
                userId: string 
            } = action.payload;

            const allPosts: Array<Post> = state.feedPosts;

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

            state.feedPosts = updatedFeedPosts;
        }, 

        unlikeFeedPost: (state, action): void => {
            const { postId, userId }: {
                postId: string, 
                userId: string 
            } = action.payload;

            const allPosts: Array<Post> = state.feedPosts;

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

            state.feedPosts = updatedFeedPosts;
        }
    }
});

export const {
    setIsFeedPostsFetched, 
    removeIsFeedPostsFetched, 
    setFeedPosts, 
    clearFeedPosts, 
    addFeedPost, 
    likeFeedPost, 
    unlikeFeedPost
} = homeSlice.actions;

export default homeSlice.reducer;