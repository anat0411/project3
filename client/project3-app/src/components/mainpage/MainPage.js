import React from "react";
import { Link } from "react-router-dom";
import "./mainpage.css";
import Footer from "../footer/Footer";

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
        <h1 className="pagetitle">Vacations</h1>
        <h2 className="sub-title">Vacation, Water, Fun</h2>
        <p className="paragraph-title textfont">
          Here you could find the perfect vacation for you, from a big variety
          of special vacations on the water
        </p>
        <div className="row">
          <div className="col-md-6 textfont option">
            <Link to="/login">Login</Link>
          </div>
          <div className="col-md-6 textfont option">
            <Link to="/register">Register</Link>
          </div>
        </div>
        <div className="footer">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default MainPage;
