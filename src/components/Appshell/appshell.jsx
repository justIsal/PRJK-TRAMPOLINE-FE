import { NavLink, useNavigate } from "react-router-dom"
import NavAdmin from "../NavAdmin/NavAdmin"
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import FolderCopyOutlinedIcon from '@mui/icons-material/FolderCopyOutlined';
import PermContactCalendarOutlinedIcon from '@mui/icons-material/PermContactCalendarOutlined';
import { useSelector } from "react-redux";
import { useEffect,useState } from "react";
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import "./appShell.css"
import axiosJwt from "../../api/interceptors";
import axios from "axios";

// import { jwtDecode } from "jwt-decode";
const Appshell = ({children,data})=> {
    const dataNav = [
        {
            item: "Home",
            path: "/admin/home",
            icon: <HomeOutlinedIcon />
        },
        {
            item: "Tiket pesanan",
            path: "/admin/pesanan",
            icon: <FolderCopyOutlinedIcon />
        },
        {
            item: "Riwayat tiket",
            path: "/admin/rekapPesanan",
            icon: <PermContactCalendarOutlinedIcon />
        },

    ]
    
    // const id = useSelector(state => state.token.id);
    const user = JSON.parse(localStorage.getItem('user'))
    const accessToken = useSelector(state => state.token.accessToken);
    // const id = useSelector(state =>state.token.id)
    const userId = user.userId
    const navigate = useNavigate()
    const [value,setValues]=useState('')
    useEffect(()=> {
        const requestApi2 = async()=>{
            try {
                const res = await axiosJwt.get(`/admin/${userId}`,{
                    headers: { 
                        Authorization: `Bearer ${accessToken}`
                    }
                });
                setValues(res.data);
                
              } catch (error) {
                console.error('Error making API request:', error);
              }
        }
        requestApi2()
    },[])
    const onClickLogout = async() => {
        if(window.confirm('Are you sure you want to log out')){
            try{
                const req = await axios.delete('http://localhost:5174/logout');
                console.log(req)
                if(req.status==200) navigate('/admin')
                
            }catch(err){
                console.log(err)
            }
        }
    }
    return(
        <div className="appshellContainer">
            <div className="sidebar">
                <div className="logo">LOGO</div>
                <div className="navlist">
                    {dataNav.map((item,index)=>(
                        <ul className="navlist__items" key={index}>
                            <NavLink to={item.path} className="navlist__item">
                                {item.icon} 
                                {item.item} 
                                <span>{item.path == "/admin/pesanan" && data !== 0 ? data : null}</span>
                            </NavLink>
                        </ul>
                    ))}
                </div>
                <div className="logout">
                    <button onClick={onClickLogout}><LogoutOutlinedIcon/> Logout </button>
                </div>
            </div>
            <NavAdmin name={user ? user.userName : ""}>
                {children}
            </NavAdmin>
        </div>
    )
}
export default Appshell