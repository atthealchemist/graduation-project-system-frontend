import axios from 'axios';

import BaseApiInterface from './base';

export default class DocumentApiInterface extends BaseApiInterface {


    getDocument(){

    }

    listDocuments(){
        axios.get(this.url)
            .catch(e => console.log(e))
            .then(res => res.data)
            .then(data => console.log(`Got list of  documents: ${data.json()}`))
    }

    createDocument(params){

    }

    updateDocument(params){

    }

    deleteDocument(params){

    }

}