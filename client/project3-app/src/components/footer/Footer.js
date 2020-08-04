import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="container">
      <div className="row">
        <a href="https://weather.com/" target="_blank" className="col-md-3">
          Check Weather
        </a>
        <a
          href="https://www.taxionline.international/"
          target="_blank"
          className="col-md-3"
        >
          Order a Taxi
        </a>
        <a
          href="https://www.google.com/maps"
          target="_blank"
          className="col-md-3"
        >
          Google Maps
        </a>
        <a
          href="https://www.xe.com/currencyconverter/"
          target="_blank"
          className="col-md-3"
        >
          Check Currency
        </a>
      </div>
    </div>
  );
};

export default Footer;
