import { NavLink, useNavigate } from "react-router-dom"
import NavAdmin from "../NavAdmin/NavAdmin"
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import FolderCopyOutlinedIcon from '@mui/icons-material/FolderCopyOutlined';
import PermContactCalendarOutlinedIcon from '@mui/icons-material/PermContactCalendarOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import { useDispatch, useSelector } from "react-redux";
import { useEffect,useState } from "react";
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import "./appShell.css"
import axiosJwt from "../../api/interceptors";
import axios from "axios";
import { clearData } from "../../redux/authSlice";
import { store } from "../../redux/store";
import { jwtDecode } from "jwt-decode";
import Swal from 'sweetalert2'
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
    // const user = JSON.parse(localStorage.getItem('user'))
    const accessToken = useSelector(state => state.token.token);
    const user = useSelector(state =>state.token.user)

    // const userId = user.userId
    const navigate = useNavigate()
    const [value,setValues]=useState('')
    const dispatch = useDispatch()
    useEffect(()=> {
        const requestApi2 = async()=>{
            try {
                const res = await axiosJwt.get(`/admin/${user.id}`);
                setValues(res.data);
                
              } catch (error) {
                console.error('Error making API request:', error);
              }
        }
        requestApi2()
    },[])
    const onClickLogout = async() => {
        const confirmResult = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, log out!"
          });
        if(confirmResult.isConfirmed){
            try{
                const req = await axios.delete('https://todoappbe-production.up.railway.app/api/v1/logout');
                console.log(req)
                store.dispatch(clearData())
                if(req.status) navigate('/admin')
                
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