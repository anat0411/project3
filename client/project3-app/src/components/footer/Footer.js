import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faMap, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";

import "./Footer.css";

const Footer = () => {
  return (
    <footer className="page-footer pt-1 footerText topFooter">
      <div className="container-fluid text-center text-md-left">
        <div className="row">
          <div className="col-md-6">
            <h6 className="titleAbout">About Us</h6>
            <p className="textAbout">
              The company "Vacations on the Water" was founded by Kobi Locos in
              1978, after he worked as a travel agent for two decades. The
              company was first based in Milan, but after 25 years moved to
              Rome, where the company is based today. Since day one, the main
              thing we love offering to our costumers are amazing vacations on
              the water!
            </p>
          </div>
          <hr className="clearfix w-100 d-md-none" />
          <div className="col-md-2">
            <ul className="list-unstyled">
              <li>
                <a
                  className="textContact"
                  href="https://www.xe.com/currencyconverter/"
                  target="_blank"
                >
                  Check Currency
                </a>
              </li>
              <li>
                <a
                  className="textContact"
                  href="https://www.taxionline.international/"
                  target="_blank"
                >
                  Order a Taxi
                </a>
              </li>
              <li>
                <a
                  className="textContact"
                  href="https://weather.com/"
                  target="_blank"
                >
                  Check Weather
                </a>
              </li>
            </ul>
          </div>
          <div className="col-md-3">
            <ul className="list-unstyled">
              <li>
                <p className="textContact mt-0 mb-0 pb-1">
                  Monday - Friday 09:00 - 16:00/16:30.
                </p>
              </li>
              <li>
                <p className="textContact mt-0 mb-0 pb-1">
                  <FontAwesomeIcon icon={faPhone} /> +1-202-555-0127
                </p>
              </li>
              <li>
                <a
                  className="textContact mt-0 mb-0 pb-1"
                  href="https://www.google.com/maps/@41.8954454,12.497099,3a,75y,279.5h,90t/data=!3m7!1e1!3m5!1sA4R3UMauHw4cYXc9S_bwYg!2e0!6s%2F%2Fgeo2.ggpht.com%2Fcbk%3Fpanoid%3DA4R3UMauHw4cYXc9S_bwYg%26output%3Dthumbnail%26cb_client%3Dsearch.revgeo_and_fetch.gps%26thumb%3D2%26w%3D96%26h%3D64%26yaw%3D279.49722%26pitch%3D0%26thumbfov%3D100!7i16384!8i8192"
                >
                  <FontAwesomeIcon icon={faMap} /> 36 Via dei Quattro Canton,
                  Rome
                </a>
              </li>
            </ul>
          </div>
          <div className="col-md-1">
            <a
              className="contactMedia row text-center mb-3"
              href="https://www.facebook.com"
              target="_blank"
            >
              <FontAwesomeIcon icon={faFacebook} />
            </a>
            <a
              className="contactMedia row mb-3"
              href="https://www.instagram.com"
              target="_blank"
            >
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a
              className="contactMedia row"
              href="https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=abc@example.com"
              target="_blank"
            >
              <FontAwesomeIcon icon={faEnvelope} />
            </a>
          </div>
        </div>
        <div className="footer-copyright text-center pb-1 copyrightText">
          © 2020 Copyright:
          <a href="https://www.google.com/" target="_blank">
            anat.aig
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
