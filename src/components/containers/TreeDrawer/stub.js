export const stubTree = [
    {
        id: '1',
        name: 'Node 1',
        author: {
            displayName: "Hanyuu",
            avatar: "http://lorempixel.com/200/200/"
        },
        createdAt: "2020-09-22 13:45:50.004T",
        content: "A <i>quick</i> brown <b>fox</b> jumps over the <s>lazy</s> dog. <br> Take a look: <video width='auto' height='100' controls>" +
            "  <source src=\"https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_1MB.mp4\" type=\"video/mp4\">\n" +
            "  Your browser doesn't support HTML5 video tag.\n" +
            "</video><br>Listen it: <audio\n" +
            "        controls\n" +
            "        src=\"//interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3\">\n" +
            "            Your browser does not support the\n" +
            "            <code>audio</code> element.\n" +
            "    </audio>" +
            "",
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
        id: '4',
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
                id: '7',
                name: 'Inner test stuff',
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