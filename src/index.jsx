import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { catalogApi, acountsApi } from './api';
import { authenicate } from './utils/auth-helpers';
import {App} from './app';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const reducer = combineReducers({
    catalog: combineReducers(catalogApi.reducers),
    accounts: combineReducers(acountsApi.reducers)
});
const store = createStoreWithMiddleware(reducer);

authenicate().then(() => {
    ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>,
        document.getElementById('app')
    );
});
