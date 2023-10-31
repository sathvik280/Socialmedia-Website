import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';

import FriendU from './FriendU';

import { addFriend } from '../features/slice/friendSlice';

import { userFriendsProps, User, Store, ResponseDataUserFriends } from '../types/interface';

const UserFriends: React.FC<userFriendsProps> = (props): JSX.Element => {
    const { 
        userFriends, 
        setUserFriends, 
        isUserFriendsFetched, 
        setIsUserFriendsFetched, 
        sendAddFriendToSocket, 
        sendRemoveFriendToSocket
    }: {
        userFriends: Array<User>,
        setUserFriends: React.Dispatch<React.SetStateAction<User[]>>,
        isUserFriendsFetched: boolean,
        setIsUserFriendsFetched: React.Dispatch<React.SetStateAction<boolean>>
        sendAddFriendToSocket: Function, 
        sendRemoveFriendToSocket: Function
    } = props;

    const { user, token }: {
        user: User, 
        token: string
    } = useSelector( (store: Store) => store.auth );

    const { friends }: {
        friends: Array<User>
    } = useSelector( (store: Store) => store.friend);

    const { 
        state: {
            id,
            name, 
            imageName,
            imageUrl, 
            location, 
            occupation
        } 
    }: {
        state: {
            id: string, 
            name: string, 
            imageName: string,
            imageUrl: string, 
            location: string, 
            occupation: string 
        }
    } = useLocation();

    const dispatch = useDispatch();

    const [isError, setIsError] = useState<boolean>(false);

    const fetchUserFriends: Function = async (url: string): Promise<void> => {
        try 
        {
            const response: AxiosResponse<ResponseDataUserFriends> = await axios.get(url, {
                headers: {
                    'authorization': token
                }
            });
            const data: ResponseDataUserFriends = await response.data;

            const { friends: userFriends }: {
                friends: Array<User>
            } = data;

            setUserFriends(userFriends);
            setIsUserFriendsFetched(true);

            const isOurProfileInUserFriends: boolean = !!userFriends.find( (friend: User): boolean => {
                return friend._id === user._id;
            });

            const isFriendProfileInOurFriends: boolean = !!friends.find( (friend: User): boolean => {
                return friend._id === id;
            });

            if (isOurProfileInUserFriends && !isFriendProfileInOurFriends)
            {
                dispatch(addFriend({
                    _id: id,
                    name, 
                    email: '', 
                    imageName, 
                    imageUrl, 
                    location, 
                    occupation
                }));
            }
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
        fetchUserFriends(`https://socialmedia-server-qq3r.onrender.com/user/${id}/friends`);
    }, []);

    return (
        <div 
            className="flex flex-col px-4 w-[90%] max-w-[550px] mx-auto rounded-lg bg-white py-4"
            style={ {boxShadow: "0px 0px 8px 0px lightgrey"} }
        >
            <div className="text-[#858585] font-semibold text-[20px]">
                Friends 
            </div>

            <div className="flex flex-col gap-y-4 pt-5">
                {
                    isError
                    ?
                    <div className="text-[18px] text-[#666666] px-2 text-center pb-1">
                        Error, please refresh the page
                    </div>
                    :
                    isUserFriendsFetched
                    ?
                    userFriends.map( (friend) => {
                        return (
                            <div key={friend._id}>
                                <FriendU 
                                    friend={friend} 
                                    sendAddFriendToSocket={sendAddFriendToSocket}
                                    sendRemoveFriendToSocket={sendRemoveFriendToSocket}
                                />
                            </div>
                        );
                    })
                    :
                    <div className="text-[#666666] text-lg text-center pt-2 pb-3">
                        Loading...  
                    </div>
                }
            </div>
        </div>
    );
};

export default UserFriends;