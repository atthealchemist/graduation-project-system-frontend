import React from "react";
import {Box, Container, Divider, Grid, Typography} from "@material-ui/core";

import {stubTree} from '../../containers/TreeDrawer/stub';
import {Link} from "react-router-dom";
import {DocumentItem} from "../../items/DocumentItem/DocumentItem";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Tooltip from "@material-ui/core/Tooltip";
import {countChildren} from "../../../utils/utils";
import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";


const DashboardHeader = ({username, docsCount}) => <Box mb={5}>
    <Typography style={{fontWeight: 600}} variant={'h2'} gutterBottom>{username}'s space</Typography>
    <Typography variant={'h4'} gutterBottom>{docsCount} documents</Typography>
    <Divider/>
</Box>;

const DashboardFooter = () => <Link to={'/documents/new'}>

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

export default class DashboardPage extends React.Component {

    state = {
        documents: [],
        openSnackbar: false
    };

    componentDidMount() {
        this.fetchDocs();
    }

    renderNode = (node, idx) => {
        const docItem = <DocumentItem
            id={node.id}
            width={260}
            title={node.name}
            description={node.createdAt}
            content={node.content}
            author={node.author}
            onDocumentRemove={this.handleDocumentRemove}
            onDocumentShare={this.handleDocumentShare}
        />;

        const linkedDocItem = <DocumentItem
            id={node.id}
            width={260}
            title={node.name}
            linkTo={`/documents/${node.id}`}
            description={node.createdAt}
            content={node.content}
            author={node.author}
            onDocumentRemove={this.handleDocumentRemove}
            onDocumentShare={this.handleDocumentShare}
        />;

        return <Grid key={idx} item xs>
            <Grid item xs>
                {node.content ? linkedDocItem : docItem}
            </Grid>
            {node.children.map((child, idx) => child.content ?
                <Grid key={idx} item xs>{this.renderNode(child, idx)}</Grid>
                : child.children.map((n, i) => <Grid key={i} item xs>{this.renderNode(n, i)}</Grid>))}
        </Grid>;
    };

    fetchDocs = () => {
        this.setState({documents: stubTree});
    };

    handleDocumentRemove = (docId) => {
        console.log("Removed doc: ", docId);
    };

    handleDocumentShare = (docId) => {
        console.log("Shared doc: ", docId);
        const docUrl = `${window.location.protocol}//${window.location.hostname}:${window.location.port}/documents/${docId}`;
        navigator.clipboard.writeText(docUrl).then(r => console.log("Copied to clipboard", docUrl));
        this.setState({openSnackbar: true})
    };

    render() {
        const {documents, openSnackbar} = this.state;
        const docsCount = countChildren(documents);
        return <Container style={{marginTop: '5em'}}>
            <DashboardHeader docsCount={docsCount} username={'Hanyuu'}/>
            <Grid container spacing={3}>
                {documents.map((doc, idx) => this.renderNode(doc, idx))}
            </Grid>
            <Snackbar open={openSnackbar} autoHideDuration={1500}
                      onClose={() => this.setState({openSnackbar: false})}>
                <Alert severity="success">
                    Copied to clipboard!
                </Alert>
            </Snackbar>
            <DashboardFooter/>

        </Container>;
    }
}