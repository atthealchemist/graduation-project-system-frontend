import React, {useState} from "react";
import CannerEditor from 'canner-slate-editor';
import Box from "@material-ui/core/Box";

export const DocumentEditor = (document = {content: '<body> </body>'},
                               documentFormat = 'html',
                               readOnly,
                               onContentChanged,
                               onFormatChanged) => {

    const [value, setValue] = useState([]);

    return(
        <Box>
            <CannerEditor
                value={value}
                onChange={(value) => setValue(value)}
                serviceConfig={{
                    name: "image",
                    accept: "image/*",
                    action: "https://api.imgur.com/3/image",
                    headers: {
                        Authorization: "Client-ID a214c4836559c77",
                        "X-Requested-With": null
                    }
                }}
                galleryConfig={null}
            />
        </Box>
    );
};