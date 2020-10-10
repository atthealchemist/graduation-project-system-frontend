import {Link} from "react-router-dom";
import Tooltip from "@material-ui/core/Tooltip";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import React from "react";

export const DashboardFooter = () => <Link to={'/documents/new'}>

    <Tooltip title={"Add new document"}>
        <Fab style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            margin: '4em',
            width: 75,
            height: 75
        }}
             color="primary" aria-label="add">
            <AddIcon style={{width: 50, height: 50}}/>
        </Fab>
    </Tooltip>
</Link>;