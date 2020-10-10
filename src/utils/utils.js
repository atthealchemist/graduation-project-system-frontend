
const generateRandomString = (length= 6) =>
    Math.random().toString(20).substr(2, length);

const nodeIsDocument = (node) => node.content && node.content.length > 0;

const nodeIsFolder = (node) => node.children && node.children.length > 0;

const findInTree = (tree, id) => {
    let searchResult = {};

    tree.map(node => {
        if (nodeIsDocument(node)) {
            if(node.id === id)
                searchResult = node;
        }
        if (nodeIsFolder(node)) {
            let child = findInTree(node.children, id);
            if(child.id === id)
                searchResult = child;
        }
        return searchResult;
    });
    console.log("findInTree result: ", searchResult);
    return searchResult;
};

const countChildren = (children) => {
    let count = 0;

    children.map(child => {
        if(nodeIsDocument(child)){
            count++;
        }
        if(nodeIsFolder(child)){
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
    generateRandomString,
    findInTree,
    countChildren,
    stripContent
};