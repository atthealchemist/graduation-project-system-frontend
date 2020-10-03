import React from "react";
import {Box, Card, CardContent, CardHeader, Typography} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import {
    Assessment, BugReport,
    DeleteForever,
    OpenWith,
    OpenWithRounded,
    PersonAddDisabled,
    VerifiedUser
} from "@material-ui/icons";


const Migrator = ({title, onMigrateClick}) => {

    return (<Box style={{
        display: 'flex',
        width: '100%',
        flexDirection: 'column',
        alignContent: 'space-between',
        padding: '.5em'
    }}>

        <form style={{display: 'flex', flexDirection: 'column', gap: '1em'}}>
            <TextField label={`Url to ${title} instance`} type={'url'} variant="outlined"/>
            <TextField label={`${title} login`} variant="outlined"/>
            <TextField label={`${title} password`} type={'password'} variant="outlined"/>
            <Button onClick={onMigrateClick} style={{width: 'auto', margin: '0 auto'}} color={'inherit'}>Migrate data from {title}</Button>
        </form>
    </Box>);
};

const AdminAccordion = ({title, icon = VerifiedUser, iconColor = 'inherit', children}) => {
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
                        control={<IconComponent style={{margin: '.25em', color: iconColor}} />}
                        label={title}
                    />
                </AccordionSummary>
                <AccordionDetails>
                    {children}
                </AccordionDetails>
            </Accordion></Box>
    );
};

const AdminSection = ({title, children}) =>
    <Box style={{
        width: 1200,
        margin: '1em auto'
    }}>
        <Typography style={{ textAlign: 'left'}} variant={"h5"}>{title}</Typography>
        {children}
    </Box>;


const AdminPage = () => {
    return <Box mt={'6em'}>
        <Card
            style={{
                width: 1200,
                margin: 'auto',
                backgroundColor: 'transparent',
                boxShadow: 'none'
            }}>
            <CardHeader
                title={"Admin page"}
                subheader={"One place to rule'em all!"}/>
        </Card>

        <AdminSection title={"Migrators"}>
            <AdminAccordion title={"Confluence"} icon={OpenWith} iconColor={'#03a9f4'}>
                <Migrator title={"Confluence"}/>
            </AdminAccordion>
        </AdminSection>

        <AdminSection title={"Remove actions"}>
            <AdminAccordion title={"Remove users"} icon={PersonAddDisabled} iconColor={'#f44336'}>
                Remove users
            </AdminAccordion>

            <AdminAccordion title={"Remove documents"} icon={DeleteForever} iconColor={'#f44336'}>
                Remove documents
            </AdminAccordion>
        </AdminSection>

        <AdminSection title={"System reports"}>
            <AdminAccordion title={"Usage"} icon={Assessment} iconColor={'#03a9f4'}>
                System usage
            </AdminAccordion>
            <AdminAccordion title={"Logs"} icon={BugReport} iconColor={'#4caf50'}>
                Logs
            </AdminAccordion>
        </AdminSection>

    </Box>;
};

export default AdminPage