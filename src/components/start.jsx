import React from 'react';
import {catalogApi, acountsApi} from "../api";
import { connect } from "react-redux";

function select(state) {
  return { search: state.catalog.search, me: state.accounts.me };
}

export let Browse = connect(select)(React.createClass({ 
    componentDidMount() {
        const {dispatch} = this.props;
        const {ParentEntityId} = this.props.me.data;
        
        dispatch(catalogApi.actions.search({ ParentEntityId }));
    },
    render() {
        const productList = this.props.search.data.Items || [];
        
        return(
            <div className="c-home">
                <ul>
                {productList.map((product, index) => 
                    <li key={index}>{product.Name}</li>
                )}
                </ul>
            </div>
        );
    }
}));
