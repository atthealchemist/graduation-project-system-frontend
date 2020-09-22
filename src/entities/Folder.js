import Node from './Node';

export default class Folder extends Node {

    constructor(id, name, children) {
        super(id, name);

        this.children = children;
        this.type = 'folder';
    }
}