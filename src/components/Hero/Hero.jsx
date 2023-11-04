import React from "react";
import "./Hero.css";
import Header from "../Header/Header";
import hero_image from "../../assets/hero_image1.png";
import hero_image_back from "../../assets/hero_image_back.png";
import Heart from "../../assets/heart.png";
import Calories from "../../assets/calories.png";
import { motion } from "framer-motion";
import NumberCounter from "number-counter";
const Hero = () => {
  const transition = { type: "spring", duration: 3 };
  const mobile = window.innerWidth <= 768 ? true : false;
  return (
    <div className="hero" id="home">
      <div className="blur hero-blur"></div>
      <div className="left-h">
        <Header />
        {/* The best add */}
        <div className="the-best-add">
          <motion.div
            initial={{ left: mobile ? "165px" : "238px" }}
            whileInView={{ left: "8px" }}
            transition={{ ...transition, type: "tween" }}
          ></motion.div>
          <span>The best Trampolin Club in the world</span>
        </div>
        {/* hero heading */}
        <div className="hero-text">
          <div>
            <span className="stroke-text">Bentuk</span>
            <span>Tubuh</span>
          </div>
          <div>
            <span>Yang Ideal</span>
          </div>
          <div>
            <span>Ini adalah percobaan yang sangat susah</span>
          </div>
        </div>

        {/* Figures */}
        <div className="figures">
          <div>
            <span>
              <NumberCounter end={140} start={80} delay="3" preFix="+" />
            </span>
            <span>expert coach</span>
          </div>
          <div>
            <span>
              {" "}
              <NumberCounter end={978} start={500} delay="3" preFix="+" />
            </span>
            <span>Member joined</span>
          </div>
          <div>
            <span>
              {" "}
              <NumberCounter end={50} start={0} delay="3" preFix="+" />
            </span>
            <span>Program</span>
          </div>
        </div>

        {/* Herro buttons */}
        <div className="hero-buttons">
          <buttons className="btn">Get Started</buttons>
          <buttons className="btn">Learn more</buttons>
        </div>
      </div>
      <div className="right-h">
        <button className="btn">Join Now</button>
        <motion.div
          initial={{ right: "-1rem" }}
          whileInView={{ right: "4rem" }}
          transition={transition}
          className="heart-rate"
        >
          <img src={Heart} alt="" />
          <span>Heart Rate</span>
          <span>
            <NumberCounter end={116} start={50} delay="2" preFix="" /> bpm
          </span>
        </motion.div>
        {/* hero images */}
        <img src={hero_image} alt="" className="hero-image" />
        <motion.img
          initial={{ right: "11rem" }}
          whileInView={{ right: "20rem" }}
          transition={transition}
          src={hero_image_back}
          alt=""
          className="hero-image-back"
        />
        {/* Calorius */}
        <div className="calories">
          <img src={Calories} alt="" />
          <div>
            <span>Calories Burned</span>
            <span>
              <NumberCounter end={220} start={100} delay="3" preFix="" />
              kcal
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
