import React, { Component } from 'react';
import './About.css';
import Logo1 from "../svgs/techno.png";
import Logo2 from "../svgs/IIC.png";
import Logo3 from "../svgs/bondhu.png";

class About extends Component {
    state = {  }
    render() { 
        return ( 
            <div style={{maxWidth:"70em", marginTop:"2em"}}>
                <h2 id="about" style={{lineHeight:"1.5em"}}>
                About IIC
                Inspired by the objectives and vision of IIC, a MHRD initiative,
                we have established IIC TMSL which is the start-up support system of Techno Main Slatlake.
                This cell will be conducting various innovation and entrepreneurship related activities along
                with organizing periodic workshops, seminars and interactions with entrepreneurs and innovators.
                Students will get a chance to showcase their talents by participating in various events like Hackathons,
                idea competitions etc. Our motto is to support innovative ideas so well that it can evolve into start-ups.
                </h2>
                <div className="logos">
                    <img src={Logo1}></img>
                    <img src={Logo2}></img>
                    <img src={Logo3}></img>
                </div>
            </div>
         );
    }
}
 
export default About;