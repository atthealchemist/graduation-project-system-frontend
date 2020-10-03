import { jsx } from 'slate-hyperscript'

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
            return jsx('element', { type: 'quote' }, children)
        case 'P':
            return jsx('element', { type: 'paragraph' }, children)
        case 'A':
            return jsx(
                'element',
                { type: 'link', url: element.getAttribute('href') },
                children
            )
        default:
            return element.textContent
    }
}

export {
    deserialize
}