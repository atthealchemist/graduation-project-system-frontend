import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import React, {useState} from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import {TooltipedButton} from "../TooltipedButton/TooltipedButton";
import ListItemText from "@material-ui/core/ListItemText";
import {DropzoneArea} from "material-ui-dropzone";


const ImportList = ({items = []}) => {

    const [listItems, setListItems] = useState([items]);

    const handleItemAdd = () => {

    };

    const handleItemDelete = (index) => {
        const newList = [...listItems];
        delete newList[index];
        setListItems(newList);
    };


    return (
        <Box>
            <List>
                {listItems.map((item, idx) => <ListItem key={idx}>
                    <ListItemText
                        primary={item.filePath}
                        secondary={item.fileSize}
                    />
                    <ListItemSecondaryAction>
                        <TooltipedButton edge="end" aria-label="delete" onClick={() => handleItemDelete(idx)}>
                            <DeleteIcon/>
                        </TooltipedButton>
                    </ListItemSecondaryAction>
                </ListItem>)}
            </List>
        </Box>

    )

};


export const ImportDialog = () => {

    const [open, setOpen] = useState(false);

    const handleClose = () => setOpen(false);

    const handleImport = () => {

    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}>
            <form>
                <DialogTitle>Importing documents</DialogTitle>
                <DialogContent>
                    <DropzoneArea
                        onChange={(files) => console.log('Files:', files)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button disabled={publish} type={"submit"} onClick={handleImport} color="primary" autoFocus>
                        Publish
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};