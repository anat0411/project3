import React from "react";
import { Link } from "react-router-dom";
import "./mainpage.css";
import Footer from "../footer/Footer";
import imgMaldives from "./maldives.jpg";
import imgThailand from "./thailand.jpg";
import imgThailand2 from "./thailand2.jpg";

const MainPage = () => {
  return (
    <div className="page">
      <div className="conatiner">
        <div className="small text-left ml-2 mt-2 textfont">
          <Link to="/login/admin">Admin Login</Link>
        </div>
        {/* <div className="small text-left ml-2 mt-2">
          <Link to="/register/admin">Admin Register</Link>
        </div> */}
        <h1 className="pagetitle">Vacations On The Water</h1>
        <h2 className="sub-title">Vacation, Water, Fun</h2>
        <p className="paragraph-title textfont">
          Here you could find the perfect vacation for you, from a big variety
          of special vacations on the water
        </p>
        <div className="row">
          <div className="col-md-4 mb-3">
            <img className="maldivesImg mb-3" src={imgMaldives} />
          </div>
          <div className="col-md-4">
            <img className="maldivesImg mb-3" src={imgThailand} />
          </div>
          <div className="col-md-4">
            <img className="maldivesImg mb-3" src={imgThailand2} />
          </div>
        </div>
        <div className="row">
          <div className="col-md-4 mb-3">
            <img className="maldivesImg mb-3" src={imgMaldives} />
          </div>
          <div className="col-md-4">
            <img className="maldivesImg mb-3" src={imgThailand} />
          </div>
          <div className="col-md-4">
            <img className="maldivesImg mb-3" src={imgThailand2} />
          </div>
        </div>
        <div className="mt-3 pt-3">
          <div className="btn btn-success w3-round-xlarge w3-xxxlarge w3-padding-large">
            <Link to="/register">Let's Get Started!</Link>
          </div>
        </div>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
};

export default MainPage;
