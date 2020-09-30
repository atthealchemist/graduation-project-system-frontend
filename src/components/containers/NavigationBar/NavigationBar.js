import React from 'react';
import clsx from 'clsx';

import {AccountCircle} from '@material-ui/icons';
import MenuIcon from '@material-ui/icons/Menu';
import {
    Menu,
    MenuItem,
    Toolbar,
    Typography,
    Button,
    IconButton,
    CssBaseline,
    AppBar
} from '@material-ui/core';

import classes from "./styles";

import TreeDrawer from '../TreeDrawer/TreeDrawer';
import Box from "@material-ui/core/Box";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import {Link} from "react-router-dom";
import {ButtonLink} from "../../single/ButtonLink/ButtonLink";


const NavigationTitle = ({title, openDrawer, handleDrawer}) => <Box
    display={'flex'}
    alignItems={'center'}
    flexGrow={1}>
    <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={handleDrawer}
        edge="start"
        className={clsx(classes.menuButton, openDrawer && classes.hide)}
    >
        <MenuIcon/>
    </IconButton>
    <Typography variant="h6" noWrap>
        {title}
    </Typography>
    <Box ml={3}>
        <ButtonLink to={'/dashboard'} color={'inherit'}>Dashboard</ButtonLink>
    </Box>
</Box>;


const UserControls = ({handleMenu, handleLogout}) => <Box>
    <ButtonLink isIcon to={'/account'} color="inherit" onClick={handleMenu}>
        <AccountCircle/>
    </ButtonLink>
    <ButtonLink to={'/logout'} color={'inherit'} onClick={handleLogout}>Logout</ButtonLink>
</Box>;

const GuestControls = ({handleLogin}) => <Box>
    <ButtonLink to={'/register'} color={'inherit'} onClick={handleLogin}>Register</ButtonLink>
    <ButtonLink to={'/login'} color={'inherit'} onClick={handleLogin}>Login</ButtonLink>
</Box>;

export default class NavigationBar extends React.Component {

    state = {
        loggedIn: false,
        openDrawer: false,
        openMenu: false
    }

    handleClickAway = () => {
        this.setState({openDrawer: false});
    };

    handleDrawer = () => {
        const {openDrawer} = this.state;
        this.setState({openDrawer: !openDrawer});
    };

    handleMenu = () => {
        const {openMenu} = this.state;
        this.setState({openMenu: !openMenu});
    };

    handleDrawerClosed = () => {
        this.setState({openDrawer: false});
    };

    render() {
        const {title} = this.props;

        const {loggedIn, openDrawer} = this.state;


        return (
            <div className={classes.root}>
                <CssBaseline/>
                <AppBar
                    position="fixed"
                    className={clsx(classes.appBar, {
                        [classes.appBarShift]: openDrawer,
                    })}
                >
                    <Toolbar
                        display={'flex'}>
                        <NavigationTitle
                            openDrawer={openDrawer}
                            handleDrawer={this.handleDrawer}
                            title={title}
                        />
                        {
                            loggedIn ?
                                <UserControls handleMenu={this.handleMenu} handleLogout={this.handleLogout}/>
                                :
                                <GuestControls handleLogin={this.handleLogin}/>
                        }
                    </Toolbar>
                </AppBar>
                <TreeDrawer open={openDrawer} onDrawerClosed={this.handleDrawerClosed}/>
            </div>
        );
    }

    handleLogin = () => {
        this.setState({loggedIn: true});
    }

    handleLogout = () => {
        this.setState({loggedIn: false});
    }

}