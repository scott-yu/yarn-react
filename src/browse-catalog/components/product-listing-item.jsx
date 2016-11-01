import React from 'react';

export let ProductListingItem = React.createClass({
    getDefaultProps() {
        return {
            data: {}
        };
    },
    render() {
        const {Name, Slug} = this.props.data;
        return <li>{Slug} {Name}</li>;
    }
});
