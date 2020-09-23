import React from "react";
import {Drawer, List, Divider, Typography, Box} from "@material-ui/core";

import DocumentTreeItem from "../../items/TreeItem/TreeItem";
import {stubTree} from './stub';
import TreeDrawerHeader from "../TreeDrawerHeader/TreeDrawerHeader";

import styles from './styles';
import TreeView from "@material-ui/lab/TreeView";
import ExpandLessIcon from '@material-ui/icons/ExpandLess/';
import ChevronRightIcon from '@material-ui/icons/ChevronRight/';
import Moment from "react-moment";

export default class TreeDrawer extends React.Component {

    state = {
        selectedNodes: [],
        expandedNodes: []
    };

    renderNode = (node) =>
        <DocumentTreeItem
            key={node.id}
            nodeId={node.id}
            title={node.name}
            description={
                <Box display={'flex'} flexDirection={'row'}>
                    <Typography style={{marginRight: '.25em'}}>Created at: </Typography>
                    <Moment format="DD.MM.YYYY HH:mm" parse="YYYY-MM-DD HH:mm">
                        {new Date()}
                    </Moment>
                </Box>
            }
            content={node.content}
        >
            {node.children.map((child) => this.renderNode(child))}
        </DocumentTreeItem>;

    handleNodeSelect = (event, nodeIds) => {
        console.log('selected nodes: ' + nodeIds)
        // this.setState({expandedNodes: nodeIds});
        this.setState({selectedNodes: nodeIds});
    };

    handleNodeToggle = (event, nodeIds) => {
        console.log('expanded nodes: ' + nodeIds)
        this.setState({expandedNodes: nodeIds});
        // this.setState({selectedNodes: [nodeIds]});

    };

    render() {

        const {open} = this.props;
        // const { data } = this.props;

        const {selectedNodes, expandedNodes} = this.state;

        const sampleUser = {
            name: 'Hanyuu',
            avatar: 'http://lorempixel.com/200/200/',
            totalItems: 456
        };

        return <Drawer
            anchor="left"
            open={open}
            onClose={this.props.onDrawerClosed}
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
                onNodeSelect={this.handleNodeSelect}
                onNodeToggle={this.handleNodeToggle}
                style={styles.drawerList}>
                {stubTree.map(node => this.renderNode(node))}
            </TreeView>
        </Drawer>;
    }
}