import React, { Component } from 'react';
import { render } from 'react-dom';
import {  Router, Route, hashHistory, IndexRedirect } from 'react-router';

// components
import { BrowseContainer } from './browse-catalog';
import { HubContainer } from './components/hub-container';

export class App extends Component {
    render() {
        return (
            <Router history={hashHistory}>
                <Route path="/" component={HubContainer}>
                    <IndexRedirect to="browse"/>
                    <Route path="browse" component={BrowseContainer}/>
                </Route>
            </Router>  
        );
    }
};
