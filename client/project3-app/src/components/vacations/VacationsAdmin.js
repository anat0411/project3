import React, { useState, useEffect } from "react";
import RenderVacation from "./RenderVacation";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import contextLoginAdmin from "../../contexts/contextLoginAdmin";

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
      <div className="">
        <Link to="/add/vacation">Add Vacation</Link>
      </div>
      <div key={vacations.id}>
        <RenderVacation key={vacations.id} data={vacations} />
      </div>
    </div>
  );
}

export default VacationsAdmin;
