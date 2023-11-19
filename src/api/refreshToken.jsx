import axios from "axios"
import { jwtDecode } from 'jwt-decode';
import { setAccessToken } from "../redux/authSlice";
import { store } from "../redux/store";

export const refreshToken = async()=> {
    try{
        const response = await axios.get('http://localhost:5174/token');
        const decoded = jwtDecode(response.data.accessToken)
        return response.data.accessToken
    }catch(e){
        if(e.response) {
            window.location.href = '/admin'
        }
    }
}
