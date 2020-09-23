import React from "react";
import {Container, Typography} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import styles from './styles';

const TreeDrawerHeader = ({user}) =>
    <Container fixed
               style={styles.container}>
        <Avatar
            style={styles.avatar}
            alt="Remy Sharp" src={user.avatar}/>
        <Typography
            style={styles.userTitle}
            component="h2">{user.name}'s space</Typography>
        <Typography
            style={styles.userItems}
            component="h3">{user.totalItems} documents</Typography>
    </Container>;

export default TreeDrawerHeader;

// export default class TreeDrawerHeader extends React.Component {
//
//     state = {};
//
//     render() {
//         const {user} = this.props;
//
//         return
//     };
//
// }