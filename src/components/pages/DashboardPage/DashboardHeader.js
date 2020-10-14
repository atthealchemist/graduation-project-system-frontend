import {Box, Divider, Typography} from "@material-ui/core";
import React from "react";

export const DashboardHeader = ({username, docsCount}) => <Box mb={5}>
    <Typography style={{fontWeight: 600}} variant={'h2'} gutterBottom>{username}'s space</Typography>
    {docsCount > 0 && <Typography variant={'h4'} gutterBottom>{docsCount} documents</Typography>}
    <Divider/>
</Box>;