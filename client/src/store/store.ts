import { configureStore } from '@reduxjs/toolkit';
import storageSession from 'redux-persist/lib/storage/session';
import { persistReducer, WebStorage } from 'redux-persist';
import { combineReducers } from 'redux';
import thunk from 'redux-thunk';

import authReducer from '../features/slice/authSlice';
import homeReducer from '../features/slice/homeSlice';
import chatReducer from '../features/slice/chatSlice';
import profileReducer from '../features/slice/profileSlice';
import friendReducer from '../features/slice/friendSlice';
import windowReducer from '../features/slice/windowSlice';

interface PersistConfig {
    key: string, 
    storage: WebStorage
};

const persistConfig: PersistConfig = {
    key: 'root',
    storage: storageSession
};

const reducers = combineReducers({
    auth: authReducer, 
    home: homeReducer, 
    chat: chatReducer,
    profile: profileReducer, 
    friend: friendReducer, 
    window: windowReducer
});

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk]
});

export default store;