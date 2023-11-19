import { Link } from "react-router-dom";
import "./card.css"

const CardHome = ({icon,text,number,background,to})=> {
    return(
        <Link to={to} className={`card-home__container ${background}`}>
            <div className="card-home__body">
                {icon}
                <div className="card-home__flex">
                    <p className="card-home__flex-number">{number}</p>
                    <p className="card-home__flex-text">{text}</p>
                </div>
            </div>
        </Link>
    )
}
export default CardHome;