import React from 'react';
import {ListItem} from 'material-ui/List';

export let ProductListingItem = React.createClass({
    getDefaultProps() {
        return {
            data: {}
        };
    },
    render() {
        const {Name, Slug} = this.props.data;
        return (
            <ListItem>{Name}</ListItem>
        );
    }
});
