import React from "react";
import {Avatar, ButtonGroup, Toolbar} from "@material-ui/core";
import styles from "./styles";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ChromeReaderModeIcon from '@material-ui/icons/ChromeReaderMode';
import Tooltip from "@material-ui/core/Tooltip";
import ShareIcon from '@material-ui/icons/Share';
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";
import GetAppIcon from '@material-ui/icons/GetApp';
import Fab from "@material-ui/core/Fab";
import AddIcon from '@material-ui/icons/Add';
import DocumentEditor from "../../single/DocumentEditor/DocumentEditor";
import MainContainer from "../../containers/MainContainer/MainContainer";
import {TooltipedButton} from "../../single/TooltipedButton/TooltipedButton";
import {stubTree} from "../../containers/TreeDrawer/stub";
import {Edit} from "@material-ui/icons";

const Title = ({children, onTitleChanged}) =>
    <Box
        display={'flex'}
        alignSelf={'center'}
        flexGrow={1}>
        <Typography variant="h6">{children}</Typography>
        <TooltipedButton onClick={onTitleChanged} tooltip={"Edit title"} buttonStyle={{display: 'flex', width: 25, height: 25}}>
            <Edit style={{width: 15, height: 15}}/>
        </TooltipedButton>
    </Box>;

const Author = ({name, image}) =>
    <Box
        display={'flex'}
        flexDirection={'row'}
        alignItems={'center'}
        justifyContent={'center'}
    >
        <Avatar
            style={{width: 25, height: 25}}
            alt="Remy Sharp"
            src={image}/>
        <Typography style={{margin: '0 1em', fontSize: 'small'}}>{name}</Typography>
    </Box>;


export default class DocumentPage extends React.Component {

    state = {
        readOnly: false
    };

    handleReadOnlyMode = () => {
        const {readOnly} = this.state;
        this.setState({readOnly: !readOnly})
        console.log("Readonly: " + this.state.readOnly)
    }

    handleTitleChanged = (oldTitle) => {
        this.setState({title: 'aaa'})
    };

    render() {

        const {match} = this.props;
        const {title, readOnly} = this.state;
        console.log("Passing props", match);

        const document = stubTree.find((node) => node.id === match.params.id);
        console.log('Got doc: ' + document);

        const component = <MainContainer>
            <Box mb={'1em'} mt={'2em'}>
                <Toolbar variant="dense">
                    <Box display={'flex'} width={'100%'}>
                        <Title onTitleChanged={() => this.handleTitleChanged(title)}>{document.name}</Title>
                        <Author image={"https://lorempixel.com/25/25/"} name={document.author.displayName}/>
                        <Divider orientation="vertical" flexItem/>
                        <Box display={'flex'} ml={1}>
                            <Tooltip title={`Read only mode ${readOnly ? 'enabled' : 'disabled'}`}>
                                <ToggleButton
                                    style={{
                                        border: '1px solid transparent',
                                        borderRadius: '50%',
                                        padding: '.75em'
                                    }}
                                    color={'primary'}
                                    selected={readOnly}
                                    onChange={this.handleReadOnlyMode}
                                    value={'ro'}>
                                    <ChromeReaderModeIcon/>
                                </ToggleButton>
                            </Tooltip>
                            <TooltipedButton
                                buttonStyle={{padding: '.25em .5em'}}
                                tooltip={"Share"}>
                                <ShareIcon/>
                            </TooltipedButton>
                            <TooltipedButton
                                buttonStyle={{padding: '.25em .5em'}}
                                tooltip={"Download"}>
                                <GetAppIcon/>
                            </TooltipedButton>
                        </Box>
                    </Box>
                </Toolbar>
                <DocumentEditor readOnly={readOnly} content={document.content}/>
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
            </Box>
        </MainContainer>;


        return (<>{match.isExact && component}</>);
    }
}