import {jsx} from 'slate-hyperscript'

const deserialize = element => {
    if (element.nodeType === 3) {
        return element.textContent
    } else if (element.nodeType !== 1) {
        return null
    }

    const children = Array.from(element.childNodes).map(deserialize)

    switch (element.nodeName) {
        case 'BODY':
            return jsx('fragment', {}, children)
        case 'BR':
            return '\n'
        case 'BLOCKQUOTE':
            return jsx('element', {type: 'quote'}, children)
        case 'B':
            const boldChildren = children.map(c => c = {text: c, bold: true});
            return jsx('element', {type: 'paragraph'}, boldChildren);
        case 'I':
            const italicChildren = children.map(c => c = {text: c, italic: true});
            return jsx('element', {type: 'paragraph'}, italicChildren);
        case 'PRE':
        case 'CODE':
            const codeChildren = children.map(c => c = {text: c, code: true});
            return jsx('element', {type: 'paragraph'}, codeChildren);
        case 'IMAGE':
        case 'IMG':
            console.log("Image", element);
            const imageSrc = element.getAttribute('src');
            const imageChildren = [{text: ''}];
            return jsx('element', {type: 'image', src: imageSrc}, imageChildren)
        case 'VIDEO':
            const videoSrc = element.children[0].src;
            return jsx('element', {type: 'video', src: videoSrc}, children)
        case 'AUDIO':
            const audioSrc = element.getAttribute('src');
            return jsx('element', {type: 'audio', src: audioSrc}, children)
        case 'P':
            return jsx('element', {type: 'paragraph'}, children)
        case 'A':
            return jsx(
                'element',
                {type: 'link', url: element.getAttribute('href')},
                children
            )
        default:
            return element.textContent
    }
}

export {
    deserialize
}