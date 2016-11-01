import React from 'react';
import {catalogApi} from "../../api";
import {connect} from "react-redux";
import {ProductListing} from './product-listing';

function select(state) {
  return { search: state.catalog.search, me: state.accounts.me };
}

export let BrowseContainer = connect(select)(React.createClass({ 
    componentDidMount() {
        const {dispatch} = this.props;
        const {ParentEntityId} = this.props.me.data;
        
        dispatch(catalogApi.actions.search({ ParentEntityId }));
    },
    render() {
        const productList = this.props.search.data.Items;
        
        return(
            <div>
                <ProductListing products={productList} />
            </div>
        );
    }
}));
