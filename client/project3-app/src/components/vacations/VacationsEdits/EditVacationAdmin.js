import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import RenderVacation from "../VacationsDisplay/RenderVacation";

function EditVacationAdmin() {
  const [vacation, setVacation] = useState([]);
  const [form, setForm] = useState({
    destination: "",
    description: "",
    fromDate: "",
    toDate: "",
    price: "",
    followersNum: "",
    image: "",
  });
  const { id } = useParams();
  console.log(id);
  const history = useHistory();

  const getVacation = async () => {
    const res = await fetch(`http://localhost:3001/get/vacation/edit/${id}`, {
      method: "GET",
      mode: "cors",
      credentials: "include",
    });
    if (res.status === 403) {
      history.push("/login/admin");
    } else {
      const resJson = await res.json();
      console.log(resJson);
      setVacation(resJson);
    }
  };

  const handleForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`http://localhost:3001/edit/vacation/${id}`, {
      method: "PUT",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    console.log(form);
    const resJson = await res.json();
    console.log(resJson);
    if (resJson) {
      history.push("/vacations/admin");
    } else {
      alert("Somthing went wrong... Check your data");
    }
  };

  useEffect(() => {
    getVacation();
  }, []);

  console.log(vacation);

  const vacationData = vacation;
  console.log(vacationData);
  return (
    <div className="container">
      <h1 className="mt-3 mb-3">Edit vacation {id} </h1>
      <div className="row">
        <div className="h5 col-md-6">Existing Vacation Info</div>
        <div className="h5 col-md-6">Change The Info You Want to Change</div>
      </div>
      <div className="row">
        <div className="col-md-8">
          <RenderVacation key={vacation.id} data={vacation} />
        </div>
        <div className="col-md-4">
          <form action="/add/vacation" method="PUT" onSubmit={handleSubmit}>
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
                id="followersNum"
                name="followersNum"
                required
                value={form.followersNum}
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
                accept="image/*"
                required
                value={form.image}
                onChange={handleForm}
              />
            </div>
            <button className="btn btn-success mt-3 mb-3">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditVacationAdmin;
