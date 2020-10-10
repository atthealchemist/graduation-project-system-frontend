import {useSlate} from "slate-react";
import {TooltipedToggleButton} from "../../TooltipedButton/TooltipedButton";
import React from "react";
import {Editor, Transforms} from "slate";

const LIST_TYPES = ['numbered-list', 'bulleted-list'];


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

    if (!isActive && isList) {
        const block = {
            type: format,
            children: []
        }
        Transforms.wrapNodes(editor, block);
    }

};

export const BlockButton = ({format, icon}) => {
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
            <IconComponent/>
        </TooltipedToggleButton>
    );
};