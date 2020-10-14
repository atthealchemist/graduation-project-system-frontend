import React, {useEffect, useState} from "react";
import Box from "@material-ui/core/Box";
import Tooltip from "@material-ui/core/Tooltip";
import MainContainer from "../../containers/MainContainer/MainContainer";
import {stubTree} from "../../containers/TreeDrawer/stub";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import {Link, useParams, useRouteMatch} from "react-router-dom";
import {findInTree} from "../../../utils/utils";
import {DocumentEditor} from "../../single/DocumentEditor/DocumentEditor";
import PublishDialog from "../../single/PublishDialog/PublishDialog";
import DocumentChangeDrawer from "../../containers/DocumentChangeDrawer/DocumentChangeDrawer";
import {DocumentToolbar} from "./DocumentToolbar";
import {Snack} from "./Snack";
import {getDocumentById} from "../../single/DocumentEditor/utils";

const DocumentPage = () => {
    const {id: documentId} = useParams();
    const {isExact} = useRouteMatch();

    const [readOnly, setReadOnly] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarType, setSnackbarType] = useState('success');
    const [published, setPublished] = useState(false);
    const [historyOpened, setHistoryOpened] = useState(false);
    const [snackbarText, setSnackbarText] = useState('');
    const [document, setDocument] = useState('');


    const componentDidMount = () => {
        if(!document){
            setupDocument(getDocumentById(stubTree, documentId));
        }
    };

    useEffect(componentDidMount);


    const handleHistoryOpened = () => {
        setHistoryOpened(!historyOpened);
        console.log("history opened", historyOpened)
    };


    const handleReadOnlyMode = () => {
        setReadOnly(!readOnly);
        console.log("Readonly: ", readOnly);
    }

    const handleContentChanged = (content) => {
        setTimeout(() => {
            console.log("Content changed!", content);
            if (content) {
                // setContent(content);
                showSnackbar("Saved document!");
            }
        }, 3000);
    };

    const handleDocumentPublish = () => {
        setPublished(true);
    };

    const handleDocumentPublished = () => {
        setPublished(!published);
        showSnackbar("Published document!")
    };

    const handleTitleChanged = (title) => {
        // Here we're should update title on backend
    };

    const handleHistoryChangeHovered = (change) => {
        console.log('change hovered', change.documentUuid);
    };

    const setupDocument = (doc) => {
        setDocument(doc);
    };

    const showSnackbar = (text, type = 'success') => {
        setOpenSnackbar(true);
        setSnackbarText(text);
        setSnackbarType(type);
    };

    let stubChanges = [
        {
            documentUuid: "1",
            timestamp: new Date().getMilliseconds(),
            contentBefore: "",
            contentAfter: ""
        },
        {
            documentUuid: "2",
            timestamp: new Date().getMilliseconds(),
            contentBefore: "",
            contentAfter: ""
        },
    ];


    const component = <MainContainer>
        <Box mb={'1em'} mt={'2em'}>
            <DocumentToolbar
                document={document}
                readOnly={readOnly}
                onHistoryOpened={handleHistoryOpened}
                onTitleChanged={handleTitleChanged}
                onChange={handleReadOnlyMode}
                onDocumentPublish={handleDocumentPublish}/>
            <DocumentChangeDrawer
                open={historyOpened}
                changes={stubChanges}
                onChangeHovered={handleHistoryChangeHovered}
            />
            <DocumentEditor
                document={document}
                readOnly={readOnly}
                onContentChanged={handleContentChanged}
            />
            <Snack open={openSnackbar} type={snackbarType} text={snackbarText}/>
            <Link to={'/documents/new'}>
                <Tooltip title={"Add another new document"}>
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
            </Link>
        </Box>
        {published &&
        <PublishDialog show={published} document={document} onDocumentPublished={handleDocumentPublished}/>}

    </MainContainer>;


    return <>
        {isExact && component}
    </>;
}
export default DocumentPage;
