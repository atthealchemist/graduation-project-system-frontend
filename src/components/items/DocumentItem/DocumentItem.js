import {Avatar, Card, CardActions, CardContent, CardHeader, Typography} from "@material-ui/core";
import styles from "../../pages/DashboardPage/styles";
import {Description, ExpandLess, ExpandMore, FolderOpen, MoreVert} from "@material-ui/icons";
import convert from "htmr";
import {TooltipedButton} from "../../single/TooltipedButton/TooltipedButton";
import DeleteIcon from "@material-ui/icons/Delete";
import ShareIcon from "@material-ui/icons/Share";
import React, {useState} from "react";
import {Link} from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";

const CardBody = ({title, content, description, linkTo}) => {

    const [expanded, setExpanded] = useState(false);

    return (<><CardHeader
        style={{borderBottom: '1px solid #eee'}}
        title={
            linkTo ? <Link to={linkTo} style={{color: 'inherit', textDecoration: 'none'}}>{title}</Link> : title
        }
        action={
            content &&
            <TooltipedButton tooltip="Reveal content" aria-label="settings" onClick={() => setExpanded(!expanded)}>
                {expanded ? <ExpandLess/> : <ExpandMore/>}
            </TooltipedButton>
        }
        avatar={
            <Avatar
                style={styles.avatar}
                alt="Remy Sharp"
            >
                {content ? <Description/> : <FolderOpen/>}
            </Avatar>
        }
        subheader={content && description}/>
        {content && <Collapse in={expanded} timeout="auto" unmountOnExit><CardContent>
            <Typography variant="body1" component="p">
                {convert(content)}
            </Typography>
        </CardContent></Collapse>}</>);
};

const LinkedCardBody = ({linkTo, title, content, description}) => <Link
    style={{textDecoration: 'none', color: 'inherit'}} to={linkTo}>
    <CardBody title={title} content={content} description={description}/>
</Link>;

export const DocumentItem = ({id, width = 320, title, description, content, author, linkTo, onDocumentShare, onDocumentRemove}) => {


    return (
        <Card
            style={{
                width: width,
                marginBottom: '.5em'
            }}>
            {linkTo ?
                <CardBody linkTo={linkTo} title={title} description={description} content={content}/> :
                <CardBody title={title} content={content} description={description}/>}
            {content && <CardActions disableSpacing>
                <TooltipedButton tooltip='Remove' onClick={() => onDocumentRemove(id)}>
                    <DeleteIcon color="secondary"/>
                </TooltipedButton>
                <TooltipedButton tooltip="Share" onClick={() => onDocumentShare(id)}>
                    <ShareIcon color="primary"/>
                </TooltipedButton>
            </CardActions>}
        </Card>
    );

}
