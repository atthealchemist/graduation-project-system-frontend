import React, {useState} from "react";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

export const Snack = ({open, type, duration = 1500, text}) => {
    const [openSnackbar, setOpenSnackbar] = useState(open);

    const handleSnackbarClosed = (event, reason) => {
        if (reason) return;
        setOpenSnackbar(false);
    };

    return (
        <Snackbar open={openSnackbar} autoHideDuration={duration} onClose={handleSnackbarClosed}>
            <Alert severity={type}>
                {text}
            </Alert>
        </Snackbar>
    );
};