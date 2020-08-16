import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import Footer from "../footer/Footer";
import "./Register.css";

function Register() {
  const [form, setForm] = useState({
    username: "",
    password: "",
    fname: "",
    lname: "",
  });
  const history = useHistory();

  const handleForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:3001/register", {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (data.success) {
      history.push("/login");
    }
  };

  return (
    <div className="register">
      <div className="container ">
        <div className="text-left small">
          <Link to="" className=" ml-2 mt-2 btn btn-outline-dark btn-sm">
            Home
          </Link>
        </div>
        <div className="display-4 mt-3 mb-3 pb-3">Sign Up</div>
        <form action="/register" method="POST" onSubmit={handleSubmit}>
          <div>
            <label className="" htmlFor="fname">
              First Name:
            </label>
            <input
              type="text"
              id="fname"
              name="fname"
              required
              value={form.fname}
              onChange={handleForm}
            />
          </div>
          <div>
            <label htmlFor="lname">Last Name: </label>
            <input
              type="text"
              id="lname"
              name="lname"
              required
              value={form.lname}
              onChange={handleForm}
            />
          </div>
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
          <button className="btn btn-success">Submit</button>
        </form>
        <div>
          <div className="accountVerify">Already Have an Account?</div>
          <button className="btn btn-outline-success font-weight-bold">
            <Link to="/login">Sign In</Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;
