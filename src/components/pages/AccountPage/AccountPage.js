import {Box, Card, CardContent, CardHeader, Typography} from "@material-ui/core";
import React from "react";
import {AvatarEditable} from "./AvatarEditable";

const AccountPage = () => {

    return(
        <Box mt={'6em'}>
            <Card
                style={{
                    width: 1200,
                    margin: 'auto',
                    backgroundColor: 'transparent',
                    boxShadow: 'none'
                }}>
                <CardHeader
                    title={"Welcome aboard, Capitan!"}
                    subheader={"Your preferences and settings are waiting for you"}/>
            </Card>
            <Card style={{
                width: 1200,
                margin: 'auto',
            }}>
                <CardContent>
                    <Box margin={'2em'}>
                        <AvatarEditable url={"https://lorempixel.com/200/200/"}/>
                        <Typography>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A architecto blanditiis commodi culpa, deleniti ducimus et hic incidunt minus molestias neque non ratione sint sunt tempore temporibus ullam vel voluptates!</Typography>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );

};

export default AccountPage;