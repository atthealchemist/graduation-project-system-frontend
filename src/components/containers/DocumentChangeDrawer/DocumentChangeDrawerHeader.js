import {Container, Divider, Typography} from "@material-ui/core";
import styles from "../TreeDrawer/styles";
import React from "react";

export const DocumentChangeDrawerHeader = ({count}) => <>
    <Container fixed
               style={styles.container}>
        <Typography
            style={styles.userTitle}
            component="h2">Changes ({count})</Typography>
    </Container>
    <Divider/>
</>;