import {VerifiedUser} from "@material-ui/icons";
import {Box} from "@material-ui/core";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import React from "react";

export const AdminAccordion = ({title, icon = VerifiedUser, iconColor = 'inherit', children}) => {
    const IconComponent = icon;

    return (
        <Box style={{
            width: 1200,
            margin: 'auto',
            marginTop: '1em'
        }}>
            <Accordion>

                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                >
                    <FormControlLabel
                        control={<IconComponent style={{margin: '.25em', color: iconColor}}/>}
                        label={title}
                    />
                </AccordionSummary>
                <AccordionDetails>
                    {children}
                </AccordionDetails>
            </Accordion></Box>
    );
};