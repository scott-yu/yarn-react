import React from 'react';
import {Link} from 'react-router';
import './classification-tree.css';

export let ClassificationTree = React.createClass({
    getDefaultProps() {
        return {
            nodes: [],
            level: 0,
            treeId: null
        };
    },
    render() {
        const nodes = this.props.nodes;
        if (!nodes.length) return null;

        const getClassificationLink = node => {
            const {level, treeId} = this.props;
            const industryId = this.props.treeId || node.Id;
            let url = `browse/industry/${industryId}`;
            if (level) {
                url += `/classification/${node.Id}`;
            }
            return url;
        };
        
        return(
            <ul className="classification-tree">
                {nodes.map((node, index) => {
                    const childrenProps = {
                        treeId: this.props.treeId || node.Id,
                        level: this.props.level + 1
                    };
                    return (
                        <li key={index}>
                            <Link to={getClassificationLink(node)}>{node.Name}</Link>
                            <ClassificationTree nodes={node.Categories} {...childrenProps} />
                            <ClassificationTree nodes={node.Classifications} {...childrenProps} />
                        </li>
                    );
                }
                )}
            </ul>
        );
    }
});
