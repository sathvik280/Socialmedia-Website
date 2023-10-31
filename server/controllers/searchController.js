const userModel = require('../model/userModel'); 

const searchUser = async (req, res) => {
    try 
    {
        const { searchInput } = req.body;
        const searchResult = await userModel.find({ 
            name: { $regex: searchInput, $options: 'i' } 
        });

        res.status(200).json( {searchResult} );
    }

    catch (error)
    {
        res.status(500).json( {message: error.message} );
    }
};

const recommendFriends = async (req, res) => {
    try 
    {
        const {
            id, 
            friendIds
        } = req.body;

        const recommendedFriends = await userModel.find({
            $and: [ 
                { _id: {$nin: [...friendIds, id]} }, 
                { name: { $ne: 'Demo' } } 
            ]
        }).limit(5);

        res.status(200).json( {recommendedFriends} );
    }

    catch (error)
    {
        res.status(500).json( {message: error.message} );
    }
};

module.exports = { searchUser, recommendFriends };