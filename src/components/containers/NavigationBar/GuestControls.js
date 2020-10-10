import Box from "@material-ui/core/Box";
import {ButtonLink} from "../../single/ButtonLink/ButtonLink";
import React from "react";

export const GuestControls = ({handleLogin}) => <Box>
    <ButtonLink to={'/register'} onClick={handleLogin}>Register</ButtonLink>
    <ButtonLink to={'/login'} onClick={handleLogin}>Login</ButtonLink>
</Box>;