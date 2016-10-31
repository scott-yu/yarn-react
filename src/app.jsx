import React, { Component } from 'react';
import { render } from 'react-dom';
import {  Router, Route, hashHistory, IndexRedirect } from 'react-router';

// components
import { Links } from './components/links';
import { Start } from './components/start';
import { Guide } from './components/guide';
import { How } from './components/how';

export class App extends Component {
    render() {
        return (
            <Router history={hashHistory}>
                <Route path="/" component={Links}>
                    <IndexRedirect to="start"/>
                    <Route path="start" component={Start}/>
                    <Route path="how" component={How}/>
                    <Route path="guide" component={Guide}/>
                </Route>
            </Router>  
        );
    }
}
