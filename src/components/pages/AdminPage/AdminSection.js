import {Box, Typography} from "@material-ui/core";
import React from "react";

export const AdminSection = ({title, children}) =>
    <Box style={{
        width: 1200,
        margin: '1em auto'
    }}>
        <Typography style={{textAlign: 'left'}} variant={"h5"}>{title}</Typography>
        {children}
    </Box>;