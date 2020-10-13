import * as axios from "axios";
import {API_URL} from "./config";

export const loginUser = (credentials) => {
    const payload = new FormData();

    payload.append('username', credentials.login);
    payload.append('password', credentials.password);
    payload.append('client_id', credentials.client_id);
    payload.append('client_secret', credentials.client_secret);

    axios({
        url: `${API_URL}/auth/login`,
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'accept': 'application/json'
        },
        data: payload
    })
        .catch(e => console.log(e))
        .then(res => {
            console.log('res', res);
            const {data} = res;
            localStorage.setItem('token', data.access_token);
        });
};

export const registerUser = (credentials, onUserRegistered) => {
    axios({
        url: `${API_URL}/auth/register`,
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'accept': 'application/json'
        },
        data: credentials
    }).catch(e => console.log(e))
        .then(res => {
            console.log('res', res);
            const {data} = res;
            if(data.status === 'registered'){
                onUserRegistered(data.status);
                loginUser(credentials);
            }
        });
};

export const getCurrentUser = (onUserGot) => {
    axios({
        url: `${API_URL}/auth/current`,
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    })
        .then(res => {
            onUserGot(res.data);
        });
};