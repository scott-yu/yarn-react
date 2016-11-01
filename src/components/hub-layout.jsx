import React from 'react';
import {HubHeader} from './hub-header';

export let HubLayout = React.createClass({
    render() {
        return (
            <div>
                <HubHeader />
                { this.props.children }
            </div>
        );
    }
});