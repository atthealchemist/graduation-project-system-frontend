import React, {useState} from "react";
import {Box, TextField, Card, CardActions, CardContent, CardHeader, Typography} from "@material-ui/core";
import {Visibility, VisibilityOff} from "@material-ui/icons";
import {TooltipedButton} from "../../single/TooltipedButton/TooltipedButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";

import {GoogleLogin} from 'react-google-login';

import config from '../../../config.json';

const LoginPage = ({onAuthChanged}) => {

    const [showPassword, setShowPassword] = useState();

    const handlePasswordShow = () => {
        setShowPassword(!showPassword);
        this.setState({showPassword: !this.state.showPassword});
    };

    const handleLogin = () => onAuthChanged(true);

    const handleGoogleLogin = ({profileObj}) => {
        console.log("Successfully logged in with Google", profileObj);
        const credentials = {
            email: profileObj.email,
            displayName: profileObj.name,
            password: profileObj.googleId
        };
        console.log("Google login credentials", credentials);
        onAuthChanged(true);
    };

    const handleGoogleLoginError = (res) => {
        console.error("Error when logged in with Google", res);
    };

    const handleCancel = () => onAuthChanged(false);

    const googleClientId = config.oauth.googleClientId;

    return <Box mt={'6em'}>
        <Card
            style={{
                width: 350,
                margin: 'auto'
            }}>
            <CardHeader
                title={"Login"}
                subheader={"Allows you to login to your account"}/>
            <CardContent>
                <form>
                    <TextField fullWidth margin={"normal"} required label="Username or email"
                               defaultValue="lorem@ipsum.do"/>
                    <TextField fullWidth margin={"normal"} required type="password" label="Password" endadornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handlePasswordShow}
                            >
                                {showPassword ? <Visibility/> : <VisibilityOff/>}
                            </IconButton>
                        </InputAdornment>
                    }/>
                    <br/>
                </form>
            </CardContent>
            <CardActions>
                <TooltipedButton component={Button} tooltip='Login' onClick={handleLogin}>
                    Login
                </TooltipedButton>
                <TooltipedButton component={Button} tooltip="Cancel" onClick={handleCancel}>
                    Cancel
                </TooltipedButton>
            </CardActions>
        </Card>
        <Box mt={'2em'} style={{}}>
            <Typography variant={'subtitle1'}>Or you can login via Google:</Typography>
            <br/>
            <GoogleLogin
                clientId={googleClientId}
                buttonText="Sign in with Google"
                onSuccess={handleGoogleLogin}
                onFailure={handleGoogleLoginError}
                cookiePolicy={'single_host_origin'}
            />
            {/*<VKLogin*/}
            {/*    appId="1088597931155576"*/}
            {/*    autoLoad={true}*/}
            {/*    fields="name,email,picture"*/}
            {/*    onClick={() => console.log("Clicked")}*/}
            {/*    callback={(res) => console.log("Response", res)}*/}
            {/*/>*/}
        </Box>
    </Box>;

}

export default LoginPage;