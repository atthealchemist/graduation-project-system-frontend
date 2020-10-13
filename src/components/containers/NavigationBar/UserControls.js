import Box from "@material-ui/core/Box";
import {Author} from "./Author";
import {ButtonLink} from "../../single/ButtonLink/ButtonLink";
import React from "react";

export const UserControls = ({
                                 user = {display_name: 'Hanyuu', avatar: 'https://lorempixel.com/25/25/'},
                                 handleMenu,
                                 handleLogout
                             }) => {

    return (
        <Box style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            alignSelf: 'center'
        }}>
            <Author image={user.avatar} name={user.display_name}/>
            <ButtonLink to={'/account'} onClick={handleMenu}>
                Account
            </ButtonLink>
            <ButtonLink to={'/logout'} onClick={handleLogout}>Logout</ButtonLink>
        </Box>
    );

};