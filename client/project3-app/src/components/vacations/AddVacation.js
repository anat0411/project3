import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import contextLoginAdmin from "../../contexts/contextLoginAdmin";

function AddVacations() {
  const [form, setForm] = useState({
    destination: "",
    description: "",
    fromDate: "",
    toDate: "",
    price: "",
    followersNum: "",
    image: "",
  });

  const history = useHistory();

  const handleForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:3001/add/vacation", {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const resJson = await res.json();
    console.log(resJson);
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

    if (res.status === 403) {
      history.push("/login/admin");
    }
  };
  useEffect(() => {
    handleVerify();
  }, []);

  return (
    <div>
      <h1>Add Vacation</h1>
      <form action="/add/vacation" method="POST" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="destination">destination </label>
          <input
            type="text"
            id="destination"
            name="destination"
            required
            value={form.destination}
            onChange={handleForm}
          />
        </div>
        <div>
          <label htmlFor="description">description </label>
          <input
            type="text"
            id="description"
            name="description"
            required
            value={form.description}
            onChange={handleForm}
          />
        </div>
        <div>
          <label htmlFor="username">From Date </label>
          <input
            type="date"
            id="fromDate"
            name="fromDate"
            required
            value={form.fromDate}
            onChange={handleForm}
          />
        </div>
        <div>
          <label htmlFor="toDate">To Date </label>
          <input
            type="date"
            id="toDate"
            name="toDate"
            required
            value={form.toDate}
            onChange={handleForm}
          />
        </div>
        <div>
          <label htmlFor="price">Price </label>
          <input
            type="number"
            id="price"
            name="price"
            required
            value={form.price}
            onChange={handleForm}
          />
        </div>
        <div>
          <label htmlFor="followersNum">Folowers Number </label>
          <input
            type="number"
            id="followersNum"
            name="followersNum"
            required
            value={form.followersNum}
            onChange={handleForm}
          />
        </div>
        <div>
          <label htmlFor="image">Image </label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            required
            value={form.image}
            onChange={handleForm}
          />
        </div>
        <button>Submit</button>
      </form>
    </div>
  );
}

export default AddVacations;
