import React, { useState, useEffect, useContext } from "react";
import RenderVacation from "./RenderVacation";
import { useHistory } from "react-router-dom";
import Footer from "../../footer/Footer";
import contextUserInfo from "../../../contexts/contextUserInfo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import io from "socket.io-client";
import "./Vacations.css";

function Vacations() {
  const [vacations, setVacations] = useState([]);
  const [info, setInfo] = useState([
    {
      fName: "",
      lName: "",
    },
  ]);

  const socket = io.connect("http://localhost:3001", { query: "id=user" });

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
      console.log(vacations);
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

  socket.on("updateVacation", function () {
    getVacations();
  });

  return (
    <div>
      <div className="text-left mb-3 mt-3 ml-3">
        <div
          onClick={logoutUser}
          className="btn w3-button w3-white w3-border w3-border-red logoutButton"
        >
          <FontAwesomeIcon icon={faSignOutAlt} /> Sign Out
        </div>
      </div>
      <div className="container">
        <div className="helloText">{info.map(renderInfo)}</div>
        <div className="display-3 mt-3 mb-3 pb-3 ">Vacations</div>
        <div className="vacations mt-3 pt-3" key={vacations.id}>
          <RenderVacation
            key={vacations.id}
            data={vacations}
            getVacations={getVacations}
          />
        </div>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}

export default Vacations;
