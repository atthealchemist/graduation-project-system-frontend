import React, {Component} from 'react';

import MUIEditor, {MUIEditorState} from "react-mui-draft-wysiwyg";
import {convertToRaw} from 'draft-js';
import options from "./options";


export default class DocumentEditor extends Component {

    state = {
        editorState: MUIEditorState.createEmpty(options),
        config: options
    };

    onEditorStateChange = (editorState) => {
        this.setState({editorState});

        // const rawContent = convertToRaw(editorState.getCurrentContent());
        // Here you can send the rawContent object to a server or whatever you want

        // console.log('Saved: ' + rawContent);
    };

    render() {
        const {editorState} = this.state;
        let {config} = this.state;
        const {readOnly} = this.props;
        config.draftEditor.readOnly = readOnly;
        return (
            <MUIEditor
                style={{maxHeight: '100%', overflow: 'auto'}}
                config={config}
                editorState={editorState}
                onChange={this.onEditorStateChange}
            />
        )
    }
}
