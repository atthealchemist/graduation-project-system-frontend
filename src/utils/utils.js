


const countChildren = (children) => {
    let len = children.length;
    children.map(c => c.children ? len += this.countChildren(c.children) : 1);
    return len;
};

const stripContent = (content) => {
    const ALLOWED_PREVIEW_CHAR_COUNT = 200;
    let contentStripped = content;
    if(content.length > ALLOWED_PREVIEW_CHAR_COUNT)
    {
        contentStripped = content.substr(0, ALLOWED_PREVIEW_CHAR_COUNT) + "...";
    }
    return contentStripped;
};

export {
    countChildren,
    stripContent
};