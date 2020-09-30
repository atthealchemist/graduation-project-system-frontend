import {Avatar, Card, CardActions, CardContent, CardHeader, Typography} from "@material-ui/core";
import styles from "../../pages/DashboardPage/styles";
import {Description, FolderOpen} from "@material-ui/icons";
import convert from "htmr";
import {TooltipedButton} from "../../single/TooltipedButton/TooltipedButton";
import DeleteIcon from "@material-ui/icons/Delete";
import ShareIcon from "@material-ui/icons/Share";
import React from "react";

export const DocumentItem = ({id, title, description, content, author, onDocumentShare, onDocumentRemove}) => <Card
    style={{
        width: 320,
        margin: '1em'
    }}>
    <CardHeader
        style={{borderBottom: '1px solid #eee'}}
        title={title}
        avatar={
            <Avatar
                style={styles.avatar}
                alt="Remy Sharp"
            >
                {content ? <Description/> : <FolderOpen/>}
            </Avatar>
        }
        subheader={content && description}/>
    {content && <CardContent>
        <Typography variant="body1" component="p">
            {convert(content)}
        </Typography>
    </CardContent>}
    {content && <CardActions disableSpacing>
        <TooltipedButton tooltip='Remove' onClick={onDocumentRemove}>
            <DeleteIcon color="secondary"/>
        </TooltipedButton>
        <TooltipedButton tooltip="Share" onClick={onDocumentShare}>
            <ShareIcon color="primary"/>
        </TooltipedButton>
    </CardActions>}
</Card>;