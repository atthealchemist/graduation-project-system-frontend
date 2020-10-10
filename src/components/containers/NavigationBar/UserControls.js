import Box from "@material-ui/core/Box";
import {Author} from "./Author";
import {ButtonLink} from "../../single/ButtonLink/ButtonLink";
import React from "react";

export const UserControls = ({handleMenu, handleLogout}) => <Box style={{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center'
}}>
    <Author image={"https://lorempixel.com/25/25/"} name={'hanyuu'}/>
    <ButtonLink to={'/account'} onClick={handleMenu}>
        Account
    </ButtonLink>
    <ButtonLink to={'/logout'} onClick={handleLogout}>Logout</ButtonLink>
</Box>;