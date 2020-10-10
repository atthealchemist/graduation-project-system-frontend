import React from "react";
import {Box, Card, CardHeader} from "@material-ui/core";
import {Assessment, BugReport, DeleteForever, OpenWith, PersonAddDisabled} from "@material-ui/icons";
import {Migrator} from "./Migrator";
import {AdminAccordion} from "./AdminAccordion";
import {AdminSection} from "./AdminSection";


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