import React, {useState} from "react";
import {Avatar} from "@material-ui/core";

export const AvatarEditable = ({url}) => {

    const styles = {
        avatar: {
            width: 200,
            height: 200
        },
        avatarTint: {
            backgroundColor: 'rgba(200, 100, 0, .5)', // Tint color
            backgroundBlendMode: 'multiply'
        }
    };

    const [image, setImage] = useState(url);
    const [style, setStyle] = useState([styles.avatar]);

    return (
        <Avatar src={image} style={styles.avatar} onMouseOver={() => {
        }}/>
    );
};