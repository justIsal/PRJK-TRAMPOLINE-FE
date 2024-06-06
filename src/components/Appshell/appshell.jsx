import { NavLink, useNavigate } from "react-router-dom"
import NavAdmin from "../NavAdmin/NavAdmin"
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import FolderCopyOutlinedIcon from '@mui/icons-material/FolderCopyOutlined';
import PermContactCalendarOutlinedIcon from '@mui/icons-material/PermContactCalendarOutlined';
import ConfirmationNumberOutlinedIcon from '@mui/icons-material/ConfirmationNumberOutlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
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
import Swal from 'sweetalert2';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import CardMembershipOutlinedIcon from '@mui/icons-material/CardMembershipOutlined';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
// import { jwtDecode } from "jwt-decode";
import Logo from "./../../assets/logo3.png"

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
                const req = await axios.delete('http://localhost:5174/logout');
                console.log(req)
                store.dispatch(clearData())
                if(req.status) navigate('/admin')
                
            }catch(err){
                console.log(err)
            }
        }
    };
    const [open, setOpen] = useState(true);
    const [opens, setOpens] = useState(true);
    const [opense, setOpense] = useState(true);

    const handleClick = () => {
      setOpen(!open);
    };
    const handleClicks = () => {
      setOpens(!opens);
    };
    const handleClickse = () => {
      setOpense(!opense);
    };
    return(
        <div className="appshellContainer">
            <div className="sidebar">
                <div className="logo">
                    <img src={Logo} />
                </div>
                <div className="navlist">
                    {/* {dataNav.map((item,index)=>(
                        <ul className="navlist__items" key={index}>
                            <NavLink to={item.path} className="navlist__item">
                                {item.icon} 
                                {item.item} 
                                <span>{item.path == "/admin/pesanan" && data !== 0 ? data : null}</span>
                            </NavLink>
                        </ul>
                    ))} */}
                    <ul className="navlist__items" key={0}>
                        <NavLink to={"/admin/home"} className="navlist__item">
                            <HomeOutlinedIcon /> Home
                        </NavLink>
                    </ul>
                    <ul className="navlist__item" onClick={handleClick}>
                    <ConfirmationNumberOutlinedIcon /> 
                        Order tiket
                        {open ? <ExpandLess style={{position: 'absolute',right: '10px'}}/> : <ExpandMore style={{position: 'absolute',right: '10px'}} />}
                    </ul>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <NavLink className="navlist__item" to="/admin/pesanan" style={{paddingLeft: "40px"}}>
                                    <StarBorder style={{width: "22px"}}/>
                                    Members
                            </NavLink>
                            <NavLink className="navlist__item" to="/admin/pesanan1" style={{paddingLeft: "40px"}}>
                                    <CardMembershipOutlinedIcon style={{width: "22px"}}/>
                                    Reguler
                            </NavLink>

                        </List>
                    </Collapse>

                    <ul className="navlist__item" onClick={handleClicks}>
                    <FolderCopyOutlinedIcon /> 
                        Ticket Management
                        {opens ? <ExpandLess style={{position: 'absolute',right: '10px'}}/> : <ExpandMore style={{position: 'absolute',right: '10px'}} />}
                    </ul>
                    <Collapse in={opens} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <NavLink className="navlist__item" to="/admin/createPesanan" style={{paddingLeft: "40px"}}>
                                <NoteAddOutlinedIcon style={{width: "22px"}}/>
                                Buat tiket
                            </NavLink>
                            <NavLink to={"/admin/rekapPesanan"} className="navlist__item" style={{paddingLeft: "40px"}}>
                                <PermContactCalendarOutlinedIcon style={{width: "22px"}}/>
                                Riwayat tiket
                            </NavLink>
                        </List>
                    </Collapse>
                    {/* <ul className="navlist__items" key={1}>
                        <NavLink to={"/admin/pesanan"} className="navlist__item">
                            <FolderCopyOutlinedIcon /> Tiket pesanan
                        </NavLink>
                    </ul> */}
                    {/* <ul className="navlist__item" onClick={handleClickse}>
                    <ManageAccountsOutlinedIcon /> 
                        Master Data
                        {opense ? <ExpandLess style={{position: 'absolute',right: '10px'}}/> : <ExpandMore style={{position: 'absolute',right: '10px'}} />}
                    </ul>
                    <Collapse in={opense} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <NavLink className="navlist__item" to="/admin/createPesanan" style={{paddingLeft: "40px"}}>
                                <PersonAddOutlinedIcon style={{width: "22px"}}/>
                                create anggota
                            </NavLink>
                            <NavLink to={"/admin/rekapPesanan"} className="navlist__item" style={{paddingLeft: "40px"}}>
                                <PermContactCalendarOutlinedIcon style={{width: "22px"}}/>
                                list anggota
                            </NavLink>
                        </List>
                    </Collapse> */}
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