import axios from "axios"
import { jwtDecode } from 'jwt-decode';
import { setAccessToken } from "../redux/authSlice";
import { store } from "../redux/store";

export const refreshToken = async()=> {
    try{
        const response = await axios.get('https://prjkcekapi-production.up.railway.app/api/v1/token');
        const decoded = jwtDecode(response.data.accessToken)
        return response.data.accessToken
    }catch(e){
        if(e.response) {
            window.location.href = '/admin'
        }
    }
}
