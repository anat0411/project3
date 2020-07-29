import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import contextLoginAdmin from "../../contexts/contextLoginAdmin";

function LoginAdmin() {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  let { login } = useContext(contextLoginAdmin);

  useEffect(() => {
    console.log(login);
    if (login) {
      history.push("/vacations/admin");
    }
  }, [login]);

  const history = useHistory();

  const handleForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:3001/login/admin", {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    console.log(data);

    if (data.success) {
      login = true;
      console.log(login);
      alert("Welcome!");
      history.push("/vacations/admin");
    }
  };

  const handleVerify = async () => {
    const res = await fetch("http://localhost:3001/auth/admin/verify", {
      method: "GET",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.status === 200) {
      history.push("/vacations/admin");
    }
  };
  useEffect(() => {
    handleVerify();
  }, []);

  return (
    <div>
      <h1>Login</h1>
      <form action="/login/admin" method="POST" onSubmit={handleSubmit}>
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
        <button>Login</button>
      </form>
    </div>
  );
}

export default LoginAdmin;
