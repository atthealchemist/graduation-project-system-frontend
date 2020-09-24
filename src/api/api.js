
import DocumentApiInterface from './document';
import UserApiInterface from './user';

class Api {

    static get Document() {
        return DocumentApiInterface;
    }

    static get User() {
        return UserApiInterface;
    }


}