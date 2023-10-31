import React from 'react';
import ReactDOM from 'react-dom/client';

import './style.css';
import App from './App';

import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

import store from './store/store';
import { Provider } from 'react-redux';

const persistor = persistStore(store);

const rootElement = document.getElementById('root');

if (rootElement)
{
    const root = ReactDOM.createRoot(rootElement);
    root.render(
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <App />
            </PersistGate>
        </Provider>
    );
}