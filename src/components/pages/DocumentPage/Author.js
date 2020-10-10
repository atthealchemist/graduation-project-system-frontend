import Box from "@material-ui/core/Box";
import {Avatar} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import React from "react";

export const Author = ({name, image}) =>
    <Box
        display={'flex'}
        flexDirection={'row'}
        alignItems={'center'}
        justifyContent={'center'}
    >
        <Avatar
            style={{width: 25, height: 25}}
            alt="Remy Sharp"
            src={image}/>
        <Typography style={{margin: '0 1em', fontSize: 'small'}}>{name}</Typography>
    </Box>;