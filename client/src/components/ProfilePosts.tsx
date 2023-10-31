import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios, { AxiosResponse } from 'axios';

import { User, Store, Post, ResponseDataProfilePosts } from '../types/interface';

import PostP from './PostP';

import { ImSpinner8 } from 'react-icons/im';

import { setProfilePosts, setIsProfilePostsFetched } from '../features/slice/profileSlice';

const ProfilePosts: React.FC = (): JSX.Element => {
    const dispatch = useDispatch();

    const { user, token }: {
        user: User, 
        token: string
    } = useSelector( (store: Store) => store.auth);

    const { profilePosts, isProfilePostsFetched }: {
        profilePosts: Array<Post>, 
        isProfilePostsFetched: boolean
    } = useSelector( (store: Store) => store.profile);

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);

    const fetchPosts: Function = async (url: string): Promise<void> => {
        try 
        {
            const response: AxiosResponse<ResponseDataProfilePosts> = await axios.get(url, {
                headers: {
                    'authorization': token
                }
            });
            const data: ResponseDataProfilePosts = await response.data;

            const { posts }: {
                posts: Array<Post>
            } = data;

            dispatch(setProfilePosts(posts));
            dispatch(setIsProfilePostsFetched());

            setIsLoading(false);
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
            setIsLoading(false);
        }
    };

    useEffect( () => {
        if (!isProfilePostsFetched)
        {
            setIsLoading(true);
            fetchPosts(`https://socialmedia-server-qq3r.onrender.com/post/user/${user._id}`);
        }
    }, []);

    return (
        <div className="grid grid-cols-1 gap-y-8 w-[90%] max-w-[550px] mx-auto">
            {
                isLoading 
                ? 
                <div className="w-full lg:mt-20 flex items-center justify-center">
                    <ImSpinner8 className="text-4xl text-[#A3A3A3] animate-spin"/>
                </div> 
                :
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
                profilePosts.length === 0 
                ?
                <div
                    className="flex items-center justify-center bg-white py-6 rounded-lg"
                    style={ {boxShadow: "0px 0px 8px 0px lightgrey"} }
                >
                    <div className="text-lg text-[#A3A3A3] font-semibold px-2 text-center">
                        Your profile has 0 posts
                    </div>
                </div> 
                :
                profilePosts.map( (post: Post): JSX.Element => {
                    return (
                        <div key={post._id}>
                            <PostP post={post} />
                        </div>
                    );
                })
            }
        </div>
    );
};

export default ProfilePosts;