import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import contextLogin from "../../contexts/contextLogin";
import contextUserInfo from "../../contexts/contextUserInfo";
import Footer from "../footer/Footer";
import { Link } from "react-router-dom";
import "./Login.css";

function Login() {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  let login = false;
  let { userName, updateUser } = useContext(contextUserInfo);

  useEffect(() => {
    console.log(login);
    if (login) {
      history.push(`/vacations`);
    }
  }, [login]);

  const history = useHistory();

  const handleForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:3001/login", {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    updateUser(form.username);

    const data = await res.json();
    console.log(data);

    if (data.success) {
      login = true;
      console.log(login);
      // alert("Welcome!");
      history.push(`vacations`);
    }
  };

  const handleVerify = async () => {
    const res = await fetch("http://localhost:3001/auth/verify", {
      method: "GET",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.status === 200) {
      history.push("/vacations");
    }
  };
  useEffect(() => {
    handleVerify();
  }, []);

  return (
    <div className="login">
      <div className="container">
        <div className="text-left small">
          <Link to="" className=" ml-2 mt-2 btn btn-outline-dark btn-sm">
            Home
          </Link>
        </div>
        <div className="display-4 mt-3 mb-3 pb-3 ">Sign In</div>
        <form action="/login" method="POST" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">User Name: </label>
            <input
              type="text"
              id="username"
              name="username"
              required
              value={form.username}
              onChange={handleForm}
            />
          </div>
          <div>
            <label htmlFor="password">Password: </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              value={form.password}
              onChange={handleForm}
            />
          </div>
          <button className="btn btn-success btn-lg">Login</button>
        </form>
        <div>
          <div className="accountVerify">Don't Have an Account?</div>
          <button className="btn btn-outline-success font-weight-bold">
            <Link to="/register">Sign Up</Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
