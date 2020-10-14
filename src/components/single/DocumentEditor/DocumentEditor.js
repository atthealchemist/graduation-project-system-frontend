import React, {useCallback, useEffect, useMemo, useState} from "react";
import {Editable, Slate, withReact} from "slate-react";
import {createEditor, Transforms} from "slate";
import Toolbar from "@material-ui/core/Toolbar";
import {
    Audiotrack,
    Code,
    FormatAlignCenter,
    FormatAlignJustify,
    FormatAlignLeft,
    FormatAlignRight,
    FormatBold,
    FormatItalic,
    FormatListBulleted,
    FormatListNumbered,
    FormatQuote,
    FormatStrikethrough,
    FormatUnderlined,
    InsertLink,
    Looks3,
    Looks4,
    Looks5,
    Looks6,
    LooksOne,
    LooksTwo,
    TableChart,
    VideoLibrary
} from "@material-ui/icons";
import Paper from "@material-ui/core/Paper";
import {withHistory} from "slate-history";
import Box from "@material-ui/core/Box";
import axios from "axios";
import {MarkButton, toggleMark} from "./components/MarkButton";
import {ActionButton} from "./components/ActionButton";
import {BlockButton} from "./components/BlockButton";
import ChoiceSelect from "../ChoiceSelect/ChoiceSelect";
import {ToolSection} from "./ToolSection";
import {AudioElement} from "./components/AudioElement";
import {VideoElement} from "./components/VideoElement";
import {convertFromHtmlToSlate, convertFromSlateToHtml} from "./utils";
import {ImageElement} from "./components/ImageElement";
import isHotkey from "is-hotkey";
import {HOTKEYS} from "./shortcuts";

const withHtml = editor => {
    const {insertData, isInline, isVoid} = editor

    editor.isInline = element => {
        return element.type === 'link' ? true : isInline(element)
    }

    editor.isVoid = element => {
        return element.type === 'image' ? true : isVoid(element)
    }

    editor.insertData = data => {
        const html = data.getData('text/html')

        if (html) {
            const fragment = convertFromHtmlToSlate(html);
            Transforms.insertFragment(editor, fragment)
            return;
        }

        insertData(data)
    }

    return editor
}

const Element = (props) => {

    const {attributes, children, element} = props;

    switch (element.type) {
        case 'blockquote':
            return <blockquote {...attributes}>{children}</blockquote>
        case 'bulleted-list':
            return <ul {...attributes}>{children}</ul>
        case 'heading-one':
            return <h1 {...attributes}>{children}</h1>
        case 'heading-two':
            return <h2 {...attributes}>{children}</h2>
        case 'heading-three':
            return <h3 {...attributes}>{children}</h3>
        case 'heading-four':
            return <h4 {...attributes}>{children}</h4>
        case 'heading-five':
            return <h5 {...attributes}>{children}</h5>
        case 'heading-six':
            return <h6 {...attributes}>{children}</h6>
        case 'list-item':
            return <li {...attributes}>{children}</li>
        case 'numbered-list':
            return <ol {...attributes}>{children}</ol>
        case 'img':
        case 'image':
            return <ImageElement {...props} />
        case 'video':
            return <VideoElement {...props} />
        case 'audio':
            return <AudioElement {...props} />
        default:
            return <p {...attributes}>{children}</p>
    }
};

const Leaf = ({attributes, children, leaf}) => {
    if (leaf.bold) {
        children = <strong>{children}</strong>
    }

    if (leaf.code) {
        children = <code>{children}</code>
    }

    if (leaf.italic) {
        children = <em>{children}</em>
    }

    if (leaf.underline) {
        children = <u>{children}</u>
    }

    if (leaf.strikethrough) {
        children = <s>{children}</s>
    }
    if (leaf.blockquote) {
        children = <blockquote>{children}</blockquote>
    }

    return <span {...attributes}>{children}</span>
};


