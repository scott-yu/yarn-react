import React from 'react';
import { connect } from "react-redux";
import {Toolbar, ToolbarTitle, ToolbarGroup} from 'material-ui/Toolbar';
import Avatar from 'material-ui/Avatar';

const select = state => ({ me: state.accounts.me });

export let HubHeader = connect(select)(React.createClass({
    render() {
        return (
            <Toolbar>
                <ToolbarGroup>
                    <ToolbarTitle text="iQmetrix" />
                </ToolbarGroup>
                <ToolbarGroup>
                    <Avatar src={this.props.me.data.Picture.Href} />
                    <ToolbarTitle text={this.props.me.data.UserName} />
                </ToolbarGroup>
            </Toolbar>
        );
    }
}));