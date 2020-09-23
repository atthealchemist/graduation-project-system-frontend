import {Card, CardContent, Container, Typography} from "@material-ui/core";
import React from "react";
import styles from './styles';
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";

const MainContainer = ({children}) => <Container fixed style={styles.main}>
    <Paper style={styles.paper}>{children}</Paper>
</Container>

export default MainContainer;