export const DocumentEditor = (
    {
        document = {content: '<body> </body>'},
        documentFormat = 'html',
        readOnly,
        onContentChanged,
        onFormatChanged
    }
) => {

    const [value, setValue] = useState([]);
    const [format, setFormat] = useState(documentFormat);

    const componentDidMount = () => {
        let initialValue = [
            {
                children: [
                    {
                        text: ""
                    }
                ]
            }
        ];
        if(document.content){
            initialValue = convertFromHtmlToSlate(document.content);
        }
        setValue(initialValue);
    };

    useEffect(componentDidMount, [document])

    const editor = useMemo(() => withHtml(withHistory(withReact(createEditor()))), []);

    const renderElement = useCallback(props => <Element {...props} />, []);
    const renderLeaf = useCallback(props => <Leaf {...props} />, []);

    const handleContentChanged = (content) => {
        setValue(content);
        setTimeout(() => {
            const html = convertFromSlateToHtml(content);
            onContentChanged(html);
        }, 1000);

    };

    const handleContentFormatRetrieved = (result) => {
        // convert from html to slate format here
        const contentValue = convertFromHtmlToSlate(result);
        setValue(contentValue);
    };

    const handleContentFormatChanged = (newFormat) => {
        const content = value;

        console.log('src', content);
        axios.post('http://localhost:8000/converter/convert', {
            sourceFormat: format,
            targetFormat: newFormat,
            content: content
        })
            .catch(e => console.error(e))
            .then(res => res && handleContentFormatRetrieved(res.data.result));
        console.log("Updating new formatted content: ", content);
        // onFormatChanged(format, newFormat);
        setFormat(newFormat);
    };

    const onSubmit = (event) => {
        // do some awaiting stuff back to the server

        const point = {path: [0, 0], offset: 0};
        editor.selection = {anchor: point, focus: point};

        // For good measure, you can reset the history as well
        editor.history = {redos: [], undos: []};

        // Reset things back to their original (empty) state
        setValue(value);
    };

    const onKeyDown = (event) => {
        event.preventDefault();
        event.stopPropagation();
        onSubmit(event);
    };

    const onVideoSelected = (files) => {
        console.log("Video selected!", files);
    };

    const onAudioSelected = (files) => {
        console.log("Audio selected!", files);
    };

    return (
        <Paper style={{padding: '1em 2em', textAlign: 'initial', overflowY: 'hidden'}}>
            <Slate editor={editor} value={value} onChange={handleContentChanged}>
                <Toolbar style={{padding: '.5em', flexWrap: 'wrap'}}>
                    <ToolSection label={"Formatting"}>
                        <MarkButton format="bold" icon={FormatBold}/>
                        <MarkButton format="italic" icon={FormatItalic}/>
                        <MarkButton format="underline" icon={FormatUnderlined}/>
                        <MarkButton format="strikethrough" icon={FormatStrikethrough}/>
                        <MarkButton format="code" icon={Code}/>
                        <MarkButton format="block-quote" icon={FormatQuote}/>
                    </ToolSection>
                    <ToolSection label={"Alignment"}>
                        <MarkButton format="align-left" icon={FormatAlignLeft}/>
                        <MarkButton format="align-center" icon={FormatAlignCenter}/>
                        <MarkButton format="align-right" icon={FormatAlignRight}/>
                        <MarkButton format="align-justify" icon={FormatAlignJustify}/>
                    </ToolSection>
                    <ToolSection label={"Heading"}>
                        <BlockButton format="heading-one" icon={LooksOne}/>
                        <BlockButton format="heading-two" icon={LooksTwo}/>
                        <BlockButton format="heading-three" icon={Looks3}/>
                        <BlockButton format="heading-four" icon={Looks4}/>
                        <BlockButton format="heading-five" icon={Looks5}/>
                        <BlockButton format="heading-six" icon={Looks6}/>
                    </ToolSection>
                    <ToolSection label={"Lists"}>
                        <BlockButton format="numbered-list" icon={FormatListNumbered}/>
                        <BlockButton format="bulleted-list" icon={FormatListBulleted}/>
                    </ToolSection>
                    <ToolSection label={"Attachments"} divider={false}>
                        <ActionButton format="video" icon={VideoLibrary} onFileSelected={onVideoSelected}/>
                        <ActionButton format="audio" icon={Audiotrack} onFileSelected={onAudioSelected}/>
                        <ActionButton format="link" icon={InsertLink} onFileSelected={onAudioSelected}/>
                        <ActionButton format="table" icon={TableChart} onFileSelected={onAudioSelected}/>
                    </ToolSection>
                    <ToolSection label={"Content format"} divider={false}>
                        <Box margin={'.5em'} display={'flex'}>
                            <ChoiceSelect
                                value={format}
                                choices={[
                                    {value: 'html', label: 'HTML (default)'},
                                    {value: 'md', label: 'Markdown'},
                                    {value: 'rst', label: 'reStructuredText'},
                                ]}
                                onChoiceChanged={handleContentFormatChanged}/>
                        </Box>
                    </ToolSection>
                </Toolbar>
                <Editable
                    style={{height: '85vh', padding: '1em', border: '1px solid #eee', overflowY: 'auto'}}
                    renderElement={renderElement}
                    renderLeaf={renderLeaf}
                    placeholder="Enter some text"
                    readOnly={readOnly}
                    spellCheck
                    autoFocus
                    // onSubmit={e => onSubmit(e)}
                    onKeyDown={event => {
                        for (const hotkey in HOTKEYS) {
                            if (isHotkey(hotkey, event)) {
                                event.preventDefault()
                                const mark = HOTKEYS[hotkey]
                                toggleMark(editor, mark)
                            }
                        }
                    }}
                />
            </Slate>
        </Paper>
    );

};