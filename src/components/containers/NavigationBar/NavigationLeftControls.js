import Box from "@material-ui/core/Box";
import {ButtonLink} from "../../single/ButtonLink/ButtonLink";
import React from "react";

export const NavigationLeftControls = ({path}) => <Box ml={3}>
    <ButtonLink to={'/dashboard'}>Dashboard</ButtonLink>
</Box>;