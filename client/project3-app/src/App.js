import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
//Pages
import MainPage from "./components/mainpage/MainPage";
import Login from "./components/login/Login";
import LoginAdmin from "./components/login/LoginAdmin";
import Register from "./components/register/Register";
import RegisterAdmin from "./components/register/RegisterAdmin";
import Vacations from "./components/vacations/VacationsDisplay/Vacations";
import VacationsAdmin from "./components/vacations/VacationsDisplay/VacationsAdmin";
import AddVacationAdmin from "./components/vacations/VacationsEdits/AddVacationAdmin";
import EditVacationAdmin from "./components/vacations/VacationsEdits/EditVacationAdmin";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <MainPage />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route path="/login/admin">
            <LoginAdmin />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
          {/* <Route path="/register/admin">
            <RegisterAdmin />
          </Route> */}
          <Route exact path="/vacations">
            <Vacations />
          </Route>
          <Route path="/vacations/admin">
            <VacationsAdmin />
          </Route>
          <Route exact path="/add/vacation">
            <AddVacationAdmin />
          </Route>
          <Route exact path="/edit/vacation/:id">
            <EditVacationAdmin />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
