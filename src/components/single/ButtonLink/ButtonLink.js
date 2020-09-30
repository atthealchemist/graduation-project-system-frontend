import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";

import React from 'react';
import IconButton from "@material-ui/core/IconButton";

const styles = {
    link: {
        textDecoration: 'none',
        color: 'inherit'
    }
};

export const ButtonLink = ({to, color, children, onClick, isIcon}) => <Link style={styles.link} to={to}>
    {isIcon ? <IconButton color={color} onClick={onClick}>{children}</IconButton> :
        <Button onClick={onClick} color={color}>{children}</Button>}
</Link>;