import React, {useState} from 'react';
import clsx from 'clsx';
import {AppBar, CssBaseline, Toolbar} from '@material-ui/core';

import classes from "./styles";

import TreeDrawer from '../TreeDrawer/TreeDrawer';
import {NavigationTitle} from "./NavigationTitle";
import {UserControls} from "./UserControls";
import {GuestControls} from "./GuestControls";


const NavigationBar = ({title, path, loggedIn, onAuthChanged}) => {

    const [openDrawer, setOpenDrawer] = useState(false);
    const [openMenu, setOpenMenu] = useState(false);

    const handleLogin = () => onAuthChanged(true);

    const handleLogout = () => onAuthChanged(false);

    const handleClickAway = () => setOpenDrawer(false);

    const handleDrawer = () => setOpenDrawer(!openDrawer);

    const handleMenu = () => setOpenMenu(!openMenu);

    const handleDrawerClosed = () => setOpenDrawer(false);


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
                        handleDrawer={handleDrawer}
                        title={title}
                        path={path}
                    />
                    {
                        loggedIn ?
                            <UserControls handleMenu={handleMenu} handleLogout={handleLogout}/>
                            :
                            <GuestControls handleLogin={handleLogin}/>
                    }
                </Toolbar>
            </AppBar>
            <TreeDrawer open={openDrawer} onDrawerClosed={handleDrawerClosed}/>
        </div>
    );

}

export default NavigationBar;