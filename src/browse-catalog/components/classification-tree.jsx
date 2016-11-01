import React from 'react';
import './classification-tree.css';

export let ClassificationTree = React.createClass({
    getDefaultProps() {
        return {
            nodes: []
        };
    },
    render() {
        const nodes = this.props.nodes;
        if (!nodes.length) return null;
        return(
            <ul className="classification-tree">
                {nodes.map((node, index) => (
                    <li key={index}>
                        {node.Name}
                        <ClassificationTree nodes={node.Categories} />
                        <ClassificationTree nodes={node.Classifications} />
                    </li>
                ))}
            </ul>
        );
    }
});
