import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios, { AxiosResponse } from 'axios';

import FriendR from './FriendR';

import { User, Store, ResponseDataRecommendedFriends } from '../types/interface';

const RecommendedFriends: React.FC = (): JSX.Element => {
    const [recommendedFriends, setRecommendedFriends] = useState<Array<User>>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);

    const { user, token }: {
        user: User, 
        token: string
    } = useSelector( (store: Store) => store.auth);

    const { friends }: {
        friends: Array<User>
    } = useSelector( (store: Store) => store.friend);

    const fetchRecommendedFriends: Function = async (url: string): Promise<void> => {
        try 
        {
            const response: AxiosResponse<ResponseDataRecommendedFriends> = await axios.post(url,
                {
                    id: user._id,
                    friendIds: friends.map( (friend: User): string => {
                        return friend._id;
                    })
                },
                {
                    headers: {
                        'authorization': token
                    }
                }
            );
            const data: ResponseDataRecommendedFriends = await response.data;

            const { recommendedFriends }: {
                recommendedFriends: Array<User>
            } = data;

            setRecommendedFriends(recommendedFriends);
            setIsLoading(false);
        }

        catch (error: any)
        {
            // testing 
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
        setIsLoading(true);
        fetchRecommendedFriends('https://socialmedia-server-qq3r.onrender.com/search/recommend');
    }, []);

    return (
        <div
            className="flex flex-col px-4 pt-5 pb-4 gap-y-2 w-full bg-white rounded-lg"
            style={ {boxShadow: "0px 0px 8px 0px lightgrey"} }
        >
            <div className="text-[#666666] text-lg">
                Recommended friends
            </div>

            <div className="flex flex-col w-full">
                {
                    isLoading 
                    ? 
                    <div className="text-[#666666] text-lg text-center py-4">
                        Loading...  
                    </div> 
                    :
                    isError
                    ?
                    <div className="text-[18px] text-[#666666] px-2 text-center py-1">
                        Error, please refresh the page
                    </div>
                    :
                    recommendedFriends.map( (friend: User): JSX.Element => {
                        return (
                            <div key={friend._id}>
                                <FriendR friend={friend} />
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
};

export default RecommendedFriends;