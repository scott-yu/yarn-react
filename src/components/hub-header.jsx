import React from 'react';
import { connect } from "react-redux";

const select = state => ({ me: state.accounts.me });

export let HubHeader = connect(select)(React.createClass({
    render() {
        return (
            <div>{this.props.me.data.UserName}</div>
        );
    }
}));