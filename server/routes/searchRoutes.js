const express = require('express');
const searchRouter = express.Router(); 

const {
    searchUser, 
    recommendFriends
} = require('../controllers/searchController');

const verifyToken = require('../middleware/authorize'); 

searchRouter.post('/', verifyToken, searchUser); 
searchRouter.post('/recommend', verifyToken, recommendFriends);

module.exports = searchRouter;