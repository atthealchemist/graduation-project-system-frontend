import React, {useCallback, useMemo, useState} from "react";
import {Editable, ReactEditor, Slate, useSlate, withReact} from "slate-react";
import {createEditor, Editor, Transforms} from "slate";
import {TooltipedButton, TooltipedToggleButton} from "../TooltipedButton/TooltipedButton";
import Toolbar from "@material-ui/core/Toolbar";
import {
    Audiotrack,
    Code, FormatAlignCenter, FormatAlignJustify, FormatAlignLeft, FormatAlignRight,
    FormatBold,
    FormatItalic, FormatListBulleted, FormatListNumbered, FormatQuote, FormatStrikethrough,
    FormatUnderlined, InsertLink,
    Looks3,
    Looks4,
    Looks5, Looks6,
    LooksOne,
    LooksTwo, TableChart, VideoLibrary
} from "@material-ui/icons";
import {ToggleButton} from "@material-ui/lab";
import Paper from "@material-ui/core/Paper";
import {withHistory} from "slate-history";
import Box from "@material-ui/core/Box";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import axios from "axios";
import {generateRandomString} from "../../../utils/utils";
import {Divider} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";

const LIST_TYPES = ['numbered-list', 'bulleted-list'];

const isMarkActive = (editor, format) => {
    const marks = Editor.marks(editor);
    return marks ? marks[format] === true : false;
};

const toggleMark = (editor, format) => {
    const isActive = isMarkActive(editor, format);
    if (isActive) {
        Editor.removeMark(editor, format)
    } else {
        Editor.addMark(editor, format, true);
    }
};

const isBlockActive = (editor, format) => {
    const [match] = Editor.nodes(editor, {
        match: n => n.type === format
    })

    return !!match;
};

const insertAttachment = (editor, attachment) => {
    Editor.insertFragment(editor, attachment);
};

const toggleBlock = (editor, format) => {
    const isActive = isBlockActive(editor, format);
    const isList = LIST_TYPES.includes(format);

    Transforms.unwrapNodes(editor, {
        match: n => LIST_TYPES.includes(n.type),
        split: true
    });

    Transforms.setNodes(editor, {
        type: isActive ? 'paragraph' : (isList ? 'list-item' : format),
    });

    if (!isActive && isList) {
        const block = {
            type: format,
            children: []
        }
        Transforms.wrapNodes(editor, block);
    }

};

