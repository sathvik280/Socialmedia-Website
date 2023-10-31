import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import { BsHeart, BsHeartFill } from 'react-icons/bs';

import { likeFeedPost, unlikeFeedPost } from '../features/slice/homeSlice';
import { likeProfilePost, unlikeProfilePost } from '../features/slice/profileSlice';

import { PostProps, Post, User, Store } from '../types/interface';

const PostP: React.FC<PostProps> = (props): JSX.Element => {
    const { post }: {
        post: Post
    } = props;

    const { user, token }: {
        user: User, 
        token: string 
    } = useSelector( (store: Store) => store.auth);

    const dispatch = useDispatch();

    const likeDislikePost: Function = async (url: string): Promise<void> => {
        try 
        {
            await axios.patch(url, 
                {
                    id: post._id, 
                    userId: user._id
                }, 
                {
                    headers: {
                        'authorization': token
                    }
                }
            );
        }

        catch (error: any)
        {
            console.log(error);
        }
    };

    const updatesLikes = () => {
        if (post.likes[user._id] === undefined)
        {
            likeDislikePost(`https://socialmedia-server-qq3r.onrender.com/post/like`);

            dispatch(likeProfilePost({
                postId: post._id, 
                userId: user._id
            }));

            dispatch(likeFeedPost({
                postId: post._id, 
                userId: user._id
            }));
        }

        else 
        {
            likeDislikePost(`https://socialmedia-server-qq3r.onrender.com/post/unlike`);

            dispatch(unlikeProfilePost({
                postId: post._id, 
                userId: user._id
            }));

            dispatch(unlikeFeedPost({
                postId: post._id, 
                userId: user._id
            }));
        }
    };

    return (
        <div 
            className="flex flex-col gap-y-5 bg-white py-5 px-4 rounded-lg"
            style={ {boxShadow: "0px 0px 8px 0px lightgrey"} }
        >
            <div className="flex flex-row items-center justify-between">
                <div className="flex flex-row items-center gap-x-4 cursor-default">
                    <img
                        src={post.userImageUrl}
                        alt=""
                        className="w-[60px] h-[60px] object-cover rounded-full bg-[#F6F6F6]" 
                    />

                    <div className="flex flex-col items-start">
                        <div className="text-[#666666]">
                            {post.userName}
                        </div>

                        <div className="text-[12px] font-light text-[#858585]">
                            {post.userLocation}
                        </div>
                    </div>
                </div>
            </div>

            <div className="text-[#666666]">
                {post.description}
            </div>

            <img
                src={post.postImageUrl}
                alt=""
                className="w-full rounded-lg object-cover min-h-[300px] bg-[#F6F6F6]" 
            />

            <div className="flex flex-row items-center gap-x-4 pl-1">
                <div 
                    className="text-xl cursor-pointer"
                    onClick={ () => {
                        updatesLikes();
                    }}
                >
                    {
                        post.likes[user._id] ? 
                        <BsHeartFill className="text-red-500"/> :
                        <BsHeart className="text-[#4D4D4D]"/>
                    }
                </div>

                <div className="text-[#4D4D4D] text-lg cursor-default">
                    {Object.keys(post.likes).length}
                </div>
            </div>
        </div>
    );
};

export default PostP;