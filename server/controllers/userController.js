const userModel = require('../model/userModel');

const getUser = async (req, res) => {
    try 
    {
        const { id } = req.params; 
        const user = await userModel.findById(id);

        if (!user)
        {
            res.status(404).json( {message: 'User not found'} );
            return;
        }

        let formattedUser = {};
        for (let key in user)
        {
            if (key === 'password' || key === 'friends')
            {
                continue;
            }

            formattedUser[key] = user[key];
        }

        res.status(200).json( {user: formattedUser} );
    }

    catch (error)
    {
        res.status(500).json( {message: error.message} );
    }
};

const getUsersFriends = async (req, res) => {
    try 
    {
        const { id } = req.params; 
        const user = await userModel.findById(id);

        if (!user)
        {
            res.status(404).json( {message: 'User not found'} );
            return;
        }

        const ids = [...user.friends];
        const friends = await userModel.find({ _id: {$in: ids} });

        const formattedFriends = friends.map( (friend) => {
            let formattedFriend = {};

            for (key in friend)
            {
                if (key === 'password' || key === 'friends')
                {
                    continue;
                }

                formattedFriend[key] = friend[key];
            }

            return formattedFriend;
        });

        res.status(200).json( {friends: formattedFriends} );
    }

    catch (error)
    {
        res.status(500).json( {message: error.message} );
    }
};

const getChatFriends = async (req, res) => {
    try 
    {
        const { ids } = req.body;
        const chatFriends = await userModel.find({ _id: {$in: ids} });

        const formattedChatFriend = chatFriends.map( (chatFriend) => {
            return {
                _id: chatFriend._id, 
                name: chatFriend.name, 
                imageName: chatFriend.imageName, 
                imageUrl: chatFriend.imageUrl
            };
        });

        res.status(200).json( {chatFriends: formattedChatFriend} );
    }

    catch (error)
    {
        res.status(500).json( {message: error.message} );
    }
}

const addFriend = async (req, res) => {
    try 
    {
        const {
            id, 
            friendId
        } = req.body; 

        const user = await userModel.findById(id);

        if (!user)
        {
            res.status(404).json( {message: 'User not found'} );
            return;
        }

        const isFriend = user.friends.find( (fid) => {
            return fid === friendId;
        });

        if (isFriend)
        {
            res.status(200).json( {message: 'User already friend'} );
            return;
        }

        const friend = await userModel.findById(friendId);

        if (!friend)
        {
            res.status(404).json( {message: 'Friend not found'} );
            return;
        }

        user.friends.push(friendId);
        friend.friends.push(id);

        await user.save(); 
        await friend.save();

        res.status(200).json( {message: 'Friend added successfully'} );
    }

    catch (error)
    {
        res.status(500).json( {message: error.message} );
    }
};

const removeFriend = async (req, res) => {
    try 
    {
        const {
            id, 
            friendId
        } = req.body; 

        const user = await userModel.findById(id);

        if (!user)
        {
            res.status(404).json( {message: 'User not found'} );
            return;
        }

        const isFriend = user.friends.find( (fid) => {
            return fid === friendId;
        });

        if (!isFriend)
        {
            res.status(200).json( {message: 'User not friend'} );
            return;
        }

        const friend = await userModel.findById(friendId);

        if (!friend)
        {
            res.status(404).json( {message: 'Friend not found'} );
            return;
        }

        user.friends = user.friends.filter( (fid) => {
            return fid !== friendId;
        });
        friend.friends = friend.friends.filter( (fid) => {
            return fid !== id;
        });

        await user.save(); 
        await friend.save();

        res.status(200).json( {message: 'Friend removed successfully'} );
    }

    catch (error)
    {
        res.status(500).json( {message: error.message} );
    }
};

module.exports = { 
    getUser, 
    getUsersFriends, 
    getChatFriends,
    addFriend, 
    removeFriend 
};