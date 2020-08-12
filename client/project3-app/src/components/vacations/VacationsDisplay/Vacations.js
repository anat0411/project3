import React, { useState, useEffect, useContext } from "react";
import RenderVacation from "./RenderVacation";
import { useHistory } from "react-router-dom";
import Footer from "../../footer/Footer";
import contextUserInfo from "../../../contexts/contextUserInfo";
import "./Vacation.css";

function Vacations() {
  const [vacations, setVacations] = useState([]);
  const [info, setInfo] = useState([
    {
      fName: "",
      lName: "",
    },
  ]);

  const contextInfo = useContext(contextUserInfo);

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
    }
  };

  const getInfo = async () => {
    const url = `http://localhost:3001/login/${contextInfo.userName}`;
    const res = await fetch(url, {
      method: "GET",
      mode: "cors",
      credentials: "include",
    });

    const data = await res.json();
    setInfo(data);
  };

  const renderInfo = ({ fName, lName }) => {
    const text = `Hello ${fName} ${lName}! You have just connected `;
    if (fName.length > 1) {
      return <p key={fName}>{text}</p>;
    }
  };

  const logoutUser = async () => {
    const res = await fetch("http://localhost:3001/logout", {
      method: "GET",
      mode: "cors",
      credentials: "include",
    });

    console.log("LOGOUT");

    const { success } = await res.json();
    if (success) {
      alert("You have signed out!");
      history.push("/login");
    } else {
      alert("Somthing went wrong...");
    }
  };

  useEffect(() => {
    getVacations();
    getInfo();
  }, []);

  return (
    <div className="container">
      <div>{info.map(renderInfo)}</div>
      <div className="row">
        <div onClick={logoutUser} className="col-md-2 btn btn-primary">
          Logout
        </div>
      </div>
      <div key={vacations.id}>
        <RenderVacation key={vacations.id} data={vacations} />
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}

export default Vacations;
