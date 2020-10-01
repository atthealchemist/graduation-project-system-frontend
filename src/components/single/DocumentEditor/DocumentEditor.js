import React, {Component} from 'react';

import MUIEditor, {MUIEditorState as EditorState} from "react-mui-draft-wysiwyg";
import options from "./options";
import {CompositeDecorator} from 'draft-js';
import {stateFromHTML} from "draft-js-import-html";
import {stateToHTML} from "draft-js-export-html";


const EditorLink = (props) => {
    const {url} = props.contentState.getEntity(props.entityKey).getData();
    return (
        <a href={url}>
            {props.children}
        </a>
    );
};


const EditorImage = (props) => {
    const {
        height,
        src,
        width,
        alt
    } = props.contentState.getEntity(props.entityKey).getData();

    return (
        <img src={src} height={height} width={width} alt={alt}/>
    );
};

const EditorAudio = (props) => {
    const {controls, src} = props.contentState.getEntity(props.entityKey).getData();
    return <audio controls={controls} src={src}>
        Your browser does not support the <code>audio</code> element.
    </audio>
};

const EditorVideo = (props) => {
    const {width, height, controls, src, type} = props.contentState.getEntity(props.entityKey).getData();
    return <video width={width} height={height} controls={controls}>
        <source src={src} type={type}/>
        Your browser doesn't support HTML5 video tag.
    </video>
};


export default class DocumentEditor extends Component {

    state = {
        editorState: EditorState.createEmpty(options),
        config: options
    };

    componentDidMount() {
        const {content} = this.props;
        this.setState({editorState: EditorState.createEmpty(options)});
        if (content) {
            console.log("Pasting content: ", content);
            this.setContent(content);
        }
    }

    findEntityRanges = (contentBlock, callback, contentState, entityType) => {
        contentBlock.findEntityRanges(
            (character) => {
                const entityKey = character.getEntity();
                return (
                    entityKey && contentState.getEntity(entityKey).getType() === entityType
                );
            },
            callback
        );
    }

    findImageEntities = (contentBlock, callback, contentState) =>
        this.findEntityRanges(contentBlock, callback, contentState, 'IMAGE');

    findLinkEntities = (contentBlock, callback, contentState) =>
        this.findEntityRanges(contentBlock, callback, contentState, 'LINK');

    findAudioEntities = (contentBlock, callback, contentState) =>
        this.findEntityRanges(contentBlock, callback, contentState, 'AUDIO');

    findVideoEntities = (contentBlock, callback, contentState) =>
        this.findEntityRanges(contentBlock, callback, contentState, 'VIDEO');


    setContent(content) {
        const contentState = stateFromHTML(content);

        const decorator = new CompositeDecorator([
            {
                strategy: this.findLinkEntities,
                component: EditorLink,
            },
            {
                strategy: this.findImageEntities,
                component: EditorImage,
            },
            {
                strategy: this.findAudioEntities,
                component: EditorAudio,
            },
            {
                strategy: this.findVideoEntities,
                component: EditorVideo,
            },
        ]);


        this.setState({
            editorState: EditorState.createWithContent(this.state.config, contentState),
        });
        console.log("Setup content")
    }

    onEditorStateChange = (editorState) => {
        this.setState({editorState});

        this.props.onContentChanged(stateToHTML(editorState.getCurrentContent()));

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
                plugins={[]}
            />
        )
    }
}
