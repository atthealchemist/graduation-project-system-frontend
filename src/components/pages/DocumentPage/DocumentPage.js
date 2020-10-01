import React, {useState} from "react";
import {Avatar, ButtonGroup, Toolbar} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ChromeReaderModeIcon from '@material-ui/icons/ChromeReaderMode';
import Tooltip from "@material-ui/core/Tooltip";
import ShareIcon from '@material-ui/icons/Share';
import Divider from "@material-ui/core/Divider";
import GetAppIcon from '@material-ui/icons/GetApp';
import DocumentEditor from "../../single/DocumentEditor/DocumentEditor";
import MainContainer from "../../containers/MainContainer/MainContainer";
import {TooltipedButton} from "../../single/TooltipedButton/TooltipedButton";
import {stubTree} from "../../containers/TreeDrawer/stub";
import {Edit} from "@material-ui/icons";
import AddIcon from "@material-ui/icons/Add";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import Fab from "@material-ui/core/Fab";
import {Link} from "react-router-dom";
import {findInTree} from "../../../utils/utils";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import axios from 'axios';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import AudiotrackIcon from '@material-ui/icons/Audiotrack';
import NewDocumentEditor from "../../single/DocumentEditor/NewDocumentEditor";

const Title = ({children, onTitleChanged}) =>
    <Box
        display={'flex'}
        alignSelf={'center'}
        flexGrow={1}>
        <Typography variant="h6">{children}</Typography>
        <TooltipedButton onClick={onTitleChanged} tooltip={"Edit title"}
                         buttonStyle={{display: 'flex', width: 25, height: 25}}>
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


const FormatSelect = ({onFormatChanged, label}) => {

    const [format, setFormat] = useState('html');

    return (
        <FormControl variant="outlined">
            <InputLabel>{label}</InputLabel>
            <Select
                value={format}
                onChange={(event) => {
                    setFormat(event.target.value);
                    onFormatChanged(event.target.value);
                }}
                label={label}>
                <MenuItem value={'html'}>HTML (default)</MenuItem>
                <MenuItem value={'rst'}>ReStructuredText (rst)</MenuItem>
                <MenuItem value={'md'}>Markdown (md)</MenuItem>
            </Select>
        </FormControl>
    );
};

const UploadButton = ({id, tooltip, inputAccept, icon, onClick, onFileSelected}) => <>
    <input style={{display: 'none'}} accept={inputAccept} id={id} type="file"
           onChange={(event) => onFileSelected(event.target.files)}/>
    <label htmlFor={id}>
        <TooltipedButton tooltip={tooltip} color={'inherit'}>
            {icon}
        </TooltipedButton>
    </label>
</>;


export default class DocumentPage extends React.Component {

    state = {
        readOnly: false,
        openSnackbar: false,
        content: '',
        contentFormat: 'html'
    };

    content = '';

    handleSnackbarClosed = (event, reason) => {
        if (reason) {
            return;
        }

        this.setState({openSnackbar: false});
    };

    handleReadOnlyMode = () => {
        const {readOnly} = this.state;
        this.setState({readOnly: !readOnly})
        console.log("Readonly: " + this.state.readOnly)
    }

    handleTitleChanged = (oldTitle) => {
        this.setState({title: 'aaa'})
    };

    handleContentChanged = (content) => {
        setTimeout(() => {
            console.log("Content changed!", content);
            if (content) {
                this.setState({openSnackbar: true, content: content});
            }
        }, 3000);
    };

    handleContentFormatChanged = (format) => {
        const {content, contentFormat} = this.state;

        console.log('src', content);
        const self = this;
        axios.post('http://localhost:8000/converter/convert', {
            sourceFormat: contentFormat,
            targetFormat: format,
            content: content
        }).then(res => {
            self.content = res.data.result;
        });
        console.log("Updating new formatted content: ", this.content);
    };

    render() {

        const {match} = this.props;
        const {title, readOnly, openSnackbar, content, contentFormat} = this.state;
        console.log("Passing props", match);

        let document = findInTree(stubTree, match.params.id);
        console.log('Got doc: ' + document);
        if (match.params.id === 'new') {
            document = {
                id: '',
                name: 'New document',
                author: {
                    displayName: "Hanyuu",
                    avatar: "http://lorempixel.com/200/200/"
                },
                createdAt: `${new Date()}`,
                content: ''
            };
        }
        // this.updateContent(document.content);

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
                <Toolbar variant={"dense"} style={{borderTop: '1px solid #eee'}}>
                    <Box margin={'.5em'} display={'flex'} width={'100%'}>
                        <UploadButton
                            id={'video-upload'}
                            tooltip={"Upload video file"}
                            inputAccept={'video/*'}
                            icon={<VideoLibraryIcon color={'inherit'}/>}
                            iconColor={'inherit'}
                            onFileSelected={(files) => console.log('Video selected: ', files)}/>
                        <UploadButton
                            id={'audio-upload'}
                            tooltip={"Upload audio file"}
                            inputAccept={'audio/*'}
                            icon={<AudiotrackIcon color={'inherit'}/>}
                            iconColor={'inherit'}
                            onFileSelected={(files) => console.log('Audio selected: ', files)}/>

                    </Box>
                    <Box margin={'.5em'} display={'flex'}>
                        <FormatSelect label={"Content format"} onFormatChanged={this.handleContentFormatChanged}/>
                    </Box>
                </Toolbar>
                {/*<DocumentEditor readOnly={readOnly}*/}
                {/*                content={content ? content : document.content}*/}
                {/*                onContentChanged={this.handleContentChanged}/>*/}
                <NewDocumentEditor />
                <Snackbar open={openSnackbar} autoHideDuration={1500}
                          onClose={() => this.setState({openSnackbar: false})}>
                    <Alert severity="success">
                        Saved document!
                    </Alert>
                </Snackbar>
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
        </MainContainer>;


        return (<>{match.isExact && component}</>);
    }
}