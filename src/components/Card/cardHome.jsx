import "./card.css"
const CardHome = ({icon,text,number})=> {
    return(
        <div className="card-home__container">
            <div className="card-home__body">
                {icon}
                <div className="card-home__flex">
                    <p className="card-home__flex-number">{number}</p>
                    <p className="card-home__flex-text">{text}</p>
                </div>
            </div>
      </div>
    )
}
export default CardHome;