import axios from 'axios'
import base64 from 'react-native-base64';

export const CODE_DEFAULT = -200;
export const CODE_SUCCESS = 200;
export const ERROR_NETWORK_CODE = -100;
export const RESULT_CODE_PUSH_OUT = 401;
export const TIME_OUT = 10000;
export const CODE_TIME_OUT = 408;

export const api = {
    onLogin(username:string,password:string){
        const authHeader = 'Basic ' + base64.encode(`${username}:${password}`);
        const dataLogin = axios.post('https://tindi.network/api/v1/test-login',{},{
            headers: { 'Authorization': authHeader }
        })
        dataLogin.then(res => res.data)
        return dataLogin
    },
    onGetData(page:number){
        return axios.post('https://tindi.network/api/v1/test-home',{
            page
        })
    }
}



