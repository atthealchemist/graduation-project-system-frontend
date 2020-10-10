import React, {useState} from "react";
import {Divider, Drawer} from "@material-ui/core";

import DocumentTreeItem from "../../items/TreeItem/TreeItem";
import {stubTree} from './stub';
import TreeDrawerHeader from "../TreeDrawerHeader/TreeDrawerHeader";

import styles from './styles';
import TreeView from "@material-ui/lab/TreeView";
import ExpandLessIcon from '@material-ui/icons/ExpandLess/';
import ChevronRightIcon from '@material-ui/icons/ChevronRight/';
import convert from 'htmr';

import {Link} from 'react-router-dom';
import {FormattedDateLabel} from "./FormattedDateLabel";


const TreeDrawer = ({open, onDrawerClosed}) => {

    const [selectedNodes, setSelectedNodes] = useState([]);
    const [expandedNodes, setExpandedNodes] = useState([]);

    const renderNode = (node, idx) =>
        <Link key={idx} to={`/documents/${node.id}`} style={styles.link}>
            <DocumentTreeItem
                key={idx}
                nodeId={node.id}
                title={node.name}
                description={
                    <FormattedDateLabel caption={"Created at"} date={new Date()}/>
                }
                content={node.content && convert(node.content)}
            >
                {node.children.map((child, idx) => renderNode(child, idx))}
            </DocumentTreeItem>
        </Link>;

    const handleNodeSelect = (event, nodeIds) => {
        console.log('selected nodes: ' + nodeIds)
        // this.setState({expandedNodes: nodeIds});
        setSelectedNodes(nodeIds);
    };

    const handleNodeToggle = (event, nodeIds) => {
        console.log('expanded nodes: ' + nodeIds)
        setExpandedNodes(nodeIds);
        // this.setState({selectedNodes: [nodeIds]});
    };


    const sampleUser = {
        name: 'Hanyuu',
        avatar: 'http://lorempixel.com/200/200/',
        totalItems: 456
    };

    return <Drawer
        anchor="left"
        open={open}
        onClose={onDrawerClosed}
        style={styles.drawer}>
        <TreeDrawerHeader user={sampleUser}/>
        <Divider/>
        <TreeView
            defaultExpanded={['fld1']}
            defaultExpandIcon={<ChevronRightIcon style={{width: 25, height: 25}}/>}
            defaultCollapseIcon={<ExpandLessIcon style={{width: 25, height: 25}}/>}
            // defaultEndIcon={<Description/>}
            multiSelect={true}
            selected={selectedNodes}
            expanded={expandedNodes}
            onNodeSelect={handleNodeSelect}
            onNodeToggle={handleNodeToggle}
            style={styles.drawerList}>
            {stubTree.map((node, idx) => renderNode(node, idx))}
        </TreeView>
    </Drawer>;
}

export default TreeDrawer;