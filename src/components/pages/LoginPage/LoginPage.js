import React, {Component} from "react";
import {Box, TextField, Card, CardActions, CardContent, CardHeader} from "@material-ui/core";
import {Visibility, VisibilityOff} from "@material-ui/icons";
import {TooltipedButton} from "../../single/TooltipedButton/TooltipedButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import MainContainer from "../../containers/MainContainer/MainContainer";

export default class LoginPage extends Component {

    state = {
        showPassword: false
    };

    handlePasswordShow = () => {
        this.setState({showPassword: !this.state.showPassword});
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
                    </form>
                </CardContent>
                <CardActions>
                    <TooltipedButton iconButton={false} tooltip='Login'>
                        LOGIN
                    </TooltipedButton>
                    <TooltipedButton iconButton={false} tooltip="Cancel">
                        CANCEL
                    </TooltipedButton>
                </CardActions>
            </Card>
        </Box>;
    }

}