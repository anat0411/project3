import React, { useState, useEffect } from "react";
import RenderVacation from "./RenderVacation";
import { useHistory } from "react-router-dom";
import Footer from "../../footer/Footer";
import "./Vacation.css";

function Vacations() {
  const [vacations, setVacations] = useState([]);

  const history = useHistory();

  const getVacations = async () => {
    const res = await fetch("http://localhost:3001/vacations", {
      method: "GET",
      mode: "cors",
      credentials: "include",
    });

    if (res.status === 403) {
      history.push("/login");
    } else {
      const resJson = await res.json();
      console.log(resJson);
      setVacations(resJson);
      console.log(vacations);
    }
  };

  useEffect(() => {
    getVacations();
  }, []);

  console.log(vacations);
  return (
    <div key={vacations.id}>
      <RenderVacation key={vacations.id} data={vacations} />
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}

export default Vacations;
