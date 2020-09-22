import React from 'react';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import {AccountCircle} from '@material-ui/icons';
import MenuIcon from '@material-ui/icons/Menu';
import {Menu, MenuItem} from '@material-ui/core';
import classes from "./styles";
import TreeDrawer from '../TreeDrawer/TreeDrawer';
import Button from "@material-ui/core/Button";


export default class NavigationBar extends React.Component {

    state = {
        openDrawer: false,
        openMenu: false
    }

    handleDrawer = () => {
        const {openDrawer} = this.state;
        this.setState({openDrawer: !openDrawer});
    };

    handleMenu = () => {
        const {openMenu} = this.state;
        this.setState({openMenu: !openMenu});
    };

    render() {
        const {title} = this.props;

        const {openDrawer, openMenu} = this.state;


        return (
            <div className={classes.root}>
                <CssBaseline/>
                <AppBar
                    position="fixed"
                    className={clsx(classes.appBar, {
                        [classes.appBarShift]: openDrawer,
                    })}
                >
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={this.handleDrawer}
                            edge="start"
                            className={clsx(classes.menuButton, openDrawer && classes.hide)}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" noWrap>
                            {title}
                        </Typography>
                        <div>
                            <IconButton
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                color="inherit"
                                onClick={this.handleMenu}
                            >
                                <AccountCircle/>
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={'IconButton'}
                                keepMounted
                                open={openMenu}
                            >
                                <MenuItem>Profile</MenuItem>
                                <MenuItem>My account</MenuItem>
                            </Menu>
                        </div>
                        <Button style={{right: '0px'}} color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>
                <TreeDrawer open={openDrawer}/>
                <main
                    className={clsx(classes.content, {
                        [classes.contentShift]: openDrawer,
                    })}
                >
                </main>
            </div>
        );
    }
}