import {deserialize} from "./deserializers/html";
import {serialize} from "./serializers/html";
import {findInTree} from "../../../utils/utils";

const formatBytes = (value, fraction = 2) => {
    if (0 === value) return 0;
    const c = 0 > fraction ? 0 : fraction, d = Math.floor(Math.log(value) / Math.log(1024));
    return parseFloat((value / Math.pow(1024, d)).toFixed(c)) + " " + ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"][d]
};


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