import Box from "@material-ui/core/Box";
import {Avatar, Typography} from "@material-ui/core";
import React from "react";

export const Author = ({name, image}) =>
    <Box mr={'1em'} style={{display: 'flex', alignItems: 'center'}}>
        <Typography variant="subtitle2" style={{margin: '0 1em', color: 'inherit'}}>Welcome
            back, <strong>{name}</strong>!</Typography>
        <Avatar
            style={{width: 25, height: 25}}
            alt="Remy Sharp"
            src={image}/>
    </Box>;