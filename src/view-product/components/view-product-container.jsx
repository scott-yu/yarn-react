import React from 'react';
import {connect} from "react-redux";
import CircularProgress from 'material-ui/CircularProgress';
import {productLibraryApi} from "../../api";

function select(state) {
    return { product: state.productLibrary.product };
}

export let ViewProductContainer = connect(select)(React.createClass({ 
    componentWillMount() {
        const {dispatch} = this.props;
        const {catalogItemId, slug} = this.props.params;
        dispatch(productLibraryApi.actions.product.get(slug));
    },
    componentWillUpdate (prevProps) {
        const {dispatch} = this.props;
        const oldCatalogItemId = prevProps.params.catalogItemId;
        const oldSlug = prevProps.params.slug;
        const {catalogItemId, slug} = this.props.params;
        if (oldCatalogItemId !== catalogItemId || oldSlug !== slug) {
            dispatch(productLibraryApi.actions.product.get(slug));
        }
    },
    render() {
        const {name} = this.props.product.data.summary || {};
        return(
            <div style={{display: 'flex'}}>
                <div style={{width: '400px'}}>
                </div>
                <div style={{flexGrow: '1'}}>
                    {this.props.product.loading
                        ? <CircularProgress size={60} thickness={7} />
                        : <h2>{name}</h2>
                    }
                </div>
            </div>
        );
    }
}));
