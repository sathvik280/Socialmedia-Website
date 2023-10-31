const userModel = require('../model/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const uploadImage = require('../uploads/uploadImage');

const register = async (req, res) => {
    try 
    {
        const {
            name, 
            email, 
            password, 
            location, 
            occupation,
            imageName,
            imageBase64
        } = req.body;

        const isAlreadyExists = !!(await userModel.findOne( {email} ));

        if (isAlreadyExists)
        {
            res.status(409).json( {message: 'Email already registered'} );
            return;
        }

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const response = await uploadImage(imageBase64, 'Users-test');
        const imageUrl = response.secure_url;

        await userModel.create({
            name, 
            email, 
            password: passwordHash,
            location, 
            occupation, 
            imageName, 
            imageUrl 
        });

        res.status(201).json( {message: 'User registered successfully'} );
    }

    catch (error)
    {
        res.status(500).json( {message: error.message} );
    }
};

const login = async (req, res) => {
    try 
    {
        const {
            email, 
            password
        } = req.body;

        const user = await userModel.findOne( {email} );

        if (!user)
        {
            res.status(404).json( {message: 'Email not registered'} );
            return;
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch)
        {
            res.status(401).json( {message: 'Wrong password'} );
            return;
        }

        const token = jwt.sign( {id: user._id}, process.env.JWT_SECRET);

        let formattedUser = {};
        for (let key in user)
        {
            if (key === 'password' || key === 'friends')
            {
                continue;
            }

            formattedUser[key] = user[key];
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

        res.status(200).json({
            token, 
            user: formattedUser, 
            friends: formattedFriends
        });
    }

    catch (error)
    {
        res.status(500).json( {message: error.message} );
    }
};

module.exports = { login, register };