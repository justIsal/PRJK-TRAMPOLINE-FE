import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"
import {  useNavigate } from "react-router-dom"
import { setAccessToken,setId } from "../../redux/authSlice"
import { useDispatch } from "react-redux"
import { store } from "../../redux/store"

const Login = ()=> {
    const [values,setValue] = useState({
        email:"",
        password: ""
    })
    // const dispatch = useDispatch()
    const navigate = useNavigate();
    const onHandleSubmit = async(e)=> {
        e.preventDefault();
        try{
            const req = await axios.post('http://localhost:5174/login',values);
            store.dispatch(setAccessToken(req.data.accessToken))
            // store.dispatch(setId(req.data.id))
            // console.log(req.data.accessToken)
            const data = {"userId": req.data.id,"userName": req.data.userName,"userEmail": req.data.userEmail}
            localStorage.setItem('user',JSON.stringify(data))
            navigate('/admin/home')
        }catch(e){
            console.log(e)
        }
    }
    return(
        <>
            <form onSubmit={onHandleSubmit}>
                <input 
                    type="email"
                    value={values.email}
                    onChange={(e)=>setValue({...values,email: e.target.value})}
                />
                <input 
                    type="password"
                    value={values.password}
                    onChange={(e)=>setValue({...values,password: e.target.value})}
                />
                <button type="submit">Login</button>
            </form>
        </>
    )
}
export default Login