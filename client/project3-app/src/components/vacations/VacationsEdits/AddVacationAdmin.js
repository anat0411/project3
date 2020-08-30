//React
import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";

//Pages
import config from "../../../config";

function AddVacationAdmin() {
  const [form, setForm] = useState({
    destination: "",
    description: "",
    fromDate: "",
    toDate: "",
    price: "",
    followersNumber: 0,
    image: "",
  });

  const fileInputRef = useRef();
  const history = useHistory();

  const handleForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const files = fileInputRef.current.files;

    const formData = new FormData();
    formData.append("destination", form.destination);
    formData.append("description", form.description);
    formData.append("fromDate", form.fromDate);
    formData.append("toDate", form.toDate);
    formData.append("price", form.price);
    formData.append("followersNumber", form.followersNumber);
    formData.append("image", files[0]);

    if (files.length > 0) {
      const res = await fetch(`${config.general.SERVER_URL}/add/vacation`, {
        method: "POST",
        mode: "cors",
        credentials: "include",
        body: formData,
      });
      const resJson = await res.json();
      if (resJson.success === true) {
        alert("Vacation added!");
        history.push("/vacations/admin");
      } else {
        alert("Somthing went wrong... Check your data");
      }
    }
  };

  const handleVerify = async () => {
    const res = await fetch(`${config.general.SERVER_URL}/auth/admin/verify`, {
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
    <div className="container">
      <h1 className="mt-3 mb-3">Add Vacation</h1>
      <form
        action="/add/vacation"
        method="POST"
        onSubmit={handleSubmit}
        encType="multupart/form-data"
      >
        <div className="mt-1 mb-1">
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
        <div className="mt-1 mb-1">
          <label htmlFor="description">description </label>
          <input
            className="description"
            type="text"
            id="description"
            name="description"
            required
            value={form.description}
            onChange={handleForm}
          />
        </div>
        <div className="mt-1 mb-1">
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
        <div className="mt-1 mb-1">
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
        <div className="mt-1 mb-1">
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
        <div className="mt-1 mb-1">
          <label htmlFor="followersNum">Folowers Number </label>
          <input
            type="number"
            id="followersNumber"
            name="followersNumber"
            required
            value={form.followersNumber}
            onChange={handleForm}
          />
        </div>
        <div className="mt-1 mb-1">
          <label htmlFor="image">Image </label>
          <input
            className="btn btn-outline-dark"
            type="file"
            id="image"
            name="image"
            required
            ref={fileInputRef}
            onChange={handleForm}
          />
        </div>
        <button className="btn btn-success mt-3 mb-3">Submit</button>
      </form>
    </div>
  );
}

export default AddVacationAdmin;
