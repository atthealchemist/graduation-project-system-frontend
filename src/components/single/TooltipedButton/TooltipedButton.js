import Tooltip from "@material-ui/core/Tooltip";
import {IconButton} from "@material-ui/core";
import React, {useState} from "react";
import {ToggleButton} from "@material-ui/lab";

export const TooltipedButton = ({tooltip, color = 'primary', component = IconButton, buttonStyle, children, onClick}) => {
    const ButtonComponent = component;
    return (
        <Tooltip title={tooltip}>
            <ButtonComponent style={buttonStyle} color={color} onClick={onClick}>{children}</ButtonComponent>
        </Tooltip>
    );
};

export const TooltipedToggleButton = ({tooltip, color = 'inherit', buttonStyle, children, performAction, isActive}) => {
    const [active, setActive] = useState(false);
    return (
        <Tooltip title={tooltip}>
            <ToggleButton
                style={buttonStyle}
                color={color}
                selected={isActive || active}
                onChange={() => {
                    setActive(!active);
                    performAction()
                }}
                value={'ro'}>
                {children}
            </ToggleButton>
        </Tooltip>
    );
};