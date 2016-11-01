import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware, combineReducers} from "redux";
import thunk from "redux-thunk";
import {Provider } from "react-redux";
import {catalogApi, acountsApi} from './api';
import {authenicate} from './utils/auth-helpers';
import {App} from './app';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const reducer = combineReducers({
    catalog: combineReducers(catalogApi.reducers),
    accounts: combineReducers(acountsApi.reducers)
});
const store = createStoreWithMiddleware(reducer);

authenicate().then(() => {
    ReactDOM.render(
        <Provider store={store}>
            <MuiThemeProvider>
                <App />
            </MuiThemeProvider>
        </Provider>,
        document.getElementById('app')
    );
});
