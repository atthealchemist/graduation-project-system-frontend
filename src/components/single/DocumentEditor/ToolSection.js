import Box from "@material-ui/core/Box";
import InputLabel from "@material-ui/core/InputLabel";
import {Divider} from "@material-ui/core";
import React from "react";

export const ToolSection = ({label, children, divider = true}) => <>
    <Box>
        <InputLabel style={{fontSize: 'x-small', margin: '.25em', color: '#999'}} focused={true}>{label}</InputLabel>
        <Box style={{display: 'flex'}}>
            {children}
        </Box>
    </Box>
    {divider &&
    <Divider style={{margin: 'auto 2px', height: '30px', position: 'relative', top: '8px'}} orientation={'vertical'}
             flexItem/>}
</>;