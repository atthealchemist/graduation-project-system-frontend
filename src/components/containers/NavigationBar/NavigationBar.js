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

import styles from "./styles";
import TreeDrawer from '../TreeDrawer/TreeDrawer';
import Box from "@material-ui/core/Box";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

const NavigationTitle = ({title, openDrawer, handleDrawer}) => <Box
    display={'flex'}
    alignItems={'center'}
    flexGrow={1}>
    <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={handleDrawer}
        edge="start"
        className={clsx(styles.menuButton, openDrawer && styles.hide)}
    >
        <MenuIcon/>
    </IconButton>
    <Typography variant="h6" noWrap>
        {title}
    </Typography>
</Box>;


const UserControls = ({handleMenu, handleLogout}) => <Box>
    <IconButton
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        color="inherit"
        onClick={handleMenu}
    >
        <AccountCircle/>
    </IconButton>
    <Button color={'inherit'} onClick={handleLogout}>Logout</Button>
</Box>;

const GuestControls = ({handleLogin}) => <Box>
    <Button color="inherit" onClick={handleLogin}>Login</Button>
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
            <div className={styles.root}>
                <CssBaseline/>
                <AppBar
                    position="fixed"
                    className={clsx(styles.appBar, {
                        [styles.appBarShift]: openDrawer,
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