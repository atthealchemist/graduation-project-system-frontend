import React, {useState} from "react";
import {Avatar, CardContent, CardHeader, Typography} from "@material-ui/core";
import {Link} from "react-router-dom";
import {TooltipedButton} from "../../single/TooltipedButton/TooltipedButton";
import {Description, ExpandLess, ExpandMore, FolderOpen} from "@material-ui/icons";
import styles from "../../pages/DashboardPage/styles";
import Collapse from "@material-ui/core/Collapse";
import convert from "htmr";

export const DocumentBody = ({title, content, description, linkTo, linkClicked}) => {

    const [expanded, setExpanded] = useState(false);

    return (<><CardHeader
        style={{borderBottom: '1px solid #eee'}}
        title={
            linkTo ? <Link onClick={linkClicked} to={linkTo}
                           style={{color: 'inherit', textDecoration: 'none'}}>{title}</Link> : title
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