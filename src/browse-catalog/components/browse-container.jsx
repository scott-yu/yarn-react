import React from 'react';
import {catalogApi} from "../../api";
import {connect} from "react-redux";
import {ProductListing} from './product-listing';
import {ClassificationTree} from './classification-tree';
import {GridList, GridTile} from 'material-ui/GridList';
import CircularProgress from 'material-ui/CircularProgress';

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
    render() {
        const productList = this.props.search.data.Items;
        const trees = this.props.trees.data.Trees;
        return(
            <div style={{display: 'flex'}}>
                <div style={{width: '400px'}}>
                    <ClassificationTree nodes={trees}/>
                </div>
                <div style={{flexGrow: '1'}}>
                    {this.props.search.loading
                        ? <CircularProgress size={60} thickness={7} />
                        : <ProductListing products={productList} />
                    }
                </div>
            </div>
        );
    }
}));
