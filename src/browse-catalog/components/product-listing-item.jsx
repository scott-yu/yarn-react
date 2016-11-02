import React from 'react';
import {ListItem} from 'material-ui/List';
import {Link} from 'react-router';

export let ProductListingItem = React.createClass({
    getDefaultProps() {
        return {
            data: {}
        };
    },
    render() {
        const {Name, Slug, CatalogItemId} = this.props.data;
        return (
            <ListItem>
                <Link to={`product/${CatalogItemId}/${Slug}`}>{Name}</Link>
            </ListItem>
        );
    }
});
