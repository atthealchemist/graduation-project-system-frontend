import React, {useEffect, useState} from "react";
import {Container, Grid, Typography} from "@material-ui/core";

import {stubTree} from '../../containers/TreeDrawer/stub';
import {useParams} from "react-router-dom";
import {DocumentItem} from "../../items/DocumentItem/DocumentItem";
import {countChildren, findInTree} from "../../../utils/utils";
import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import {DashboardBreadcrumbs} from "./DashboardBreadcrumbs";
import {DashboardHeader} from "./DashboardHeader";
import DashboardFooter from "./DashboardFooter";
import {getCurrentUser} from "../../../api/user";


const DashboardPlaceholder = () => <Typography variant={"h3"}>No documents. Hover on blue round button to add new
    one!</Typography>


const DashboardPage = () => {

    const [user, setUser] = useState({});
    const [documents, setDocuments] = useState([]);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [route, setRoute] = useState([{path: '/', name: 'Dashboard'}]);
    const routeParams = useParams();


    const componentDidMount = () => {
        fetchCurrentUser();
    };

    const fetchCurrentUser = () => {
        const currentUser = JSON.parse(localStorage.getItem('token_user'));
        setUser((prevUser) => JSON.stringify(prevUser) !== JSON.stringify(currentUser) ? currentUser : prevUser);
    };

    useEffect(componentDidMount);

    const handleLinkNavigated = (node) => {
        const newRoute = [...route, {path: `/folders/${node.id}`, name: node.name}];
        setRoute(newRoute);

        setDocuments(node.children);
    };

    const renderNode = (node, idx) => {
        const folderItem = <DocumentItem
            id={node.id}
            width={260}
            title={node.name}
            linkTo={`/folders/${node.id}`}
            linkClicked={() => handleLinkNavigated(node)}
            description={node.createdAt}
            content={node.content}
            author={node.author}
            onDocumentRemove={handleDocumentRemove}
            onDocumentShare={handleDocumentShare}
        />;

        const linkedDocItem = <DocumentItem
            id={node.id}
            width={260}
            title={node.name}
            linkTo={`/documents/${node.id}`}
            description={node.createdAt}
            content={node.content}
            author={node.author}
            onDocumentRemove={handleDocumentRemove}
            onDocumentShare={handleDocumentShare}
        />;

        return <Grid key={idx} item xs>
            <Grid item xs>
                {node.content ? linkedDocItem : folderItem}
            </Grid>
            {/*{node.children.map((child, idx) => child.content ?*/}
            {/*    <Grid key={idx} item xs>*/}
            {/*        {renderNode(child, idx)}*/}
            {/*    </Grid>*/}
            {/*    : child.children.map((n, i) => <Grid key={i} item xs>*/}
            {/*        {renderNode(n, i)}*/}
            {/*    </Grid>))}*/}
        </Grid>;
    };

    const fetchDocs = () => {
        const id = routeParams.id;
        if (id && id.length > 1) {
            console.log('id', id);
            const item = findInTree(stubTree, id);
            console.log('item', item);
            if (item.children) {
                setDocuments(item.children);
            }
        } else {
            setDocuments(stubTree);
        }
    };

    const handleDocumentRemove = (docId) => {
        console.log("Removed doc: ", docId);
    };

    const handleDocumentShare = (docId) => {
        console.log("Shared doc: ", docId);
        const docUrl = `${window.location.protocol}//${window.location.hostname}:${window.location.port}/documents/${docId}`;
        navigator.clipboard.writeText(docUrl).then(r => console.log("Copied to clipboard", docUrl));
        setOpenSnackbar(true);
    };

    const {documents: docs = []} = user;
    const docsCount = countChildren(docs);

    return (<Container style={{marginTop: '5em'}}>
        <DashboardHeader docsCount={docsCount} username={user.display_name}/>
        {docsCount > 0 && <>
            <DashboardBreadcrumbs routes={route}/>
            <Grid container spacing={3}>
                {docs.map((doc, idx) => renderNode(doc, idx))}
            </Grid>
        </>}
        {docsCount < 1 && <DashboardPlaceholder/>}
        <Snackbar open={openSnackbar} autoHideDuration={1500}
                  onClose={() => setOpenSnackbar(false)}>
            <Alert severity="success">
                Copied to clipboard!
            </Alert>
        </Snackbar>
        <DashboardFooter />

    </Container>);

}

export default DashboardPage;