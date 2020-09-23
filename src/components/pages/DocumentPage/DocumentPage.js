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

const Title = ({children}) =>
    <Box
        display={'flex'}
        alignSelf={'center'}
        flexGrow={1}>
        <Typography variant="h6">{children}</Typography>
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

const TooltipedButton = ({tooltip, buttonStyle, children}) => <Tooltip title={tooltip}>
    <IconButton color={'primary'}>{children}</IconButton>
</Tooltip>;

export default class DocumentPage extends React.Component {

    state = {
        readOnly: false
    };

    handleReadOnlyMode = () => {
        const {readOnly} = this.state;
        this.setState({readOnly: !readOnly})
        console.log("Readonly: " + this.state.readOnly)
        this.props.onReadOnlyModeEnabled(this.state.readOnly);
    }

    render() {

        const {children} = this.props;
        const {readOnly} = this.state;

        return (
            <Box mb={'1em'} mt={'2em'}>
                <Toolbar variant="dense">
                    <Box display={'flex'} width={'100%'}>
                        <Title>Hello</Title>
                        <Author image={"https://lorempixel.com/25/25/"} name={"Hanyuu"}/>
                        <Divider orientation="vertical" flexItem/>
                        <Box display={'flex'} ml={1}>
                            <Tooltip title="Read only mode">
                                <ToggleButton
                                    style={{border: '1px solid transparent', borderRadius: '50%', padding: '.75em'}}
                                    color={'primary'}
                                    selected={!readOnly}
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
                {children}
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
                        <AddIcon style={{width: 50, height: 50}} />
                    </Fab>
                </Tooltip>

            </Box>

        );
    }
}