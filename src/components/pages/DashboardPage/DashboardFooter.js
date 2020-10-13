import {Link, useHistory} from "react-router-dom";

import Tooltip from "@material-ui/core/Tooltip";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import React, {useState} from "react";
import Box from "@material-ui/core/Box";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import {DropzoneDialog} from "material-ui-dropzone";
import PublishIcon from '@material-ui/icons/Publish';
import CreateIcon from '@material-ui/icons/Create';

const DashboardFab = () => {

    const history = useHistory();

    const [open, setOpen] = useState(false);
    const [openImportDialog, setOpenImportDialog] = useState(false);


    const handleDocumentNew = () => {
        history.push('/documents/new');
    };

    const handleDocumentImport = () => setOpenImportDialog(true);

    const handleDocumentImportSave = (files) => {
        setOpenImportDialog(false);
        console.log('Files', files);
    };

    const actions = [
        {icon: <CreateIcon/>, color: 'lightblue', name: 'New document', action: handleDocumentNew},
        {icon: <PublishIcon/>, color: 'lightgreen', name: 'Import document from file', action: handleDocumentImport},
    ];

    const handleClose = () => setOpen(false);
    const handleOpen = () => setOpen(true);


    return (
        <Box>
            <SpeedDial
                ariaLabel="SpeedDial tooltip example"
                style={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    margin: '6em'
                }}
                open={open}
                icon={<SpeedDialIcon/>}
                onClose={handleClose}
                onOpen={handleOpen}>
                {actions.map(action => <SpeedDialAction
                    FabProps={{style: {backgroundColor: action.color, margin: '1.5em'}}}
                    title={''}
                    key={action.name}
                    icon={action.icon}
                    tooltipTitle={action.name}
                    tooltipOpen
                    onClick={action.action}
                />)}
            </SpeedDial>
            <DropzoneDialog
                dialogTitle={"Importing documents"}
                acceptedFiles={
                    [
                        'application/msword',
                        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                        'text/markdown',
                        'text/x-rst'
                    ]
                }
                cancelButtonText={"Cancel"}
                submitButtonText={"Import"}
                maxFileSize={5000000}
                open={openImportDialog}
                onClose={() => setOpenImportDialog(false)}
                onSave={handleDocumentImportSave}
                showPreviews={true}
                showFileNamesInPreview={true}
            />
        </Box>
    );

};

const DashboardFooter = () => <DashboardFab
    style={{
        position: 'absolute',
        bottom: 0,
        right: 0,
        margin: '4em',
        width: 75,
        height: 75
    }}
    color="primary" aria-label="add"/>;
export default DashboardFooter;