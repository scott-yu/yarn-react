import React from 'react';
import {catalogApi} from "../../api";
import {connect} from "react-redux";
import {ProductListing} from './product-listing';
import {ClassificationTree} from './classification-tree';
import {GridList, GridTile} from 'material-ui/GridList';

function select(state) {
    return { search: state.catalog.search, trees: state.catalog.getClassificationTree };
}

export let BrowseContainer = connect(select)(React.createClass({ 
    componentDidMount() {
        const {dispatch} = this.props;
        dispatch(catalogApi.actions.search.get());
        dispatch(catalogApi.actions.getClassificationTree.get());
    },
    componentDidUpdate (prevProps) {
        const {dispatch} = this.props;
        const oldIndustryId = prevProps.params.industryId;
        const oldClassificationId = prevProps.params.classificationId;
        const {industryId, classificationId} = this.props.params;
        if (oldIndustryId !== industryId || oldClassificationId !== classificationId) {
            let args = { ClassificationTreeId: industryId };
            if (classificationId) {
                args.CategoryOrClassificationId = classificationId;
            }
            dispatch(catalogApi.actions.search.get(args));
        }
    },
    handleNodeClicked(node) {
        debugger;
    },
    render() {
        const productList = this.props.search.data.Items;
        const trees = this.props.trees.data.Trees;
        
        return(
            <div style={{display: 'flex', 'justifyContent': 'center'}}>
                <div style={{width: '300px'}}>
                    <ClassificationTree nodes={trees} onNodeClicked={this.handleNodeClicked}/>
                </div>
                <div>
                    <ProductListing products={productList} />
                </div>
            </div>
        );
    }
}));
