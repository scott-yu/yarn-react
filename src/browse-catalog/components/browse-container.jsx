import React from 'react';
import {catalogApi} from "../../api";
import {connect} from "react-redux";
import {ProductListing} from './product-listing';
import {ClassificationTree} from './classification-tree';
import {GridList, GridTile} from 'material-ui/GridList';

function select(state) {
  return { search: state.catalog.search, me: state.accounts.me, trees: state.catalog.getClassificationTree };
}

export let BrowseContainer = connect(select)(React.createClass({ 
    componentDidMount() {
        const {dispatch} = this.props;
        const {ParentEntityId} = this.props.me.data;
        
        dispatch(catalogApi.actions.search({ ParentEntityId }));
        dispatch(catalogApi.actions.getClassificationTree({ ParentEntityId }));
    },
    render() {
        const productList = this.props.search.data.Items;
        const trees = this.props.trees.data.Trees;
        
        return(
            <div style={{display: 'flex', 'justifyContent': 'center'}}>
                <div style={{width: '300px'}}>
                    <ClassificationTree nodes={trees} />
                </div>
                <div>
                    <ProductListing products={productList} />
                </div>
            </div>
        );
    }
}));
