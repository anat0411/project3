//React
import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

//Pages
import MainPage from "./components/mainpage/MainPage";
import Login from "./components/login/Login";
import LoginAdmin from "./components/login/LoginAdmin";
import Register from "./components/register/Register";
import Vacations from "./components/vacations/VacationsDisplay/Vacations";
import VacationsAdmin from "./components/vacations/VacationsDisplay/VacationsAdmin";
import AddVacationAdmin from "./components/vacations/VacationsEdits/AddVacationAdmin";
import EditVacationAdmin from "./components/vacations/VacationsEdits/EditVacationAdmin";
import AdminChart from "./components/AdminChart.js/AdminChart";
import contextUserInfo from "./contexts/contextUserInfo";

class App extends Component {
  constructor(props) {
    super(props);

    this.updateUser = (userData) => {
      this.setState({ userName: userData });
    };

    this.state = { userName: "", updateUser: this.updateUser };
  }
  render() {
    return (
      <div className="App">
        <contextUserInfo.Provider value={this.state}>
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
              <Route exact path="/admin/chart">
                <AdminChart />
              </Route>
            </Switch>
          </Router>
        </contextUserInfo.Provider>
      </div>
    );
  }
}

export default App;
