import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";

function AdminFooter() {
  return (
    <div className="footerText">
      <footer className="page-footer topFooter mt-3">
        <div className="container-fluid text-center">
          <div>
            <div className="font-weight-bold pt-1">For Technical Supprot</div>
          </div>
          <div className="row">
            <p className="textContact mt-0 mb-0 pb-1 pt-1 col-md-12">
              <FontAwesomeIcon icon={faPhone} /> 202-555-0169
            </p>
          </div>
          <div className="row">
            <p className="textContact mt-0 mb-0 pb-1 col-md-12">
              <FontAwesomeIcon icon={faEnvelope} />{" "}
              Vacationsonthewater@example.com
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default AdminFooter;
