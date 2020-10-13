import Box from "@material-ui/core/Box";
import {IconButton, Typography} from "@material-ui/core";
import clsx from "clsx";
import classes from "./styles";
import MenuIcon from "@material-ui/icons/Menu";
import React from "react";
import {NavigationLeftControls} from "./NavigationLeftControls";

export const NavigationTitle = ({title, path, openDrawer, handleDrawer}) => <Box
    display={'flex'}
    alignItems={'center'}
    flexGrow={1}>
    {/*<IconButton*/}
    {/*    color="inherit"*/}
    {/*    aria-label="open drawer"*/}
    {/*    onClick={handleDrawer}*/}
    {/*    edge="start"*/}
    {/*    className={clsx(classes.menuButton, openDrawer && classes.hide)}*/}
    {/*>*/}
    {/*    <MenuIcon/>*/}
    {/*</IconButton>*/}
    <Typography variant="h6" noWrap>
        {title}
    </Typography>
    <NavigationLeftControls path={path}/>
</Box>;