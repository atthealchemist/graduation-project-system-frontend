import {useSlate} from "slate-react";
import {generateRandomString} from "../../../../utils/utils";
import {TooltipedButton} from "../../TooltipedButton/TooltipedButton";
import React from "react";
import {Editor} from "slate";

const insertAttachment = (editor, attachment) => {
    Editor.insertFragment(editor, attachment);
};


export const ActionButton = ({format, icon, onFileSelected}) => {
    const editor = useSlate();
    const IconComponent = icon;
    const id = `format-${format}-${generateRandomString()}`
    const acceptFormat = `${format}/*`;

    const handleClick = () => insertAttachment(editor, format);
    const handleFileInputChange = (event) => onFileSelected(event.target.files);

    return (
        <>
            <input style={{display: 'none'}} accept={acceptFormat} id={id} type="file"
                   onChange={handleFileInputChange}/>
            <label htmlFor={id}>
                <TooltipedButton onClick={handleClick} tooltip={format}>
                    <IconComponent/>
                </TooltipedButton>
            </label>
        </>
    );
};