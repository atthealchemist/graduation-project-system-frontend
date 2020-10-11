export const stubTree = [
    {
        id: '1',
        name: 'Node 1',
        author: {
            displayName: "Hanyuu",
            avatar: "http://lorempixel.com/200/200/"
        },
        createdAt: "2020-09-22 13:45:50.004T",
        content: "A <i>quick</i> brown <b>fox</b> jumps over the <s>lazy</s> dog. \
        <img src=\"https://lorempixel.com/200/200\" >\
        <br> Take a look: <video width='auto' height='100' controls> \
            <source src=\"https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_1MB.mp4\" type=\"video/mp4\"> \
            </video><br>Listen it: <audio controls src=\"//interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3\"> \
            </audio> \
            ",
        children: []
    },
    {
        id: 'folder-2',
        name: 'Folder 1',
        createdAt: "2020-09-22 13:45:50.004T",
        children: [
            {
                id: '3',
                name: 'Folder 1 node 1',
                createdAt: "2020-09-22 13:45:50.004T",
                author: {
                    displayName: "Hanyuu",
                    avatar: "http://lorempixel.com/200/200/"
                },
                content: 'salut',
                children: []
            }
        ]
    },
    {
        id: 'folder-4',
        name: 'Folder 2',
        createdAt: "2020-09-22 13:45:50.004T",
        children: [
            {
                id: '5',
                name: 'Folder 2 node 1',
                author: {
                    displayName: "Hanyuu",
                    avatar: "http://lorempixel.com/200/200/"
                },
                createdAt: "2020-09-22 13:45:50.004T",
                content: 'wow',
                children: []
            },
            {
                id: '6',
                name: 'Folder 2 node 2',
                author: {
                    displayName: "Hanyuu",
                    avatar: "http://lorempixel.com/200/200/"
                },
                createdAt: "2020-09-22 13:45:50.004T",
                content: 'such awesome',
                children: []
            },
            {
                id: 'folder-7',
                name: 'Inner test stuff folder',
                createdAt: "2020-09-22 13:45:50.004T",
                children: [
                    {
                        id: '8',
                        name: 'Inner test stuff node',
                        author: {
                            displayName: "Hanyuu",
                            avatar: "http://lorempixel.com/200/200/"
                        },
                        createdAt: "2020-09-22 13:45:50.004T",
                        content: 'docs',
                        children: []
                    }
                ]
            },
        ]
    }
];