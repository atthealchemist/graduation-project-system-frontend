import React from 'react';
import ListItem from "@material-ui/core/ListItem";
import {Description, ExpandLess, ExpandMore, Folder} from "@material-ui/icons";
import Collapse from "@material-ui/core/Collapse";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";

export default class TreeItem extends React.Component {

    state = {
        open: false,
        level: 1
    }

    handleClick = () => {
        const { type, title } = this.props;
        const {open, level} = this.state;
        this.setState({
            open: type === 'folder' && !open,
            level: level + 1
        });
        console.log(`Selected ${type}: ${title}`);
    };

    countChildren = (children) => {
        let len = children.length;
        children.map(c => c.children ? len += this.countChildren(c.children) : 1);
        return len;
    };

    render() {

        const {type, title, children} = this.props;
        const {open} = this.state;

        let item = '';
        if (type === 'folder') {
            item =
                <React.Fragment>
                    <ListItem
                        button
                        onClick={this.handleClick}
                        style={{
                            paddingLeft: this.state.level + 1
                        }}
                        >
                        <ListItemIcon >
                            <Folder/>
                        </ListItemIcon>
                        <ListItemText primary={title} secondary={`${children ? this.countChildren(children) : 1} items`}/>
                        {open ? <ExpandLess/> : <ExpandMore/>}
                    </ListItem>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <List component="div">
                            {children}
                        </List>
                    </Collapse>
                </React.Fragment>
        }

        if (type === 'node') {
            item =
                <ListItem
                    button
                    onClick={this.handleClick}
                    style={{
                        paddingLeft: this.state.level
                    }}
                >
                    <ListItemIcon >
                        <Description/>
                    </ListItemIcon>
                    <ListItemText primary={title}/>
                </ListItem>
        }

        return item;
    }

};