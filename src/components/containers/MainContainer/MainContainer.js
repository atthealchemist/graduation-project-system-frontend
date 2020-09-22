import {Card, CardContent, Container, Typography} from "@material-ui/core";
import React from "react";
import './MainContainer.css';

const MainContainer = () => <Container fixed>
    <Card>
        <CardContent className='content'>
            <Typography paragraph>HELLO</Typography>
        </CardContent>
    </Card>
</Container>

export default MainContainer;
