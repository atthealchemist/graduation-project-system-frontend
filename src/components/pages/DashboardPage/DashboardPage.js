import React from "react";
import {Box, Container, Grid, Typography} from "@material-ui/core";

import {stubTree} from '../../containers/TreeDrawer/stub';
import {Link} from "react-router-dom";
import {DocumentItem} from "../../items/DocumentItem/DocumentItem";


export default class DashboardPage extends React.Component {

    state = {
        documents: []
    };

    componentDidMount() {
        this.fetchDocs();
    }

    renderNode = (node, idx) =>
            <Grid key={idx} item xs>
                <Link key={idx} style={{textDecoration: 'none'}} to={`/documents/${node.id}`}>
                    <DocumentItem
                        id={node.id}
                        title={node.name}
                        description={node.createdAt}
                        content={node.content}
                        author={node.author}
                        onDocumentRemove={this.onDocumentRemove}
                        onDocumentShare={this.onDocumentShare}
                    />
                    {node.children.map((child, idx) => child.content && this.renderNode(child, idx))}
                </Link>
            </Grid>;

    fetchDocs = () => {
        this.setState({documents: stubTree});
    };

    onDocumentRemove(docId) {
        console.log("Removed doc: " + docId)
    };

    onDocumentShare(docId) {
        console.log("Shared doc: " + docId)
    };

    render() {
        const {documents} = this.state;
        const {match} = this.props;

        const docCount = 456;
        return <Container style={{marginTop: '6em'}}>
            <Box mb={5}>
                <Typography style={{fontWeight: 600}} variant={'h2'} gutterBottom>Hanyuu's space [{match.params.id}]</Typography>
                <Typography variant={'h4'} gutterBottom>{docCount} documents</Typography>
            </Box>
            <Grid container spacing={3}>
                {documents.map((doc, idx) => this.renderNode(doc, idx))}
            </Grid>
        </Container>;
    }
}