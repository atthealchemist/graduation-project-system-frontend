import React, {useState} from "react";
import {Box, TextField, Card, CardActions, CardContent, CardHeader} from "@material-ui/core";
import {Visibility, VisibilityOff} from "@material-ui/icons";
import {TooltipedButton} from "../../single/TooltipedButton/TooltipedButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import {registerUser} from "../../../api/user";
import {Snack} from "../DocumentPage/Snack";

const RegisterPage = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [name, setName] = useState('');
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarType, setSnackbarType] = useState('success');
    const [snackbarText, setSnackbarText] = useState('');

    const showSnackbar = (type, text) => {
        setSnackbarText(text);
        setSnackbarType(type);
        setOpenSnackbar(!openSnackbar);
    };

    const handlePasswordShow = () => setShowPassword(!showPassword);

    const handleRegister = () => {

        const registerFields = {
            display_name: name,
            username: login,
            password: password
        };

        registerUser(registerFields, handleUserRegistered);
    };

    const handleUserRegistered = (status) => {
        if(status === 'registered') {
            showSnackbar('success', "Successfully registered!")
        } else {
            showSnackbar('error', "Something goes wrong within registration!")
        }
    };

    return <Box mt={'6em'}>
        <Card
            style={{
                width: 350,
                margin: 'auto'
            }}>
            <CardHeader
                title={"Registration"}
                subheader={"Allows you to create new account"}/>
            <CardContent>
                <form>
                    <TextField
                        fullWidth
                        margin={"normal"}
                        required
                        label="Display name"
                        defaultValue="Lorem Ipsum"
                        onChange={(event) => setName(event.target.value)}
                    />
                    <TextField
                        fullWidth
                        margin={"normal"}
                        required
                        type="email"
                        label="Login (or email)"
                        defaultValue="lorem@ipsum.do"
                        onChange={(event) => setLogin(event.target.value)}
                    />
                    <TextField
                        fullWidth
                        margin={"normal"}
                        required
                        type="password"
                        label="Password"
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handlePasswordShow}
                                >
                                    {showPassword ? <Visibility/> : <VisibilityOff/>}
                                </IconButton>
                            </InputAdornment>
                        }
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </form>
            </CardContent>
            <CardActions>
                <TooltipedButton component={Button} tooltip='Register' onClick={handleRegister}>
                    Register
                </TooltipedButton>
                <TooltipedButton component={Button} tooltip="Login">
                    Login
                </TooltipedButton>
            </CardActions>
        </Card>
        <Snack open={openSnackbar} type={snackbarType} text={snackbarText}/>
    </Box>;

}

export default RegisterPage;