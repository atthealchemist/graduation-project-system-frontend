import React from 'react';
import Tooltip from "@material-ui/core/Tooltip";
import {CardHeader, Typography, withStyles} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";


const LightTooltip = withStyles((theme) => ({
    arrow: {
        color: theme.palette.common.white,
    },
    tooltip: {
        backgroundColor: theme.palette.common.white,
        color: 'rgba(0, 0, 0, 0.87)',
        boxShadow: theme.shadows[1],
        fontSize: 11,
    },
}))(Tooltip);

export default class ContentPreviewTooltip extends React.Component {

    render() {

        const {children, title, description, content, placement} = this.props;

        const preview = <Card variant="outlined">
            <CardHeader style={{borderBottom: '1px solid #eee'}} title={title} subheader={description}/>
            <CardContent>
                <Typography paragraph>
                    {content}
                </Typography>
            </CardContent>
        </Card>;

        return (
            <LightTooltip
                arrow
                placement={placement}
                title={preview}
            >
                {children}
            </LightTooltip>
        );
    }

}