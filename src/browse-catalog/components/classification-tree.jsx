import React from 'react';
import {Link} from 'react-router';
import './classification-tree.css';
import {List, ListItem} from 'material-ui/List';

const getClassificationLink = (node, level, treeId) => {
    const industryId = treeId || node.Id;
    let url = `browse/industry/${industryId}`;
    if (level) {
        url += `/classification/${node.Id}`;
    }
    return url;
};

export let ClassificationTree = React.createClass({
    getDefaultProps() {
        return {
            nodes: []
        };
    },
    render() {
        const nodes = this.props.nodes;
        if (!nodes.length) return null;

        const createNode = (index, node, level) => {
            const {Categories = [], Classifications = []} = node;
            const children = [...Categories, ...Classifications];
            return (<ListItem
                key={index}
                initiallyOpen={level < 1}
                primaryText={<Link to={getClassificationLink(node, level, this.props.treeId)}>{node.Name}</Link>}
                nestedItems={children.map((child, index) => createNode(index, child, level + 1))} />
            );
        };

        return(
            <List>
                {nodes.map((node, index) => createNode(index, node, 0))}
            </List>
        );
    }
});
