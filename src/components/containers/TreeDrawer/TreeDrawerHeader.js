import React from "react";
import {Container, Typography} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";

export default class TreeDrawerHeader extends React.Component {

    state = {};

    render() {
        const {user} = this.props;
        return <Container fixed
                          style={{marginTop: '4em', padding: '1em'}}>
            <Avatar
                style={{margin: '.5em auto', width: 100, height: 100}}
                alt="Remy Sharp" src={user.avatar}/>
            <Typography
                style={{margin: 'auto'}}
                component="h3">{user.name}'s space</Typography>
        </Container>;
    };

}