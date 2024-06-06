import Testimonials from "../../assets/Testimonials/Testimonials";
import Footer from "../../components/Footer/Footer";
import Hero from "../../components/Hero/Hero";
import Join from "../../components/Join/Join";
import Plans from "../../components/Plans/Plans";
import Programs from "../../components/Programs/Programs";
import Reasons from "../../components/Reasons/Reasons";

const User =()=> {
    return (
        <div className="App">
          <Hero />
          <Programs />
          <Reasons />
          <Plans />
          <Testimonials />
          <Join />
          {/* <div style = {{margin: "auto"}}><iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3958.3047764559315!2d107.8826394!3d-7.2060283!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68b15988f2cb53%3A0xe4721774ff81080!2sJORDAN%E2%80%99S%20HOUSE%20OF%20TRAMPOLINE!5e0!3m2!1sid!2sid!4v1700396962508!5m2!1sid!2sid" width="600" height="450" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" style={{borderRadius:"10px", border: "5px solid #f48915"}}></iframe>
          </div>
          <div style={{width: '100%',textAlign: 'center',color: 'white'}}> 
            <h3>Jl. Pamoyanan, RT.07/RW.01, Sukagalih, Kec. Tarogong Kidul, Kabupaten Garut, Jawa Barat 44150</h3>
          </div> */}
          <Footer />
          
        </div>
      );
}
export default User