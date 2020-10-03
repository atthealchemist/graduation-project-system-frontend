import React, {useCallback, useMemo, useState} from "react";
import {Editable, ReactEditor, Slate, useSlate, withReact} from "slate-react";
import {createEditor, Editor, Transforms} from "slate";
import {TooltipedButton, TooltipedToggleButton} from "../TooltipedButton/TooltipedButton";
import Toolbar from "@material-ui/core/Toolbar";
import {
    Audiotrack,
    Code,
    FormatBold,
    FormatItalic, FormatListBulleted, FormatListNumbered, FormatStrikethrough,
    FormatUnderlined,
    Looks3,
    Looks4,
    Looks5, Looks6,
    LooksOne,
    LooksTwo, VideoLibrary
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
};const UploadButton = ({id, tooltip, inputAccept, icon, onClick, onFileSelected}) => <>
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
                }} tooltip={format} color={'inherit'}>
                    <IconComponent />
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
            buttonStyle={{border: '1px solid transparent', borderRadius: '50%'}}
            isActive={isBlockActive(editor, format)}
            performAction={() => toggleBlock(editor, format)}
            // onClick={event => {
            //     event.preventDefault()
            // }}>
            >
            <IconComponent style={{color: 'inherit'}}/>
        </TooltipedToggleButton>
    );
};

const Element = (props) => {

    const {attributes, children, element} = props;

    switch (element.type) {
        case 'block-quote':
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

    return <span {...attributes}>{children}</span>
};

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


const NewDocumentEditor = ({ readOnly }) => {
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
                setValue(res.data.result);
            });
        console.log("Updating new formatted content: ", content);
        setFormat(newFormat);
    };

    const onSubmit = (event) => {
        // do some awaiting stuff back to the server

        const point = { path: [0, 0], offset: 0 };
        editor.selection = { anchor: point, focus: point };

        // For good measure, you can reset the history as well
        editor.history = { redos: [], undos: [] };

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
        <Paper style={{padding: '2em 1em', height: '85vh'}}>
            <Slate editor={editor} value={value} onChange={(v) => setValue(v)}>
                <Toolbar>
                    <MarkButton format="bold" icon={FormatBold}/>
                    <MarkButton format="italic" icon={FormatItalic}/>
                    <MarkButton format="underline" icon={FormatUnderlined}/>
                    <MarkButton format="strikethrough" icon={FormatStrikethrough}/>
                    <MarkButton format="code" icon={Code}/>
                    <BlockButton format="heading-one" icon={LooksOne}/>
                    <BlockButton format="heading-two" icon={LooksTwo}/>
                    <BlockButton format="heading-three" icon={Looks3}/>
                    <BlockButton format="heading-four" icon={Looks4}/>
                    <BlockButton format="heading-five" icon={Looks5}/>
                    <BlockButton format="heading-six" icon={Looks6}/>
                    <BlockButton format="numbered-list" icon={FormatListNumbered}/>
                    <BlockButton format="bulleted-list" icon={FormatListBulleted}/>
                    <ActionButton format="video" icon={VideoLibrary} onFileSelected={onVideoSelected}/>
                    <ActionButton format="audio" icon={Audiotrack} onFileSelected={onAudioSelected}/>
                    <Box margin={'.5em'} display={'flex'}>
                        <FormatSelect label={"Content format"} onFormatChanged={handleContentFormatChanged}/>
                    </Box>
                </Toolbar>
                <Editable
                    style={{height: '85vh'}}
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