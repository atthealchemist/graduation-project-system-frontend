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
    AppBar, Avatar, Divider
} from '@material-ui/core';

import classes from "./styles";

import TreeDrawer from '../TreeDrawer/TreeDrawer';
import Box from "@material-ui/core/Box";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import {Link} from "react-router-dom";
import {ButtonLink} from "../../single/ButtonLink/ButtonLink";


const NavigationTitle = ({title, path, openDrawer, handleDrawer}) => <Box
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
    <LeftControls path={path}/>
</Box>;

const LeftControls = ({path}) => <Box ml={3}>
    <ButtonLink to={'/dashboard'}>Dashboard</ButtonLink>
</Box>;

const Author = ({name, image}) =>
    <Box mr={'1em'} style={{display: 'flex', alignItems: 'center'}}>
        <Typography variant="subtitle2" style={{margin: '0 1em', color: 'inherit'}}>Welcome back, <strong>{name}</strong>!</Typography>
        <Avatar
            style={{width: 25, height: 25}}
            alt="Remy Sharp"
            src={image}/>
    </Box>;


const UserControls = ({handleMenu, handleLogout}) => <Box style={{display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center'}}>
    <Author image={"https://lorempixel.com/25/25/"} name={'hanyuu'}/>
    <ButtonLink to={'/account'} onClick={handleMenu}>
        Account
    </ButtonLink>
    <ButtonLink to={'/logout'} onClick={handleLogout}>Logout</ButtonLink>
</Box>;

const GuestControls = ({handleLogin}) => <Box>
    <ButtonLink to={'/register'} onClick={handleLogin}>Register</ButtonLink>
    <ButtonLink to={'/login'} onClick={handleLogin}>Login</ButtonLink>
</Box>;

export default class NavigationBar extends React.Component {

    state = {
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
        const {title, path} = this.props;

        const {openDrawer} = this.state;
        const {loggedIn} = this.props;


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
                            path={path}
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

    handleLogin = () => this.props.onAuthChanged(true);

    handleLogout = () => this.props.onAuthChanged(false);

}