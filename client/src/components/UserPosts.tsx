import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';

import { ImSpinner8 } from 'react-icons/im';

import PostU from './PostU';

import { userPostsProps, Post, Store, ResponseDataUserPosts } from '../types/interface';

const UserPosts: React.FC<userPostsProps> = (props): JSX.Element => {
    const { 
        userPosts, 
        setUserPosts, 
        isUserPostsFetched, 
        setIsUserPostsFetched 
    }: {
        userPosts: Array<Post>,
        setUserPosts: React.Dispatch<React.SetStateAction<Post[]>>
        isUserPostsFetched: boolean,
        setIsUserPostsFetched: React.Dispatch<React.SetStateAction<boolean>>
    } = props;

    const { token }: {
        token: string
    } = useSelector( (store: Store) => store.auth );

    const {
        state: {
            id 
        }
    }: {
        state: {
            id: string
        }
    } = useLocation();

    const [isError, setIsError] = useState<boolean>(false);

    const updateUserPostLikes: Function = (postId: string, newLikes: any): void => {
        setUserPosts( () => {
            return userPosts.map( (post: Post): Post => {
                if (post._id === postId)
                {
                    return {
                        ...post, 
                        likes: newLikes 
                    };
                }

                return post;
            });
        });
    };

    const fetchPosts: Function = async (url: string): Promise<void> => {
        try 
        {
            const response: AxiosResponse<ResponseDataUserPosts> = await axios.get(url, {
                headers: {
                    'authorization': token
                }
            });
            const data: ResponseDataUserPosts = await response.data;

            const { posts }: {
                posts: Array<Post>
            } = data;

            setUserPosts(posts);
            setIsUserPostsFetched(true);
        }

        catch (error: any)
        {
            console.log(error);

            if (error.response === undefined)
            {
                console.log('Server down, please try again');
            }
            
            else 
            {
                console.log('Server error, please try again');
            }

            setIsError(true);
        }
    };

    useEffect( () => {
        fetchPosts(`https://socialmedia-server-qq3r.onrender.com/post/user/${id}`);
    }, []);

    return (
        <div className="grid grid-cols-1 gap-y-8 w-[90%] max-w-[550px] mx-auto">
            {
                isError
                ?
                <div 
                    className="bg-white rounded-lg flex justify-center items-center py-6"
                    style={ {boxShadow: "0px 0px 8px 0px lightgrey"} }
                >
                    <div className="text-[18px] text-[#666666] px-2 text-center">
                        Error, please refresh the page
                    </div>
                </div>
                :
                !isUserPostsFetched
                ? 
                <div className="w-full mt-20 flex items-center justify-center">
                    <ImSpinner8 className="text-4xl text-[#A3A3A3] animate-spin"/>
                </div> 
                : 
                userPosts.length === 0 
                ? 
                <div
                    className="flex items-center justify-center bg-white py-6 rounded-lg"
                    style={ {boxShadow: "0px 0px 8px 0px lightgrey"} }
                > 
                    <div className="text-lg text-[#A3A3A3] font-semibold px-2 text-center">
                        This profile has 0 posts
                    </div>
                </div> 
                : 
                userPosts.map( (post: Post): JSX.Element => {
                    return (
                        <div key={post._id}>
                            <PostU 
                                post={post} 
                                updateUserPostLikes={updateUserPostLikes} 
                            />
                        </div>
                    );
                })
            }
        </div>
    );
};

export default UserPosts;