import React from "react";
import "./Reasons.css";
import image1 from "../../assets/image11.png";
import image2 from "../../assets/image22.png";
import image3 from "../../assets/image33.png";
import image4 from "../../assets/image44.png";
import nb from "../../assets/nb.png";
import adidas from "../../assets/adidas.png";
import nike from "../../assets/nike.png";
import tick from "../../assets/tick.png";

const Reasons = () => {
  return (
    <div className="Reasons" id="reasons">
      <div className="left-r">
        <img src={image1} alt="" />
        <img src={image2} alt="" />
        <img src={image3} alt="" />
        <img src={image4} alt="" />
      </div>
      <div className="right-r">
        <span>Some reason</span>
        <div>
          <span className="stroke-text">kenapa</span>
          <span>Pilih Kami</span>
        </div>
        <div className="details-r">
          <div>
            <img src={tick} alt=""></img>
            <span>SUASANA & SENSASI BARU BEROLAHRAGA TRAMPOLIN</span>
          </div>
          <div>
            <img src={tick} alt="" />
            <span>TEMPAT NYAMAN & MUDAH DIJANGKAU</span>
          </div>
          <div>
            <img src={tick} alt="" />
            <span>COACH YANG MENYENANGKAN & BERPENGALAMAN</span>
          </div>
          <div>
            <img src={tick} alt="" />
            <span>SELALU ADA DOORPRIZE SETIAP HARINYA</span>
          </div>
        </div>
        <span
          style={{
            color: "var(--gray)",
            fontWeight: "normal",
          }}
        >
          OUR PARTNERS
        </span>
        <div className="partners">
          <img src={nb} alt="" />
          <img src={adidas} alt="" />
          <img src={nike} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Reasons;
