import React from 'react';
import {Header} from './header';
import {acountsApi} from "../api";
import { connect } from "react-redux";
import {Browse} from './start';

const select = state => ({ me: state.accounts.me });

export let HubLayout = connect(select)(React.createClass({
    componentDidMount() {
        const {dispatch} = this.props;
        dispatch(acountsApi.actions.me());
    },
    isAppReadyToRun() {
        return this.props.me.data.ParentEntityId;
    },
    render() {
        if (!this.isAppReadyToRun()) return null;

        return (
            <div>
                <Header />
                { this.props.children }
            </div>
        );
    }
}));