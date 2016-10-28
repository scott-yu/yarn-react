import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { Provider, connect } from "react-redux";
import api from './api';

import { App } from './app';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const reducer = combineReducers(api.reducers);
const store = createStoreWithMiddleware(reducer);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app'));
