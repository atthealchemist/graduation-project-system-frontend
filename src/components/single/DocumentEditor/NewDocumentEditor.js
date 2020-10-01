import React, {useCallback, useMemo, useState} from "react";
import {Editable, Slate, useSlate, withReact} from "slate-react";
import {createEditor, Editor, Transforms} from "slate";
import {TooltipedButton, TooltipedToggleButton} from "../TooltipedButton/TooltipedButton";
import Toolbar from "@material-ui/core/Toolbar";
import {
    Code,
    FormatBold,
    FormatItalic, FormatListBulleted, FormatListNumbered,
    FormatUnderlined,
    Looks3,
    Looks4,
    Looks5, Looks6,
    LooksOne,
    LooksTwo
} from "@material-ui/icons";
import {ToggleButton} from "@material-ui/lab";
import Paper from "@material-ui/core/Paper";
import {withHistory} from "slate-history";

const LIST_TYPES = ['numbered-list', 'bulleted-list'];

const isMarkActive = (editor, format) => {
    const marks = Editor.marks(editor);
    return marks ? marks[format] === true : false;
};

const toggleMark = (editor, format) => {
    const isActive = isMarkActive(editor, format);
    if(isActive) {
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

    if(!isActive && isList){
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
    return(
        <TooltipedButton tooltip={format} onClick={toggleMark(editor, format)}>
            <IconComponent />
        </TooltipedButton>
    );
};

const BlockButton = ({ format, icon }) => {
    const editor = useSlate();
    const IconComponent = icon;
    return (
        <TooltipedToggleButton
            tooltip={format}
            isActive={isBlockActive(editor, format)}
            onToggled={() => toggleBlock(editor, format)}>
            <IconComponent />
        </TooltipedToggleButton>
    );
};

const Element = ({attrs, children, element}) => {
    switch(element.type){
        case 'block-quote':
            return <blockquote {...attrs}>{children}</blockquote>
        case 'bulleted-list':
            return <ul {...attrs}>{children}</ul>
        case 'heading-one':
            return <h1 {...attrs}>{children}</h1>
        case 'heading-two':
            return <h2 {...attrs}>{children}</h2>
        case 'heading-three':
            return <h3 {...attrs}>{children}</h3>
        case 'heading-four':
            return <h4 {...attrs}>{children}</h4>
        case 'heading-five':
            return <h5 {...attrs}>{children}</h5>
        case 'heading-six':
            return <h6 {...attrs}>{children}</h6>
        case 'list-item':
            return <li {...attrs}>{children}</li>
        case 'numbered-list':
            return <ol {...attrs}>{children}</ol>
        default:
            return <p {...attrs}>{children}</p>
    }
};

const Leaf = ({attrs, children, leaf}) => {
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

    return <span {...attrs}>{children}</span>
};

const NewDocumentEditor = () => {
    const [value, setValue] = useState(initialValue);

    const editor = useMemo(() => withHistory(withReact(createEditor())), []);

    const renderElement = useCallback(props => <Element {...props} />, []);
    const renderLeaf = useCallback(props => <Leaf {...props} />, []);

    return (
        <Paper>
            <Slate editor={editor} value={value} onChange={value => setValue(value)}>
                <Toolbar>
                    <MarkButton format="bold" icon={FormatBold} />
                    <MarkButton format="italic" icon={FormatItalic} />
                    <MarkButton format="underline" icon={FormatUnderlined} />
                    <MarkButton format="code" icon={Code} />
                    <BlockButton format="heading-one" icon={LooksOne} />
                    <BlockButton format="heading-two" icon={LooksTwo} />
                    <BlockButton format="heading-three" icon={Looks3} />
                    <BlockButton format="heading-four" icon={Looks4} />
                    <BlockButton format="heading-five" icon={Looks5} />
                    <BlockButton format="heading-six" icon={Looks6} />
                    <BlockButton format="numbered-list" icon={FormatListNumbered} />
                    <BlockButton format="bulleted-list" icon={FormatListBulleted} />
                </Toolbar>
                <Editable
                    renderElement={renderElement}
                    renderLeaf={renderLeaf}
                    placeholder="Enter some text"
                    spellCheck
                    autoFocus
                />
            </Slate>
        </Paper>
    );

};

const initialValue = [
    {
        type: 'paragraph',
        children: [
            { text: 'This is editable ' },
            { text: 'rich', bold: true },
            { text: ' text, ' },
            { text: 'much', italic: true },
            { text: ' better than a ' },
            { text: '<textarea>', code: true },
            { text: '!' },
        ],
    },
    {
        type: 'paragraph',
        children: [
            {
                text:
                    "Since it's rich text, you can do things like turn a selection of text ",
            },
            { text: 'bold', bold: true },
            {
                text:
                    ', or add a semantically rendered block quote in the middle of the page, like this:',
            },
        ],
    },
    {
        type: 'block-quote',
        children: [{ text: 'A wise quote.' }],
    },
    {
        type: 'paragraph',
        children: [{ text: 'Try it out for yourself!' }],
    },
]

export default NewDocumentEditor;