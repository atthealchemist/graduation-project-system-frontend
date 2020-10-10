import {Box, Typography} from "@material-ui/core";
import Moment from "react-moment";
import React from "react";

export const FormattedDateLabel = ({
                                       date,
                                       caption,
                                       parseFormat = "YYYY-MM-DD HH:mm",
                                       displayFormat = "DD.MM.YYYY HH:mm"
                                   }) => <Box display={'flex'} flexDirection={'row'}>
    <Typography style={{marginRight: '.25em'}}>{caption}: </Typography>
    <Moment format={displayFormat} parse={parseFormat}>
        {date}
    </Moment>
</Box>;