import {Box, Card, CardHeader} from "@material-ui/core";
import React from "react";

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
                    title={"Welcome aboard, capitan!"}
                    subheader={"Your preferences and settings are waiting for you"}/>
            </Card>

        </Box>
    );

};

export default AccountPage;