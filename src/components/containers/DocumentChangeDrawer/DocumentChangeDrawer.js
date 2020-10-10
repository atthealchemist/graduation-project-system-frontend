import React, {useState} from "react";
import styles from "../TreeDrawer/styles";
import {Drawer} from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import {Schedule} from "@material-ui/icons";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import {DocumentChangeDrawerHeader} from "./DocumentChangeDrawerHeader";
import {FormattedDateLabel} from "../TreeDrawer/FormattedDateLabel";


const DocumentChangeDrawer = ({changes, open, onChangeHovered}) => {

    const [openDrawer, setOpenDrawer] = useState(open);

    return (
        <Drawer
            anchor="right"
            open={openDrawer}
            onClose={() => setOpenDrawer(!openDrawer)}
            style={styles.drawer}>
            <DocumentChangeDrawerHeader style={{marginTop: '4em'}} count={13}/>
            <List>
                {changes.map((change, index) => (
                    <ListItem button key={index} onMouseOver={() => onChangeHovered(change)}>
                        <ListItemIcon><Schedule/></ListItemIcon>
                        <ListItemText><FormattedDateLabel caption={"Changed at"} date={new Date(change.timestamp)}/></ListItemText>
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );

};

export default DocumentChangeDrawer;