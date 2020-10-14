import escapeHtml from 'escape-html'
import {Node, Text} from 'slate'
import React from "react";

const serialize = node => {
    if (Text.isText(node)) {
        return escapeHtml(node.text)
    }

    const children = node.length > 0 ? node.map(n => serialize(n)).join('') : node.children.map(n => serialize(n)).join('');

    switch (node.type) {
        case 'list-item':
            return `<li>${children}</li>`
        case 'heading-one':
            return `<h1>${children}</h1>`
        case 'heading-two':
            return `<h2>${children}</h2>`
        case 'heading-three':
            return `<h3>${children}</h3>`
        case 'heading-four':
            return `<h4>${children}</h4>`
        case 'heading-five':
            return `<h5>${children}</h5>`
        case 'heading-six':
            return `<h6>${children}</h6>`
        case 'block-quote':
        case 'quote':
            return `<blockquote><p>${children}</p></blockquote>`
        case 'paragraph':
            return `<p>${children}</p>`
        case 'link':
            return `<a href="${escapeHtml(node.url)}">${children}</a>`
        case 'img':
        case 'image':
            return `<img width="auto" height="100%"  alt="" src="${node.url}" />`
        case 'audio':
            return `<div><audio controls src="${node.src}">Your browser does not support the <code>audio</code> element</audio>${children}</div>`;
        case 'video':
            return `<div><video height="${250}" controls><source src="${node.src}"/>Video is not supported</video>${children}</div>`;
        default:
            return children
    }
}

export {
    serialize
}