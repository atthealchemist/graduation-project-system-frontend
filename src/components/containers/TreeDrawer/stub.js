export const stubTree = [
    {
        id: '1',
        name: 'Node 1',
        createdAt: "2020-09-22 13:45:50.004T",
        content: "A <i>quick</i> brown <b>fox</b> jumps over the <s>lazy</s> dog",
        children: []
    },
    {
        id: '2',
        name: 'Folder 1',
        createdAt: "2020-09-22 13:45:50.004T",
        children: [
            {
                id: '3',
                name: 'Folder 1 node 1',
                createdAt: "2020-09-22 13:45:50.004T",
                type: 'node',
                content: 'salut',
                children: []
            }
        ]
    },
    {
        id: '4',
        name: 'Folder 2',
        createdAt: "2020-09-22 13:45:50.004T",
        children: [
            {
                id: '5',
                name: 'Folder 2 node 1',
                createdAt: "2020-09-22 13:45:50.004T",
                content: 'wow',
                children: []
            },
            {
                id: '6',
                name: 'Folder 2 node 2',
                createdAt: "2020-09-22 13:45:50.004T",
                content: 'such awesome',
                children: []
            },
            {
                id: '7',
                name: 'Folder 2 Folder 1',
                createdAt: "2020-09-22 13:45:50.004T",
                children: [
                    {
                        id: '8',
                        name: 'Folder 2 Folder 1 Node 1',
                        createdAt: "2020-09-22 13:45:50.004T",
                        content: 'docs',
                        children: []
                    }
                ]
            },
        ]
    }
];