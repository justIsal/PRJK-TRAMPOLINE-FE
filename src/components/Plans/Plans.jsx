import React from "react";
import { plansData } from "../../data/plansData";
import whiteTick from "../../assets/whiteTick.png";
import "./Plans.css";
import Modals from "../Modals/Modals";

const Plans = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div className="plans-container">
      <div className="blur plans-blur-1"></div>
      <div className="blur plans-blur-2"></div>
      <div className="programs-headers" style={{ gap: "2rem" }}>
        <span className="stroke-text">SIAP UNTUK MULAI</span>
        <span>KESEHARIAN ANDA</span>
        <span className="stroke-text">SEKARANG DENGAN KAMI</span>
      </div>

      {/* Plans card */}
      <div className="plans">
        {plansData.map((plan, i) => (
          <div className="plan" key={i}>
            {plan.icon}
            <span>{plan.name}</span>
            <span>$ {plan.price}</span>

            <div className="features">
              {plan.features.map((feature, i) => (
                <div className="feature">
                  <img src={whiteTick} alt="" />
                  <span key={i}>{feature}</span>
                </div>
              ))}
            </div>

            <div>
              <span>Melihat Banyak Benefit</span>
            </div>
            <button className="btn" onClick={()=>handleOpen()}>Join now</button>
          </div>
        ))}
      </div>
      <Modals
        open={open}
        handleClose={handleClose}
      />
    </div>
  );
};

export default Plans;