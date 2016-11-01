import React from 'react';
import {acountsApi} from "../api";
import {connect} from "react-redux";
import {HubLayout} from './hub-layout';
const select = state => ({ me: state.accounts.me });

export let HubContainer = connect(select)(React.createClass({
    componentDidMount() {
        const {dispatch} = this.props;
        dispatch(acountsApi.actions.me());
    },
    isAppReadyToRun() {
        return this.props.me.data.ParentEntityId;
    },
    render() {
        if (!this.isAppReadyToRun()) return (<div>App is loading</div>);

        return (
            <HubLayout>
                { this.props.children }
            </HubLayout>
        );
    }
}));