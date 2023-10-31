const postModel = require('../model/postModel');
const userModel = require('../model/userModel');
const uploadImage = require('../uploads/uploadImage');

const getAllPosts = async (req, res) => {
    try 
    {
        const allPosts = await postModel.find( {} ).sort({ createdAt: -1 }).limit(50);
        res.status(200).json( {posts: allPosts} );
    }

    catch (error)
    {
        res.status(500).json( {message: error.message} );
    }
};

const getUserPosts = async (req, res) => {
    try 
    {
        const { id } = req.params;

        const userPosts = await postModel.find( {userId: id} ).sort({ createdAt: -1 });
        res.status(200).json( {posts: userPosts} );
    }

    catch (error)
    {
        res.status(500).json( {message: error.message} );
    }
};

const createPost = async (req, res) => {
    try 
    {
        const {
            userId,
            imageName,
            description,
            imageBase64
        } = req.body;

        const user = await userModel.findById(userId);

        const response = await uploadImage(imageBase64, 'Posts-test');
        const imageUrl = response.secure_url;

        const newPost = await postModel.create({
            userId, 
            userName: user.name, 
            userLocation: user.location, 
            userOccupation: user.occupation, 
            userImageName: user.imageName, 
            userImageUrl: user.imageUrl,
            postImageName: imageName, 
            postImageUrl: imageUrl, 
            description
        });

        res.status(201).json( {post: newPost} );
    }

    catch (error)
    {
        res.status(500).json( {message: error.message} );
    }
};

const likePost = async (req, res) => {
    try 
    {
        const { id, userId } = req.body;
        const post = await postModel.findById(id);

        if (!post.likes.get(userId))
        {
            post.likes.set(userId, true);
        }

        await post.save();
        res.status(200).json( {message: 'Like added'} );
    }

    catch (error)
    {
        res.status(500).json( {message: error.message} );
    }
};

const unlikePost = async (req, res) => {
    try 
    {
        const { id, userId } = req.body;
        const post = await postModel.findById(id);

        if (post.likes.get(userId))
        {
            post.likes.delete(userId);
        }

        await post.save();
        res.status(200).json( {message: 'Like removed'} );
    }

    catch (error)
    {
        res.status(500).json( {message: error.message} );
    }
};

module.exports = {
    getAllPosts, 
    getUserPosts, 
    createPost, 
    likePost, 
    unlikePost
};