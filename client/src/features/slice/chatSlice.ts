import { createSlice } from '@reduxjs/toolkit';

import { InitialStateChat, Chats, ChatFriend } from '../../types/interface';

const initialState: InitialStateChat = {
    chats: {}, 
    chatFriends: [], 
    isChatsFetched: false 
};

const chatSlice = createSlice({
    name: 'chat', 
    initialState,

    reducers: {
        setIsChatsFetched: (state): void => {
            state.isChatsFetched = true;
        }, 

        removeIsChatsFetched: (state): void => {
            state.isChatsFetched = false; 
        },

        setChats: (state, action): void => {
            const chats: Chats = action.payload; 
            state.chats = chats; 
        }, 

        clearChats: (state): void => {
            state.chats = {};
        },

        setChatFriends: (state, action): void => {
            const chatFriends: Array<ChatFriend> = action.payload; 
            state.chatFriends = chatFriends;
        },

        clearChatFriends: (state): void => {
            state.chatFriends = [];
        },

        addChat: (state, action): void => {
            const { chatId, senderId, friendId, message }: {
                chatId: string, 
                senderId: string, 
                friendId: string, 
                message: string 
            } = action.payload;

            const chats: Chats = state.chats;
            const chatFriends: Array<ChatFriend> = state.chatFriends;
            const isChatsFetched: boolean = state.isChatsFetched;
            
            if (!isChatsFetched)
            {
                return;
            }

            const isChatFriend: boolean = !!chatFriends.find( (eachChatFriend: ChatFriend): boolean => {
                return eachChatFriend._id === friendId;
            });

            if (!isChatFriend)
            {
                return;
            }

            chats[friendId] = [
                {
                    chatId, 
                    flag: senderId === friendId ? 1 : 0, 
                    message
                }, 
                ...chats[friendId]
            ];

            state.chats = chats;
        }, 

        addChatFriend: (state, action): void => {
            const newChatFriend: ChatFriend = action.payload; 

            const allChatFriends: Array<ChatFriend> = state.chatFriends;
            const chats: Chats = state.chats;
            const isChatsFetched: boolean = state.isChatsFetched;

            if (!isChatsFetched)
            {
                return;
            }
            
            const isChatFriend: boolean = !!allChatFriends.find( (eachChatFriend: ChatFriend): boolean => {
                return eachChatFriend._id === newChatFriend._id;
            });

            if (isChatFriend)
            {
                return;
            }

            allChatFriends.push(newChatFriend);
            chats[newChatFriend._id] = [];

            state.chatFriends = allChatFriends;
            state.chats = chats;
        }, 

        removeChatFriend: (state, action): void => {
            const id: string = action.payload; 

            const prevChatFriends: Array<ChatFriend> = state.chatFriends;
            const prevChats: Chats = state.chats;
            const isChatsFetched: boolean = state.isChatsFetched;

            if (!isChatsFetched)
            {
                return;
            }

            const isChatFriend: boolean = !!prevChatFriends.find( (eachChatFriend: ChatFriend): boolean => {
                return eachChatFriend._id === id;
            });

            if (!isChatFriend)
            {
                return;
            }

            if (prevChats[id].length > 0)
            {
                return;
            }

            const newChats: Chats = {};
            let key: string;
            
            for (key in prevChats)
            {
                if (key === id)
                {
                    continue;
                }

                newChats[key] = prevChats[key];
            }

            const newChatFriends: Array<ChatFriend> = prevChatFriends.filter( (eachChatFriend: ChatFriend): boolean => {
                return eachChatFriend._id !== id;
            });

            state.chats = newChats;
            state.chatFriends = newChatFriends; 
        }, 

        removeUserChat: (state, action): void => {
            const id: string = action.payload;

            const chatFriends: Array<ChatFriend> = state.chatFriends;
            const chats: Chats = state.chats;
            const isChatsFetched: boolean = state.isChatsFetched;

            if (!isChatsFetched)
            {
                return;
            }

            const isChatFriend: boolean = !!chatFriends.find( (eachChatFriend: ChatFriend): boolean => {
                return eachChatFriend._id === id;
            });

            if (!isChatFriend)
            {
                return;
            }

            const newChatFriends: Array<ChatFriend> = chatFriends.filter( (eachChatFriend: ChatFriend): boolean => {
                return eachChatFriend._id !== id;
            });
            const newChats: Chats = {};

            for (let key in chats)
            {
                if (key === id)
                {
                    continue;
                }

                newChats[key] = chats[key];
            }

            state.chatFriends = newChatFriends;
            state.chats = newChats;
        }
    }
});

export const {
    setIsChatsFetched, 
    removeIsChatsFetched, 
    setChats, 
    clearChats, 
    setChatFriends, 
    clearChatFriends, 
    addChat, 
    addChatFriend, 
    removeChatFriend, 
    removeUserChat
} = chatSlice.actions;

export default chatSlice.reducer;