import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import api from './api';
import { TokenManager } from './utils/token-manager';
import { App } from './app';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const reducer = combineReducers(api.reducers);
const store = createStoreWithMiddleware(reducer);

const tokenManager = new TokenManager();
tokenManager.authenicate().then(() => {
    ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>,
        document.getElementById('app')
    );
});
