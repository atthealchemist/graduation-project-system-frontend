import {ReactEditor, useSlate} from "slate-react";
import {Transforms} from "slate";
import {UrlInput} from "./UrlInput";
import React from "react";
import {Button, Typography} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import {extractNameFromUrl, getFileSize} from "../utils";

export const AttachBox = (props) => {
    const {title, children} = props;
    return (
        <Box contentEditable={false} style={{userSelect: 'none'}} {...props}>
            <Box>
                <Typography variant={"subtitle1"}>{title}</Typography>
            </Box>
            <Box>
                {children}
            </Box>
        </Box>
    );
};

export const VideoElement = ({attributes, children, element}) => {
    const editor = useSlate();

    console.log('video element', element)

    const handleUrlChange = (value) => {
        const path = ReactEditor.findPath(editor, element);
        Transforms.setNodes(editor, {url: value}, {at: path});
    };

    const name = extractNameFromUrl(element.src);
    const size = getFileSize(element.src);

    return (
        <AttachBox style={{width: 'fit-content'}}
             display={'flex'}
             flexDirection={'column'}
             alignItems={'center'}
             margin={'1em'}>
            <Box flexFlow={'row'} alignItems={'center'}>
                <Typography variant={"subtitle1"}>{name}</Typography>
                {size > 1 && <Typography variant={"subtitle2"}>{size}</Typography>}
            </Box>
            <Box>
                <video height={250} controls>
                    <source src={element.src}/>
                    Video is not supported
                </video>
            </Box>
            {children}
        </AttachBox>
    )
}