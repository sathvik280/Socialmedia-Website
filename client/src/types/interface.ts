export interface User {
    _id: string, 
    name: string, 
    email: string, 
    location: string,
    occupation: string, 
    imageName: string, 
    imageUrl: string 
};

export interface InitialStateAuth {
    user: User,
    token: string
};

export interface InitialStateFriend {
    friends: Array<User>, 
    isFriendsFetched: boolean 
};

export interface ChatFriend {
    _id: string, 
    name: string, 
    imageName: string, 
    imageUrl: string 
};

export interface InitialStateWindow {
    isOpen: boolean, 
    selectedFriend: ChatFriend
};

export interface Post {
    _id: string, 
    userId: string, 
    userName: string, 
    userLocation: string, 
    userOccupation: string, 
    userImageName: string, 
    userImageUrl: string, 
    postImageName: string, 
    postImageUrl: string, 
    description: string, 
    likes: any
};

export interface InitialStateHome {
    feedPosts: Array<Post>, 
    isFeedPostsFetched: boolean 
};

export interface InitialStateProfile {
    profilePosts: Array<Post>, 
    isProfilePostsFetched: boolean 
};

export interface Chat {
    chatId: string, 
    flag: number,
    message: string 
};

export interface Chats {
    [id: string]: Array<Chat>
};

export interface InitialStateChat {
    chats: Chats, 
    chatFriends: Array<ChatFriend>,
    isChatsFetched: boolean 
};

export interface ResponseDataLogin {
    user: User, 
    token: string, 
    friends: Array<User>
};

export interface ResponseDataUser {
    user: User 
};

export interface InitialStateWindow {
    isOpen: boolean, 
    selectedFriend: ChatFriend
};

export interface AuthSlice extends InitialStateAuth {};
export interface ChatSlice extends InitialStateChat {};
export interface FriendSlice extends InitialStateFriend {};
export interface HomeSlice extends InitialStateHome {};
export interface ProfileSlice extends InitialStateProfile {};
export interface WindowSlice extends InitialStateWindow {};

export interface Store {
    auth: AuthSlice, 
    chat: ChatSlice, 
    friend: FriendSlice, 
    home: HomeSlice, 
    profile: ProfileSlice, 
    window: WindowSlice
};

export interface ChatProps {
    sendMessageToSocket: Function, 
    sendRemoveUserChatToSocket: Function 
};

export interface UserProps {
    sendAddFriendToSocket: Function,
    sendRemoveFriendToSocket: Function
};

export interface ProfileProps {
    sendRemoveFriendToSocket: Function
};

export interface ResponseDataPost {
    post: Post
};

export interface ResponseDataFeedPosts {
    posts: Array<Post>
};

export interface PostProps {
    post: Post
};

export interface ResponseDataSearch {
    searchResult: Array<User>
};

export interface ResponseDataRecommendedFriends {
    recommendedFriends: Array<User>
};

export interface FriendProps {
    friend: User
};

export interface ChatFriendProps {
    chatFriend: ChatFriend, 
    setPromptObj: React.Dispatch<React.SetStateAction<PromptObj>>
};

export interface PrivateRoutesProps {
    children: React.ReactElement
};

export interface ProfileFriendsProps extends ProfileProps {};
export interface ResponseDataProfilePosts extends ResponseDataFeedPosts {};
export interface ProfileFriendProps extends FriendProps, ProfileProps {};
export interface UserFriendProps extends FriendProps, UserProps {};

export interface UserCardProps extends UserProps {
    userPosts: Array<Post>, 
    userFriends: Array<User>, 
    setUserFriends: React.Dispatch<React.SetStateAction<User[]>>
    isUserFriendsFetched: boolean, 
    isUserPostsFetched: boolean
};

export interface userPostsProps {
    userPosts: Array<Post>,
    setUserPosts: React.Dispatch<React.SetStateAction<Post[]>>
    isUserPostsFetched: boolean,
    setIsUserPostsFetched: React.Dispatch<React.SetStateAction<boolean>>
};

export interface ResponseDataUserPosts extends ResponseDataFeedPosts {};

export interface UserPostProps {
    post: Post, 
    updateUserPostLikes: Function
};

export interface userFriendsProps extends UserProps {
    userFriends: Array<User>,
    setUserFriends: React.Dispatch<React.SetStateAction<User[]>>,
    isUserFriendsFetched: boolean,
    setIsUserFriendsFetched: React.Dispatch<React.SetStateAction<boolean>>
};

export interface ResponseDataUserFriends {
    friends: Array<User>
};

export interface ResponseDataChats {
    chats: Chats
};

export interface ResponseDataChatFriends {
    chatFriends: Array<ChatFriend>
};

export interface SendMessageProps {
    sendMessageToSocket: Function
};

export interface MessageObj {
    flag: boolean, 
    status: string, 
    message: string 
};

export interface CreatePostProps {
    setMessageObj: React.Dispatch<React.SetStateAction<MessageObj>>
};

export interface UploadStatusProps extends CreatePostProps {
    messageObj: MessageObj
};

export interface PromptObj {
    flag: boolean, 
    userId: string, 
    userName: string
};

export interface PromptDeleteChatProps {
    promptObj: PromptObj, 
    setPromptObj: React.Dispatch<React.SetStateAction<PromptObj>>,
    sendRemoveUserChatToSocket: Function
};