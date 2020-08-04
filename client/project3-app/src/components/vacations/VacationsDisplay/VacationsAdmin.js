import React, { useState, useEffect } from "react";
import RenderVacationAdmin from "./RenderVacationAdmin";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import contextLoginAdmin from "../../../contexts/contextLoginAdmin";

function VacationsAdmin() {
  const [vacations, setVacations] = useState([]);

  const history = useHistory();

  const getVacations = async () => {
    const res = await fetch("http://localhost:3001/vacations/admin", {
      method: "GET",
      mode: "cors",
      credentials: "include",
    });

    if (res.status === 403) {
      history.push("/login/admin");
    } else {
      const resJson = await res.json();
      console.log(resJson);
      setVacations(resJson);
    }
  };

  useEffect(() => {
    getVacations();
  }, []);

  console.log(vacations);
  return (
    <div className="container">
      <h1>Vacations Admin</h1>
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
  );
}

export default VacationsAdmin;
