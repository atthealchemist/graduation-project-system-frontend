import React from "react";
import Drawer from "@material-ui/core/Drawer";
import classes from "../NavigationBar/styles";
import List from "@material-ui/core/List";
import TreeItem from "../../items/TreeItem";
import {stubTree} from './stub';
import {Divider, Typography} from "@material-ui/core";
import TreeDrawerHeader from "./TreeDrawerHeader";



export default class TreeDrawer extends React.Component {

    renderNode = (node) =>
        <TreeItem
            key={node.id}
            type={node.type}
            title={node.name}>
            {node.children && node.children.map(child => this.renderNode(child))}
        </TreeItem>;

    render() {

        const {open} = this.props;
        // const { data } = this.props;

        return <Drawer
            anchor="left"
            open={open}
            style={{zIndex: 0}}
            >
            <TreeDrawerHeader user={{name: 'Hanyuu', avatar: 'http://lorempixel.com/200/200/'}} />
            <Divider/>
            <List
                style={{marginTop: '0em'}}>
                {stubTree.map(node => this.renderNode(node))}
            </List>
        </Drawer>;
    }
}