import React from 'react';
import {Description, Folder} from "@material-ui/icons";
import ContentPreviewTooltip from "../../single/ContentPreviewTooltip/ContentPreviewTooltip";
import TreeItem from "@material-ui/lab/TreeItem";
import {countChildren, stripContent} from '../../../utils/utils';
import {Typography} from "@material-ui/core";
import Box from "@material-ui/core/Box";


const TreeItemContent = ({title, count = 0}) =>
    <Box p={'.5em'} display={'flex'} flexDirection={'row'} alignContent={'center'}>
        <Box display={'flex'} flexGrow={1} alignItems={'center'}>
            {count > 0 ? <Folder color={"action"}/> : <Description color={"action"}/>}
        </Box>
        <Box flexGrow={8} display={'flex'} flexDirection={'column'}>
            <Typography>{title}</Typography>
            {count > 0 && <Typography variant={'caption'}>{count} documents</Typography>}
        </Box>
    </Box>;

const styles = {
    link: {
        textDecoration: 'none',
        color: 'inherit'
    }
};

const DocumentTreeItem = props => {

    const {
        nodeId,
        title,
        description,
        children,
        content
    } = props;

    const node = <TreeItem
        nodeId={nodeId}
        label={
            <TreeItemContent title={title} count={children && countChildren(children)}/>
        }
    >{children}</TreeItem>;

    const nodeWithTooltip = <ContentPreviewTooltip
        title={title}
        description={description}
        content={content && stripContent(content)}
        placement={'right'}
    >
        {node}
    </ContentPreviewTooltip>;

    return content ? nodeWithTooltip : node;
};

export default DocumentTreeItem;