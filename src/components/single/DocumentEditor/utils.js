import Prism from "prismjs";
import {deserialize} from "./deserializers/html";
import {serialize} from "./serializers/html";
import {findInTree} from "../../../utils/utils";

const insertMarkdown = () => {

    Prism.languages.markdown = Prism.languages.extend("markup", {});

    Prism.languages.insertBefore("markdown", "prolog", {
        blockquote: {
            pattern: /^>(?:[\t ]*>)*/m,
            alias: "punctuation"
        },
        code: [
            {
                pattern: /^(?: {4}|\t).+/m,
                alias: "keyword"
            },
            {
                pattern: /``.+?``|`[^`\n]+`/,
                alias: "keyword"
            }
        ],
        title: [
            {
                pattern: /\w+.*(?:\r?\n|\r)(?:==+|--+)/,
                alias: "important",
                inside: {
                    punctuation: /==+$|--+$/
                }
            },
            {
                pattern: /(^\s*)#+.+/m,
                lookbehind: !0,
                alias: "important",
                inside: {
                    punctuation: /^#+|#+$/
                }
            }
        ],
        hr: {
            pattern: /(^\s*)([*-])([\t ]*\2){2,}(?=\s*$)/m,
            lookbehind: !0,
            alias: "punctuation"
        },
        list: {
            pattern: /(^\s*)(?:[*+-]|\d+\.)(?=[\t ].)/m,
            lookbehind: !0,
            alias: "punctuation"
        },
        "url-reference": {
            pattern: /!?\[[^\]]+\]:[\t ]+(?:\S+|<(?:\\.|[^>\\])+>)(?:[\t ]+(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\)))?/,
            inside: {
                variable: {
                    pattern: /^(!?\[)[^\]]+/,
                    lookbehind: !0
                },
                string: /(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\))$/,
                punctuation: /^[\[\]!:]|[<>]/
            },
            alias: "url"
        },
        bold: {
            pattern: /(^|[^\\])(\*\*|__)(?:(?:\r?\n|\r)(?!\r?\n|\r)|.)+?\2/,
            lookbehind: !0,
            inside: {
                punctuation: /^\*\*|^__|\*\*$|__$/
            }
        },
        italic: {
            pattern: /(^|[^\\])([*_])(?:(?:\r?\n|\r)(?!\r?\n|\r)|.)+?\2/,
            lookbehind: !0,
            inside: {
                punctuation: /^[*_]|[*_]$/
            }
        },
        url: {
            pattern: /!?\[[^\]]+\](?:\([^\s)]+(?:[\t ]+"(?:\\.|[^"\\])*")?\)| ?\[[^\]\n]*\])/,
            inside: {
                variable: {
                    pattern: /(!?\[)[^\]]+(?=\]$)/,
                    lookbehind: !0
                },
                string: {
                    pattern: /"(?:\\.|[^"\\])*"(?=\)$)/
                }
            }
        }
    });

    Prism.languages.markdown.bold.inside.url = Prism.util.clone(Prism.languages.markdown.url);
    Prism.languages.markdown.italic.inside.url = Prism.util.clone(Prism.languages.markdown.url);
    Prism.languages.markdown.bold.inside.italic = Prism.util.clone(Prism.languages.markdown.italic);
    Prism.languages.markdown.italic.inside.bold = Prism.util.clone(Prism.languages.markdown.bold);

};


const formatBytes = (value, fraction = 2) => {
    if (0 === value) return 0;
    const c = 0 > fraction ? 0 : fraction, d = Math.floor(Math.log(value) / Math.log(1024));
    return parseFloat((value / Math.pow(1024, d)).toFixed(c)) + " " + ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"][d]
};

export const toBase64 = (str) => Buffer.from(str).toString('base64');
export const fromBase64 = (encoded) => new Buffer(encoded, 'base64').toString('ascii');

export const getUserFromStorage = () => JSON.parse(fromBase64(localStorage.getItem('token_user')));


export const getFileSize = (url) => {
    let size = 0;
    fetch(url, {
        mode: 'no-cors',
        headers: {
            'Access-Control-Expose-Headers': "Content-Length"
        }
    })
        .catch(e => console.log(e))
        .then(res => {
            console.log('response', res)
            size = res.headers.get('Content-Length')
        });
    return formatBytes(size);
};

export const extractNameFromUrl = (url) => {
    const splitted = url.split('/');
    return splitted[splitted.length - 1];
};

export const convertFromHtmlToSlate = (content) => {
    const parsed = new DOMParser().parseFromString(content, 'text/html');
    console.log('parsed', parsed);
    return deserialize(parsed.body);
};

export const convertFromSlateToHtml = (content) => serialize(content);

export const getDocumentById = (tree, id) => {
    let document;

    switch (id) {
        case 'new':
            document = {
                id: '',
                name: 'New document',
                author: {
                    displayName: "Hanyuu",
                    avatar: "http://lorempixel.com/200/200/"
                },
                createdAt: `${new Date()}`,
                content: ''
            };
            break;
        default:
            document = findInTree(tree, id);
            break;
    }

    return document;
};