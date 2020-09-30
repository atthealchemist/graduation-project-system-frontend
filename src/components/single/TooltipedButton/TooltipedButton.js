import Tooltip from "@material-ui/core/Tooltip";
import {Button, IconButton} from "@material-ui/core";
import React from "react";

export const TooltipedButton = ({tooltip, color = 'primary', iconButton = true, buttonStyle, children}) => <Tooltip title={tooltip}>
    {iconButton ? <IconButton style={buttonStyle} color={'primary'}>{children}</IconButton> : <Button style={buttonStyle} color={color}>{children}</Button>}
</Tooltip>;