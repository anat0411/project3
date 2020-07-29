import React, { useState } from "react";
import { useHistory } from "react-router-dom";

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
    <div>
      <h1>Register</h1>
      <form action="/register" method="POST" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="fname">First Name </label>
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
          <label htmlFor="lname">Last Name </label>
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
          <label htmlFor="username">User Name </label>
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
          <label htmlFor="password">Password </label>
          <input
            type="password"
            id="password"
            name="password"
            required
            value={form.password}
            onChange={handleForm}
          />
        </div>
        <button>Submit</button>
      </form>
    </div>
  );
}

export default Register;
