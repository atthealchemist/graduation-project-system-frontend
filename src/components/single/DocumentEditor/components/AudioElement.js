import {ReactEditor, useSlate} from "slate-react";
import {Transforms} from "slate";
import {UrlInput} from "./UrlInput";
import React from "react";
import Box from "@material-ui/core/Box";
import {Typography} from "@material-ui/core";
import {extractNameFromUrl} from "../utils";
import {AttachBox} from "./VideoElement";

export const AudioElement = ({attributes, children, element}) => {

    const editor = useSlate();

    const handleUrlChange = (value) => {
        const path = ReactEditor.findPath(editor, element);
        Transforms.setNodes(editor, {url: value}, {at: path});
    };

    return (
        <AttachBox style={{width: 'fit-content'}} display={'flex'} flexDirection={'column'} alignItems={'center'} margin={'1em'}>
            <Box>
                <Typography variant={"subtitle1"}>{extractNameFromUrl(element.src)}</Typography>
            </Box>
            <audio controls {...element}>
                Your browser does not support the <code>audio</code> element
            </audio>
            {children}
        </AttachBox>
    );
}