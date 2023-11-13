import { useEffect } from "react";
import Appshell from "../../components/Appshell/appshell";
import CardHome from "../../components/Card/cardHome";
import './styles.css'
import LocalAtmOutlinedIcon from '@mui/icons-material/LocalAtmOutlined';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import { refreshToken } from "../../api/refreshToken";
import { jwtDecode } from 'jwt-decode';
import { useState } from "react";
import { useSelector } from "react-redux";
import axiosJwt from "../../api/interceptors";
import { store } from "../../redux/store";


const Admin = () => {
  const cardContent = [
    {
      icon:<LocalAtmOutlinedIcon sx={{fontSize: "60px"}}/>,
      number:4000,
      text:"client"
    },
    {
      icon:<LocalAtmOutlinedIcon sx={{fontSize: "60px"}}/>,
      number:4000,
      text:"client"
    },
    {
      icon:<LocalAtmOutlinedIcon sx={{fontSize: "60px"}}/>,
      number:4000,
      text:"client"
    },
    {
      icon:<LocalAtmOutlinedIcon sx={{fontSize: "60px"}}/>,
      number:4000,
      text:"client"
    },
  ]
  const accessToken = useSelector(state => state.token.accessToken);
  const id = useSelector(state => state.token.id);
  const [value,setValues]= useState('')
  const navigate = useNavigate();
  useEffect(()=> {
    const requestApi = async()=>{
      const req = await axiosJwt.get('/admin',{
        headers: { 
          Authorization: `Bearer ${accessToken}`
        }
      });
    }  
    const requestApi2 = async()=>{
      const req = await axiosJwt.get(`/admin`,{
        headers: { 
          Authorization: `Bearer ${accessToken}`
        }
      });
      setValues(req.data)
    }
    requestApi2()
    requestApi()
  },[])
  return (
    <Appshell>
      <div className="card-home">
        {cardContent.map((item,index)=>(
          <CardHome
            key={index}
            icon={item.icon} 
            number={item.number}
            text={item.text} 
          />
        ))}
      </div>
      <div className="line-cart__container"></div>
    </Appshell>
  )
};
export default Admin;