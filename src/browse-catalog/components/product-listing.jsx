import React from 'react';
import {ProductListingItem} from './product-listing-item';
import {List} from 'material-ui/List';

export let ProductListing = React.createClass({
    getDefaultProps() {
        return {
            products: []
        };
    },
    render() {
        const productList = this.props.products;

        return(
            <List>
            {productList.map((product, index) => 
                <ProductListingItem key={index} data={product} />
            )}
            </List>
        );
    }
});
