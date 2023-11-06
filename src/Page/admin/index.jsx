import Appshell from "../../components/Appshell/appshell";
import CardHome from "../../components/Card/cardHome";
import './styles.css'
import LocalAtmOutlinedIcon from '@mui/icons-material/LocalAtmOutlined';
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