import {Card, CardActions} from "@material-ui/core";
import {TooltipedButton} from "../../single/TooltipedButton/TooltipedButton";
import DeleteIcon from "@material-ui/icons/Delete";
import ShareIcon from "@material-ui/icons/Share";
import React from "react";
import {Link} from "react-router-dom";
import {DocumentBody} from "./DocumentBody";

export const DocumentItem = ({
                                 id,
                                 width = 320,
                                 title,
                                 description,
                                 content,
                                 author,
                                 linkTo,
                                 linkClicked,
                                 onDocumentShare,
                                 onDocumentRemove
                             }) =>
    <Card
        style={{
            width: width,
            marginBottom: '.5em'
        }}>
        {linkTo ?
            <DocumentBody linkTo={linkTo} linkClicked={linkClicked} title={title} description={description}
                          content={content}/> :
            <DocumentBody title={title} content={content} description={description}/>}
        {content && <CardActions disableSpacing>
            <TooltipedButton tooltip='Remove' onClick={() => onDocumentRemove(id)}>
                <DeleteIcon color="secondary"/>
            </TooltipedButton>
            <TooltipedButton tooltip="Share" onClick={() => onDocumentShare(id)}>
                <ShareIcon color="primary"/>
            </TooltipedButton>
        </CardActions>}
    </Card>;
