import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import RenderVacation from "../VacationsDisplay/RenderVacation";

function EditVacationAdmin() {
  const [vacation, setVacation] = useState(undefined);

  const { id } = useParams();
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
      console.log(resJson[0]);
      setVacation(resJson[0]);
    }
  };

  const handleForm = (e) => {
    setVacation({ ...vacation, [e.target.name]: e.target.value });
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
      body: JSON.stringify(vacation),
    });

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

  return (
    <>
      {!!vacation ? (
        <div className="container">
          <h1 className="mt-3 mb-3">Edit vacation {id} </h1>
          <div className="row">
            <div className="h5 col-md-12">
              Change The Info You Want to Change
            </div>
          </div>
          <div className="row">
            <form
              action="/add/vacation"
              method="PUT"
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
                  value={vacation.destination}
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
                  value={vacation.description}
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
                  value={vacation.fromDate.slice(0, 10)}
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
                  value={vacation.toDate.slice(0, 10)}
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
                  value={vacation.price}
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
                  value={vacation.followersNumber}
                  onChange={handleForm}
                />
              </div>
              {/* <div className="mt-1 mb-1">
                <label htmlFor="image">Image </label>
                <input
                  className="btn btn-outline-dark"
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  required
                  value={vacation.image}
                  onChange={handleForm}
                />
              </div> */}
              <button className="btn btn-success mt-3 mb-3">Submit</button>
            </form>
          </div>
        </div>
      ) : (
        <div>Fentching data</div>
      )}
    </>
  );
}

export default EditVacationAdmin;
