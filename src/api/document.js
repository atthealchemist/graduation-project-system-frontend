import * as axios from "axios";
import {API_URL} from "./config";

export const fetchDocumentById = (docId, onDocumentFetched) => {
    axios({
        url: `${API_URL}/documents/${docId}`,
        method: 'GET',
        mode: 'no-cors'
    })
        .catch(e => console.error(e))
        .then(res => res.data)
        .then(data => onDocumentFetched(data));

};