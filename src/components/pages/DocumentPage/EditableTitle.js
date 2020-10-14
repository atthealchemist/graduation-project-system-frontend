import React, {useState} from "react";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import {TooltipedButton} from "../../single/TooltipedButton/TooltipedButton";
import {Check, Edit} from "@material-ui/icons";

export const EditableTitle = ({content, onTitleChanged}) => {
    const [title, setTitle] = useState(content || "New document");
    const [editMode, setEditMode] = useState(false);

    const onChangedTitleSubmit = () => {
        if (editMode) {
            if (!title) return;
            setTitle(title);
        }
        setEditMode(!editMode);
    };

    return (
        <Box
            display={'flex'}
            alignSelf={'center'}
            alignItems={'center'}
            gap={'.25em'}
            flexGrow={1}>
            {editMode
                ? <TextField
                    value={title}
                    placeholder={"Set new title"}
                    onKeyDown={(event => event.key === 'Enter' && onChangedTitleSubmit())}
                    onChange={(event) => setTitle(event.target.value)}/>
                : <Typography variant="h6">{title}</Typography>}
            <TooltipedButton
                onClick={onChangedTitleSubmit}
                tooltip={"Edit title"}
                buttonStyle={{display: 'flex', width: 25, height: 25}}>
                {!editMode ? <Edit style={{width: 15, height: 15}}/> :
                    <Check style={{color: 'green', width: 15, height: 15}}/>}
            </TooltipedButton>
        </Box>
    );

};