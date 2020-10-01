import React, {Component} from "react";
import {Box, TextField, Card, CardActions, CardContent, CardHeader, Divider, Typography} from "@material-ui/core";
import {Visibility, VisibilityOff} from "@material-ui/icons";
import {TooltipedButton} from "../../single/TooltipedButton/TooltipedButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import { GoogleLogin } from 'react-google-login';
// import VKLogin from 'react-vk-login'


import MainContainer from "../../containers/MainContainer/MainContainer";
import Button from "@material-ui/core/Button";

export default class LoginPage extends Component {

    state = {
        showPassword: false
    };

    handlePasswordShow = () => {
        this.setState({showPassword: !this.state.showPassword});
    };

    handleLogin = () => {
        console.log("login ", true);
        this.props.onAuthChanged(true);
    };

    handleGoogleLogin = (res) => {
        console.log("Successfully logged in with Google", res);
        const credentials = {
            email: res.profileObj.email,
            displayName: res.profileObj.name,
            password: res.profileObj.googleId
        };
        console.log("Google login credentials", credentials);
        this.props.onAuthChanged(true);
    };

    handleGoogleLoginError = (res) => {
        console.error("Error when logged in with Google", res);
    };

    handleCancel = () => {
        this.props.onAuthChanged(false);
    };

    render() {
        const {showPassword} = this.props;
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
                        <TextField fullWidth margin={"normal"} required label="Username or email" defaultValue="lorem@ipsum.do"/>
                        <TextField fullWidth margin={"normal"} required type="password" label="Password" endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={this.handlePasswordShow}
                                >
                                    {showPassword ? <Visibility/> : <VisibilityOff/>}
                                </IconButton>
                            </InputAdornment>
                        }/>
                        <br/>

                    </form>
                </CardContent>
                <CardActions>
                    <TooltipedButton component={Button} tooltip='Login' onClick={this.handleLogin}>
                        LOGIN
                    </TooltipedButton>
                    <TooltipedButton component={Button} tooltip="Cancel" onClick={this.handleCancel}>
                        CANCEL
                    </TooltipedButton>
                </CardActions>
            </Card>
            <Box mt={'2em'} style={{}}>
                <Typography variant={'subtitle1'}>Or you can login via Google:</Typography>
                <br/>
                <GoogleLogin
                    clientId="156434063975-bifafqgpdiga1j30sotlo30m6rm0poad.apps.googleusercontent.com"
                    buttonText="Sign in with Google"
                    onSuccess={this.handleGoogleLogin}
                    onFailure={this.handleGoogleLoginError}
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

}