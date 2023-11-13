import { NavLink } from "react-router-dom"
import NavAdmin from "../NavAdmin/NavAdmin"
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import FolderCopyOutlinedIcon from '@mui/icons-material/FolderCopyOutlined';
import PermContactCalendarOutlinedIcon from '@mui/icons-material/PermContactCalendarOutlined';
import { useSelector } from "react-redux";
import { useEffect,useState } from "react";
import "./appShell.css"
import axiosJwt from "../../api/interceptors";
// import { jwtDecode } from "jwt-decode";
const Appshell = ({children})=> {
    const dataNav = [
        {
            item: "Home",
            path: "/admin/home",
            icon: <HomeOutlinedIcon />
        },
        {
            item: "Pesanan",
            path: "/admin/pesanan",
            icon: <FolderCopyOutlinedIcon />
        },
        {
            item: "User",
            path: "/admin/user",
            icon: <PermContactCalendarOutlinedIcon />
        },

    ]

    // const id = useSelector(state => state.token.id);
    const user = JSON.parse(localStorage.getItem('user'))
    const accessToken = useSelector(state => state.token.accessToken);
    // const id = useSelector(state =>state.token.id)
    const userId = user.userId
    // console.log(id)
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
    return(
        <div className="appshellContainer">
            <div className="sidebar">
                <div className="logo">LOGO</div>
                <div className="navlist">
                    {dataNav.map((item,index)=>(
                        <ul className="navlist__items" key={index}>
                            <NavLink to={item.path} className="navlist__item">
                                {item.icon} {item.item}
                            </NavLink>
                        </ul>
                    ))}
                </div>
            </div>
            <NavAdmin name={user ? user.userName : ""}>
                {children}
            </NavAdmin>
        </div>
    )
}
export default Appshell