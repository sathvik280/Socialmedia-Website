import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios, { AxiosResponse } from 'axios';

import { ImSpinner8 } from 'react-icons/im';

import { setChats, setChatFriends, setIsChatsFetched } from '../features/slice/chatSlice';

import FriendCsm from '../components/FriendCsm';
import FriendClg from '../components/FriendClg';
import WindowHead from '../components/WindowHead';
import WindowBody from '../components/WindowBody';
import SendMessage from '../components/SendMessage';
import PromptDeleteChat from '../components/PromptDeleteChat';

import { Store, User, ChatFriend, Chats, ResponseDataChats, ResponseDataChatFriends, ChatProps, PromptObj } from '../types/interface';

const Chat: React.FC<ChatProps> = (props): JSX.Element => {
    const { sendMessageToSocket, sendRemoveUserChatToSocket }: {
        sendMessageToSocket: Function, 
        sendRemoveUserChatToSocket: Function
    } = props;

    const [promptObj, setPromptObj] = useState<PromptObj>({
        flag: false, 
        userId: '', 
        userName: ''
    });
    
    const [isError, setIsError] = useState<boolean>(false);

    const dispatch = useDispatch();

    const { user, token}: {
        user: User, 
        token: string
    } = useSelector( (store: Store) => store.auth);

    const { friends }: {
        friends: Array<User>
    } = useSelector( (store: Store) => store.friend);

    const { chatFriends, isChatsFetched }: {
        chatFriends: Array<ChatFriend>, 
        isChatsFetched: boolean 
    } = useSelector( (store: Store) => store.chat);

    const { isOpen, selectedFriend }: {
        isOpen: boolean, 
        selectedFriend: ChatFriend 
    } = useSelector( (store: Store) => store.window);

    const fetchChats: Function = async (url1: string, url2: string): Promise<void> => {
        try 
        {
            const response1: AxiosResponse<ResponseDataChats> = await axios.post(url1,
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

            const data1: ResponseDataChats = await response1.data;

            const { chats: userChats }: {
                chats: Chats 
            } = data1;

            dispatch(setChats(userChats));

            let chatFriendsId: Array<string> = [];
            let key: string;

            friends.forEach( (friend: User): void => {
                chatFriendsId.push(friend._id);
            });

            for (key in userChats)
            {
                if (!chatFriendsId.includes(key))
                {
                    chatFriendsId.push(key);
                }
            }

            const response2: AxiosResponse<ResponseDataChatFriends> = await axios.post(url2,
                {
                    ids: chatFriendsId
                }, 
                {
                    headers: {
                        'authorization': token
                    } 
                }
            );

            const data2: ResponseDataChatFriends = await response2.data;

            const { chatFriends: userChatFriends }: {
                chatFriends: Array<ChatFriend>
            } = data2;

            dispatch(setChatFriends(userChatFriends));
            dispatch(setIsChatsFetched());
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
        if (!isChatsFetched)
        {
            fetchChats(
                'https://socialmedia-server-qq3r.onrender.com/chat', 
                'https://socialmedia-server-qq3r.onrender.com/user/friends/chat'
            );
        }
    });

    return (
        <div>
            <div className={`fixed h-screen bg-black/90 top-0 w-full z-50 items-center justify-center ${promptObj.flag ? "flex" : "hidden"}`}>
                <PromptDeleteChat 
                    promptObj={promptObj}
                    setPromptObj={setPromptObj}
                    sendRemoveUserChatToSocket={sendRemoveUserChatToSocket}
                />
            </div>

            <div className={`w-full min-h-screen bg-[#F6F6F6] relative pb-12 pt-32 xl:hidden ${isOpen ? "hidden": "flex"}`}>
                <div
                    className="w-[90%] mx-auto bg-white rounded-lg min-h-[75vh] relative flex flex-col gap-y-6 px-5 py-8"
                    style={ {boxShadow: "0px 0px 8px 0px lightgrey"} }
                >
                    <div className="text-xl font-medium text-center text-[#666666]">
                        {
                            isError
                            ?
                            "Error, please refresh the page"
                            :
                            isChatsFetched 
                            ?
                            "Select friend to chat"
                            :
                            "Fetching chats, please wait..."
                        }
                    </div>

                    <div className="flex-1 flex flex-col gap-y-4">
                        {
                            !isError
                            &&
                            (
                                !isChatsFetched
                                ?
                                <div className="flex items-center justify-center my-auto">
                                    <ImSpinner8 className="animate-spin text-[30px] text-[#858585]"/>
                                </div>
                                :
                                chatFriends.length === 0
                                ?
                                <div className="flex items-center justify-center text-xl sm:text-[22px] text-center my-auto text-[#666666]">
                                    No Friends to show
                                </div>
                                :
                                chatFriends.map( (chatFriend: ChatFriend): JSX.Element => {
                                    return (
                                        <div key={chatFriend._id}>
                                            <FriendCsm 
                                                chatFriend={chatFriend} 
                                                setPromptObj={setPromptObj}
                                            />
                                        </div>
                                    );
                                })
                            )
                        }
                    </div>
                </div>
            </div>

            <div className={`w-full h-screen relative z-30 xl:hidden ${isOpen ? "flex" : "hidden"} flex-col justify-between`}>
                <div className="z-40 flex-none">
                    <WindowHead />
                </div>

                <div className="flex-grow overflow-y-auto">
                    <WindowBody />
                </div>

                <div className="flex-none">
                    <SendMessage sendMessageToSocket={sendMessageToSocket} />
                </div>
            </div>

            <div className="hidden xl:flex w-full h-screen max-w-[1024px] mx-auto px-4 pt-32 pb-8">
                <div 
                    className="flex w-full rounded-md"
                    style={ {boxShadow: "0px 0px 8px 0px lightgrey"} }
                >
                    {
                        !isChatsFetched 
                        ?
                        <div className="text-center w-full my-auto text-2xl text-[#666666]">
                            Loading chats, please wait...
                        </div>
                        :
                        isError 
                        ?
                        <div className="text-center w-full my-auto text-2xl text-[#666666]">
                            Error, please refresh the page
                        </div>
                        :
                        <div className="flex flex-row w-full">
                            <div className="w-[35%] flex flex-col gap-y-6 px-5 py-7 overflow-y-auto">
                                <div className="text-xl font-medium text-center text-[#666666]">
                                    Your Chats
                                </div>

                                <div className="flex-1 flex flex-col gap-y-4">
                                    {
                                        chatFriends.length === 0
                                        ?
                                        <div className="flex items-center justify-center text-xl sm:text-[22px] text-center my-auto text-[#666666]">
                                            No Friends to show
                                        </div>
                                        :
                                        chatFriends.map( (chatFriend: ChatFriend): JSX.Element => {
                                            return (
                                                <div key={chatFriend._id}>
                                                    <FriendClg 
                                                        chatFriend={chatFriend} 
                                                        setPromptObj={setPromptObj}
                                                    />
                                                </div>
                                            );
                                        })
                                    }
                                </div>
                            </div>

                            <div className="w-[65%] flex bg-[#ecf4fe]">
                                {
                                    selectedFriend._id === ''
                                    ?
                                    <div className="text-center w-full my-auto text-2xl text-[#666666]">
                                        Select friend to chat
                                    </div> 
                                    :
                                    <div className="w-full flex flex-col justify-between">
                                        <div className="flex-grow overflow-y-auto">
                                            <WindowBody />
                                        </div>

                                        <div className="flex-none">
                                            <SendMessage sendMessageToSocket={sendMessageToSocket} />
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default Chat;