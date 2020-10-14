import {jsx} from 'slate-hyperscript'

const ELEMENT_TAGS = {
    A: element => ({ type: 'link', url: element.getAttribute('href') }),
    BLOCKQUOTE: () => ({ type: 'quote' }),
    H1: () => ({ type: 'heading-one' }),
    H2: () => ({ type: 'heading-two' }),
    H3: () => ({ type: 'heading-three' }),
    H4: () => ({ type: 'heading-four' }),
    H5: () => ({ type: 'heading-five' }),
    H6: () => ({ type: 'heading-six' }),
    IMG: element => ({ type: 'image', url: element.getAttribute('src') }),
    VIDEO: element => ({ type: 'video', url: element.getAttribute('src') }),
    AUDIO: element => ({ type: 'audio', url: element.getAttribute('src') }),
    LI: () => ({ type: 'list-item' }),
    OL: () => ({ type: 'numbered-list' }),
    P: () => ({ type: 'paragraph' }),
    PRE: () => ({ type: 'code' }),
    UL: () => ({ type: 'bulleted-list' }),
}

// COMPAT: `B` is omitted here because Google Docs uses `<b>` in weird ways.
const TEXT_TAGS = {
    CODE: () => ({ code: true }),
    DEL: () => ({ strikethrough: true }),
    EM: () => ({ italic: true }),
    I: () => ({ italic: true }),
    S: () => ({ strikethrough: true }),
    STRONG: () => ({ bold: true }),
    U: () => ({ underline: true }),
}


const deserialize = element => {
    if (element.nodeType === 3) {
        return element.textContent === "undefined" ? "" : element.textContent;
    } else if (element.nodeType !== 1) {
        return null;
    } else if (element.nodeName === 'BR') {
        return '\n';
    }

    const { nodeName } = element;
    let parent = element;

    if (nodeName === 'PRE' && element.childNodes[0] && element.childNodes[0].nodeName === 'CODE') {
        parent = element.childNodes[0];
    }

    const children = Array.from(parent.childNodes)
        .map(deserialize);

    if (element.nodeName === 'BODY') {
        return jsx('fragment', {}, children);
    }

    if (ELEMENT_TAGS[nodeName]) {
        const attrs = ELEMENT_TAGS[nodeName](element);
        return jsx('element', attrs, children);
    }

    if (TEXT_TAGS[nodeName]) {
        const attrs = TEXT_TAGS[nodeName](element);
        return children.map(child => jsx('text', attrs, child));
    }

    return children;
}

export {
    deserialize
}