import {Link} from "react-router-dom";

import React from 'react';
import {Button} from "@material-ui/core";

const styles = {
    link: {
        textDecoration: 'none',
        color: 'inherit'
    }
};

export const ButtonLink = ({to, color = 'inherit', children, onClick, component = Button}) => {

    const Component = component;

    return (
        <Link style={styles.link} to={to}>
            <Component color={color} onClick={onClick}>{children}</Component>
        </Link>
    );

};