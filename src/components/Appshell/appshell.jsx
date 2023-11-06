import { NavLink } from "react-router-dom"
import NavAdmin from "../NavAdmin/NavAdmin"
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import FolderCopyOutlinedIcon from '@mui/icons-material/FolderCopyOutlined';
import PermContactCalendarOutlinedIcon from '@mui/icons-material/PermContactCalendarOutlined';
import "./appShell.css"
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
            <NavAdmin>
                {children}
            </NavAdmin>
        </div>
    )
}
export default Appshell