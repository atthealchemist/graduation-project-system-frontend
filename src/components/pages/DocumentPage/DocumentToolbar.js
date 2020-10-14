import {Toolbar} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import {EditableTitle} from "./EditableTitle";
import {Author} from "./Author";
import Divider from "@material-ui/core/Divider";
import {TooltipedButton} from "../../single/TooltipedButton/TooltipedButton";
import {History, Publish} from "@material-ui/icons";
import Tooltip from "@material-ui/core/Tooltip";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ChromeReaderModeIcon from "@material-ui/icons/ChromeReaderMode";
import ShareIcon from "@material-ui/icons/Share";
import GetAppIcon from "@material-ui/icons/GetApp";
import React, {useState} from "react";

export const DocumentToolbar = (
    {
        document = { name: 'New document', content: ''},
        author = {name: 'Guest', avatarUrl: "https://lorempixel.com/25/25"},
        onChange,
        onDocumentPublish,
        onTitleChanged,
        onHistoryOpened,
        readOnly
    }
) => {

    const [documentAuthor, setDocumentAuthor] = useState(author);
    const [userDocument, setUserDocument] = useState(document);

    return (
        <Toolbar
            variant="dense">
            <Box display={"flex"} width={"100%"}>
                <EditableTitle content={userDocument.name} onTitleChanged={onTitleChanged}/>
                <Author image={documentAuthor.avatarUrl} name={documentAuthor.name}/>
                <Divider orientation="vertical" flexItem/>
                <Box display={"flex"} ml={1}>
                    <TooltipedButton
                        onClick={onHistoryOpened}
                        buttonStyle={{padding: ".25em .5em"}}
                        tooltip={"Changes"}>
                        <History/>
                    </TooltipedButton>
                    <Tooltip title={`Read only mode ${readOnly ? "enabled" : "disabled"}`}>
                        <ToggleButton
                            style={{
                                border: "1px solid transparent",
                                borderRadius: "50%",
                                padding: ".75em"
                            }}
                            color={"primary"}
                            selected={readOnly}
                            onChange={onChange}
                            value={"ro"}>
                            <ChromeReaderModeIcon/>
                        </ToggleButton>
                    </Tooltip>
                    <TooltipedButton
                        buttonStyle={{padding: ".25em .5em"}}
                        tooltip={"Share"}>
                        <ShareIcon/>
                    </TooltipedButton>
                    <TooltipedButton
                        buttonStyle={{padding: ".25em .5em"}}
                        tooltip={"Download"}>
                        <GetAppIcon/>
                    </TooltipedButton>
                    <TooltipedButton
                        onClick={onDocumentPublish}
                        buttonStyle={{padding: ".25em .5em"}}
                        tooltip={"Publish"}>
                        <Publish/>
                    </TooltipedButton>
                </Box>
            </Box>
        </Toolbar>
    );

};
