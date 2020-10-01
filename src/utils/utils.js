

const findInTree = (tree, id) => {
    // console.log("Tree:", tree)
    let res = {};
    tree.map(node => {
        if (node.content && node.content.length > 0) {
            if(node.id === id)
                res = node;
        }
        if (node.children && node.children.length > 0) {
            let child = findInTree(node.children, id);
            if(child.id === id)
                res = child;
        }
        return res;
    });
    console.log("Result: ", res);
    return res;
};

const countChildren = (children) => {
    let count = 0;
    children.map(child => {
        if(child.content && child.content.length > 0){
            count++;
        }
        if(child.children && child.children.length > 0){
            count += countChildren(child.children);
        }
        return count;
    });
    return count;
};

const stripContent = (content) => {
    const ALLOWED_PREVIEW_CHAR_COUNT = 20;
    let contentStripped = content;
    if(content.length > ALLOWED_PREVIEW_CHAR_COUNT)
    {
        contentStripped = content.substr(0, ALLOWED_PREVIEW_CHAR_COUNT) + "...";
    }
    return contentStripped;
};

export {
    findInTree,
    countChildren,
    stripContent
};