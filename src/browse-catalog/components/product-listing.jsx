import React from 'react';
import {ProductListingItem} from './product-listing-item';

export let ProductListing = React.createClass({
    getDefaultProps() {
        return {
            products: []
        };
    },
    render() {
        const productList = this.props.products;

        return(
            <ul>
            {productList.map((product, index) => 
                <ProductListingItem key={index} data={product} />
            )}
            </ul>
        );
    }
});
