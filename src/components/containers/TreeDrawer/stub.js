export const stubTree = [
    {
        id: 'node1',
        name: 'Node 1',
        type: 'node'
    },
    {
        id: 'fld1',
        name: 'Folder 1',
        type: 'folder',
        children: [
            {
                id: 'fldNode1',
                name: 'Folder 1 node 1',
                type: 'node'
            }
        ]
    },
    {
        id: 'fld2',
        name: 'Folder 2',
        type: 'folder',
        children: [
            {
                id: 'fld2Node1',
                name: 'Folder 2 node 1',
                type: 'node'
            },
            {
                id: 'fld2Node2',
                name: 'Folder 2 node 2',
                type: 'node'
            },
            {
                id: 'fld2Fld1',
                name: 'Folder 2 Folder 1',
                type: 'folder',
                children: [
                    {
                        id: 'fld2Fld1Node1',
                        name: 'Folder 2 Folder 1 Node 1',
                        type: 'node'
                    }
                ]
            },
        ]
    }
];