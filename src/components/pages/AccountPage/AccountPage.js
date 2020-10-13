import {Box, Card, CardContent, CardHeader, Typography} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import {AvatarEditable} from "./AvatarEditable";
import {getCurrentUser} from "../../../api/user";

const AccountPage = () => {
    const [user, setUser] = useState(   {});

    const handleUserGot = (user) => {
        setUser(user);
    };

    const componentDidMount = () => {
        getCurrentUser(handleUserGot)
    };

    useEffect(componentDidMount)

    const renderFields = () => {

    };

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
                    title={`Welcome aboard, ${user.display_name}!`}
                    subheader={"Your preferences and settings are waiting for you"}/>
            </Card>
            <Card style={{
                width: 1200,
                margin: 'auto',
            }}>
                <CardContent>
                    <Box margin={'2em'}>
                        <AvatarEditable url={"https://lorempixel.com/200/200/"}/>

                    </Box>
                </CardContent>
            </Card>
        </Box>
    );

};

export default AccountPage;