const MarkButton = ({format, icon}) => {
    const editor = useSlate();
    const IconComponent = icon;
    return (
        <TooltipedButton tooltip={format} onClick={event => {
            event.preventDefault();
            toggleMark(editor, format);
        }}>
            <IconComponent/>
        </TooltipedButton>
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

const ActionButton = ({format, icon, onFileSelected}) => {
    const editor = useSlate();
    const IconComponent = icon;
    const id = `format-${format}-${generateRandomString()}`
    return (
        <>
            <input style={{display: 'none'}} accept={`${format}/*`} id={id} type="file"
                   onChange={(event) => onFileSelected(event.target.files)}/>
            <label htmlFor={id}>
                <TooltipedButton onClick={() => {
                    insertAttachment(editor, format);
                }} tooltip={format}>
                    <IconComponent/>
                </TooltipedButton>
            </label>
        </>
    );
};

const UrlInput = ({url, onChange}) => {
    const [value, setValue] = React.useState(url)
    return (
        <input
            value={value}
            onClick={e => e.stopPropagation()}
            style={{
                marginTop: '5px',
                boxSizing: 'border-box',
            }}
            onChange={e => {
                const newUrl = e.target.value
                setValue(newUrl)
                onChange(newUrl)
            }}
        />
    )
}

const AudioElement = ({attributes, children, element}) => {

    const editor = useSlate();
    const {url} = element;

    return (
        <div {...attributes}>
            <div contentEditable={false}>
                <div
                    style={{
                        padding: '75% 0 0 0',
                        position: 'relative',
                    }}
                >
                    <audio controls src={`${url}`}>
                        Your browser does not support the <code>audio</code> element
                    </audio>
                </div>
                <UrlInput
                    url={url}
                    onChange={val => {
                        const path = ReactEditor.findPath(editor, element)
                        Transforms.setNodes(editor, {url: val}, {at: path})
                    }}
                />
            </div>
        </div>
    );
}

const VideoElement = ({attributes, children, element}) => {
    const editor = useSlate()
    const {url} = element
    return (
        <div {...attributes}>
            <div contentEditable={false}>
                <div
                    style={{
                        padding: '75% 0 0 0',
                        position: 'relative',
                    }}
                >
                    <iframe
                        src={`${url}?title=0&byline=0&portrait=0`}
                        frameBorder="0"
                        style={{
                            position: 'absolute',
                            top: '0',
                            left: '0',
                            width: '100%',
                            height: '100%',
                        }}
                    />
                </div>
                <UrlInput
                    url={url}
                    onChange={val => {
                        const path = ReactEditor.findPath(editor, element)
                        Transforms.setNodes(editor, {url: val}, {at: path})
                    }}
                />
            </div>
            {children}
        </div>
    )
}

const BlockButton = ({format, icon}) => {
    const editor = useSlate();
    const IconComponent = icon;
    return (
        <TooltipedToggleButton
            tooltip={format}
            color={'primary'}
            buttonStyle={{border: '1px solid transparent', borderRadius: '50%'}}
            isActive={isBlockActive(editor, format)}
            performAction={() => toggleBlock(editor, format)}
        >
            <IconComponent />
        </TooltipedToggleButton>
    );
};

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
        children = <pre><code>{children}</code></pre>
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

const FormatSelect = ({items, onFormatChanged, label}) => {

    const [format, setFormat] = useState('html');

    return (
        <TextField
            select
            size={'small'}
            label={label}
            value={format}
            onChange={(event) => {
                setFormat(event.target.value);
                onFormatChanged(event.target.value);
            }}
            variant="outlined"
        >
            {items.map((option, idx) => (
                <MenuItem key={idx} value={option.value}>
                    {option.label}
                </MenuItem>
            ))}
        </TextField>
    );
};

const ToolSection = ({label, children, divider = true}) => <>
    <Box>
        <InputLabel style={{fontSize: 'x-small', margin: '.25em', color: '#999'}} focused={true}>{label}</InputLabel>
        <Box style={{display: 'flex'}}>
            {children}
        </Box>
    </Box>
    {divider && <Divider style={{ margin: 'auto 2px', height: '30px', position: 'relative', top: '8px'}} orientation={'vertical'} flexItem/>}
</>;


const NewDocumentEditor = ({readOnly}) => {
    const [value, setValue] = useState(initialValue);
    const [format, setFormat] = useState('html');

    const editor = useMemo(() => withHistory(withReact(createEditor())), []);

    const renderElement = useCallback(props => <Element {...props} />, []);
    const renderLeaf = useCallback(props => <Leaf {...props} />, []);

    const handleContentFormatChanged = (newFormat) => {
        // const {content, contentFormat} = this.state;
        const content = initialValue;

        console.log('src', content);
        // const self = this;
        axios.post('http://localhost:8000/converter/convert', {
            sourceFormat: format,
            targetFormat: newFormat,
            content: content
        })
            .catch(e => console.error(e))
            .then(res => {
                if (res) {
                    setValue(res.data.result);
                }
            });
        console.log("Updating new formatted content: ", content);
        setFormat(newFormat);
    };

    const onSubmit = (event) => {
        // do some awaiting stuff back to the server

        const point = {path: [0, 0], offset: 0};
        editor.selection = {anchor: point, focus: point};

        // For good measure, you can reset the history as well
        editor.history = {redos: [], undos: []};

        // Reset things back to their original (empty) state
        setValue(initialValue);
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
        <Paper style={{padding: '1em 2em', textAlign: 'initial', height: '85vh'}}>
            <Slate editor={editor} value={value} onChange={(v) => setValue(v)}>
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
                            <FormatSelect
                                items={[
                                    {value: 'html', label: 'HTML (default)'},
                                    {value: 'md', label: 'Markdown'},
                                    {value: 'rst', label: 'reStructuredText'},
                                ]}
                                onFormatChanged={handleContentFormatChanged}/>
                        </Box>
                    </ToolSection>
                </Toolbar>
                <Editable
                    style={{height: '85vh', padding: '1em', border: '1px solid #eee'}}
                    renderElement={renderElement}
                    renderLeaf={renderLeaf}
                    placeholder="Enter some text"
                    readOnly={readOnly}
                    spellCheck
                    autoFocus
                    onSubmit={e => onSubmit(e)}
                    // onKeyDown={e => onKeyDown(e)}
                />
            </Slate>
        </Paper>
    );

};

const initialValue = [
    {
        type: 'paragraph',
        children: [
            {text: 'This is editable '},
            {text: 'rich', bold: true},
            {text: ' text, '},
            {text: 'much', italic: true},
            {text: ' better than a '},
            {text: '<textarea>', code: true},
            {text: '!'},
        ],
    },
    {
        type: 'paragraph',
        children: [
            {
                text:
                    "Since it's rich text, you can do things like turn a selection of text ",
            },
            {text: 'bold', bold: true},
            {
                text:
                    ', or add a semantically rendered block quote in the middle of the page, like this:',
            },
        ],
    },
    {
        type: 'block-quote',
        children: [{text: 'A wise quote.'}],
    },
    {
        type: 'paragraph',
        children: [{text: 'Try it out for yourself!'}],
    },
]

export default NewDocumentEditor;