import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"
import {  useNavigate } from "react-router-dom"
import { setToken,setUser} from "../../redux/authSlice"
import { useDispatch } from "react-redux"
import { store } from "../../redux/store"
import Logo from "../../assets/logo3.png"
import "./login.css"
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
            store.dispatch(setToken(req.data.accessToken))
            store.dispatch(setUser(req.data))
            navigate('/admin/home')
        }catch(e){
            console.log(e)
        }
    }
    return(
        <div className="login-container">
            <img src={Logo} alt="" />
            <div className="blur hero-blur"></div>
            <form className="form" onSubmit={onHandleSubmit}>
                <label htmlFor="email">Email</label>
                <input 
                    id="email"
                    type="email"
                    value={values.email}
                    onChange={(e)=>setValue({...values,email: e.target.value})}
                />
                <label htmlFor="password">Password</label>
                <input 
                    id="password"
                    type="password"
                    value={values.password}
                    onChange={(e)=>setValue({...values,password: e.target.value})}
                />
                <button type="submit">Login</button>
            </form>
        </div>
    )
}
export default Login