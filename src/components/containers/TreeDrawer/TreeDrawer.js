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
import convert from 'htmr';

import {Link} from 'react-router-dom';

const FormattedDateLabel = ({date, caption, parseFormat="YYYY-MM-DD HH:mm", displayFormat="DD.MM.YYYY HH:mm"}) => <Box display={'flex'} flexDirection={'row'}>
    <Typography style={{marginRight: '.25em'}}>{caption}: </Typography>
    <Moment format={displayFormat} parse={parseFormat}>
        {date}
    </Moment>
</Box>;


export default class TreeDrawer extends React.Component {

    state = {
        selectedNodes: [],
        expandedNodes: []
    };

    renderNode = (node, idx) =>
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
                {node.children.map((child, idx) => this.renderNode(child, idx))}
            </DocumentTreeItem>
        </Link>;

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
                {stubTree.map((node, idx) => this.renderNode(node, idx))}
            </TreeView>
        </Drawer>;
    }
}