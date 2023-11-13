import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import "./NavAdmin.css"
const NavAdmin = ({name,children})=> {
    return(
        <div className="navContainer">
            <div className="navContent-container">
                <div className="navContent">
                    {name} <AccountCircleOutlinedIcon sx={{fontSize: "40px"}}/>
                </div>
            </div>
            <div className="main-content">
                {children}
            </div>
        </div>
    )
}
export default NavAdmin