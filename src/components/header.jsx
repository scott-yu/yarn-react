import React from 'react';
import { connect } from "react-redux";

const select = state => ({ me: state.accounts.me });

export let Header = connect(select)(React.createClass({
    render() {
        return (
            <div>{this.props.me.data.UserName}</div>
        );
    }
}));