import Box from "@material-ui/core/Box";
import {Typography} from "@material-ui/core";
import {extractNameFromUrl, getFileSize} from "../utils";
import React from "react";
import {AttachBox} from "./VideoElement";
import {useSlate} from "slate-react";

export const ImageElement = ({attributes, children, element}) => {

    const editor = useSlate();

    const name = extractNameFromUrl(element.src);
    const size = getFileSize(element.src);

    return(
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
                <img width={'auto'} height={'100%'} alt={""} src={element.src} />
            </Box>
            {children}
        </AttachBox>
    );
};