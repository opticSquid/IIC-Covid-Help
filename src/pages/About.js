import React, { Component } from "react";
import "./About.css";
import Logo1 from "../svgs/techno.png";
import Logo2 from "../svgs/IIC.png";
import Logo3 from "../svgs/bondhu.png";
import Soumalya from "../svgs/Soumalya.jpg";
import Rohit from "../svgs/Rohit.png";
import Indranil from "../svgs/Indranil.jpg";
import Payel from "../svgs/Payel.jpg";
import Vikas from "../svgs/Vikas.jpg";
import Sayan from "../svgs/Sayan.jpg";

class About extends Component {
  state = {};
  render() {
    return (
      <div style={{ maxWidth: "70em", marginTop: "2em" }}>
        <h2 id="about" style={{ lineHeight: "1.5em" }}>
          About IIC Inspired by the objectives and vision of IIC, a MHRD
          initiative, we have established IIC TMSL which is the start-up support
          system of Techno Main Slatlake. This cell will be conducting various
          innovation and entrepreneurship related activities along with
          organizing periodic workshops, seminars and interactions with
          entrepreneurs and innovators. Students will get a chance to showcase
          their talents by participating in various events like Hackathons, idea
          competitions etc. Our motto is to support innovative ideas so well
          that it can evolve into start-ups.
        </h2>
        <h2 id="about_bondhu" style={{ lineHeight: "1.5em" }}>
          myBondhu has always been by the side of people in times of need and
          emerged as a prominent social welfare tool in the recent pandemic
          situation across the city and beyond. With this new initiative,
          myBondhu, along with IIC TMSL wishes to address the grave concern of
          every medical concern required by patients all across. A geo location
          based platform, myBondhu shall now be the one-stop destination for the
          availability of hospital beds, oxygen cylinders and medical contacts
          all across. We are committed towards giving back to the community with
          the social initiatives that call upon us, as duty, in these difficult
          times.
        </h2>
        <div className="logos">
          <img src={Logo1} alt="logo1"></img>
          <img src={Logo2} alt="logo2"></img>
          <img src={Logo3} alt="logo3"></img>
        </div>
        <h2 style={{ marginBottom: "1em" }}>Contributors:</h2>
        <div className="contributors">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              textAlign: "center",
            }}
          >
            <img src={Soumalya} alt="pic1"></img>
            <h3 className="name">Soumalya</h3>
            <p className="position" style={{ maxWidth: "10em" }}>
              Backend Developer and Database Admin
            </p>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              textAlign: "center",
            }}
          >
            <img src={Rohit} alt="pic2"></img>
            <h3 className="name">Rohit</h3>
            <p className="position" style={{ maxWidth: "10em" }}>
              Front end Developer
            </p>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              textAlign: "center",
            }}
          >
            <img src={Vikas} alt="pic3"></img>
            <h3 className="name">Vikas</h3>
            <p className="position" style={{ maxWidth: "10em" }}>
              Front end Developer
            </p>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              textAlign: "center",
            }}
          >
            <img src={Sayan} alt="pic4"></img>
            <h3 className="name">Sayan</h3>
            <p className="position" style={{ maxWidth: "10em" }}>
              Front end Developer
            </p>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              textAlign: "center",
            }}
          >
            <img src={Indranil} alt="pic5"></img>
            <h3 className="name">Indranil</h3>
            <p className="position" style={{ maxWidth: "10em" }}>
              Desktop UI Designer
            </p>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              textAlign: "center",
            }}
          >
            <img src={Payel} alt="pic6"></img>
            <h3 className="name">Payel</h3>
            <p className="position" style={{ maxWidth: "10em" }}>
              Mobile UI Designer
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default About;
