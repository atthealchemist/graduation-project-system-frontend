import {useSlate} from "slate-react";
import {TooltipedButton} from "../../TooltipedButton/TooltipedButton";
import React from "react";
import {Editor} from "slate";

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

export const MarkButton = ({format, icon}) => {
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