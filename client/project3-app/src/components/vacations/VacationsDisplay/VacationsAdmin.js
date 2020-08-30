//React
import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";

//Pages
import RenderVacationAdmin from "./RenderVacationAdmin";
import AdminFooter from "../../footer/AdminFooter/AdminFooter";
import config from "../../../config";

//Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faSignOutAlt,
  faHome,
  faChartBar,
} from "@fortawesome/free-solid-svg-icons";

function VacationsAdmin() {
  const [vacations, setVacations] = useState([]);

  const history = useHistory();

  const getVacations = async () => {
    const res = await fetch(`${config.general.SERVER_URL}/vacations/admin`, {
      method: "GET",
      mode: "cors",
      credentials: "include",
    });

    if (res.status === 403) {
      history.push("/login/admin");
    } else {
      const resJson = await res.json();
      setVacations(resJson);
    }
  };

  const logoutAdmin = async () => {
    const res = await fetch(`${config.general.SERVER_URL}/logout/admin`, {
      method: "GET",
      mode: "cors",
      credentials: "include",
    });

    const { success } = await res.json();
    if (success) {
      alert("You have signed out!");
      history.push("");
    } else {
      alert("Somthing went wrong...");
    }
  };

  useEffect(() => {
    getVacations();
  }, []);

  return (
    <div>
      <div className="container">
        <div className="text-left small">
          <Link
            to=""
            className="btn w3-button w3-white w3-border w3-border-black mr-3"
          >
            <FontAwesomeIcon icon={faHome} /> Home
          </Link>
          <Link
            to="/admin/chart"
            className="btn w3-button w3-white w3-border w3-border-black ml-3 mr-3"
          >
            <FontAwesomeIcon icon={faChartBar} /> Followers Chart
          </Link>
          <div
            onClick={logoutAdmin}
            className="btn w3-button w3-white w3-border w3-border-red ml-3"
          >
            <FontAwesomeIcon icon={faSignOutAlt} /> Sign Out
          </div>
        </div>
        <div className="display-4 mt-3 mb-3 pb-3 ">Vacations</div>
        <div className="row">
          <div className="col-md-1 mb-3">
            <Link to="/add/vacation">
              <FontAwesomeIcon icon={faPlus} />
            </Link>
          </div>
        </div>
        <div>
          <RenderVacationAdmin key={vacations.id} data={vacations} />
        </div>
      </div>
      <div className="footer">
        <AdminFooter />
      </div>
    </div>
  );
}

export default VacationsAdmin;
