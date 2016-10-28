import React from 'react';
import api from "../api";
import { Provider, connect } from "react-redux";

function select(state) {
  return { search: state.search };
}

export let Start = connect(select)(React.createClass({ 
    componentDidMount() {
        const {dispatch} = this.props;
        dispatch(api.actions.search());
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
