//React
import React, { Component } from "react";
import { Link } from "react-router-dom";

//Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen } from "@fortawesome/free-solid-svg-icons";

//config
import config from "../../../config";

export default class RenderVacationAdmin extends Component {
  render() {
    const { onDeleteVacation } = this.props;
    const onDelete = async (id) => {
      const res = await fetch(`http://localhost:3001/delete/vacation/${id}`, {
        method: "DELETE",
        mode: "cors",
        credentials: "include",
      });
      if (res.status === 200) {
        alert("Vacation Deleted!");
        onDeleteVacation(id);
      }
    };

    let url = "";
    const renderVacation = ({
      id,
      description,
      destination,
      price,
      fromDate,
      toDate,
      image,
    }) => (
      (url = `/edit/vacation/${id}`),
      (
        <div
          key={id}
          className="card col-md-4 mt-3 mb-3"
          style={{ width: "18rem" }}
        >
          <div className="row">
            <div className="col-md-1"></div>
            <button
              onClick={() => {
                onDelete(id);
              }}
              className="btn btn-danger col-md-2 mt-1 ml-1 mr-1 mb-1"
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
            <Link
              to={url}
              className="btn btn-secondary col-md-2 mt-1 ml-1 mr-1 mb-1"
            >
              <button>
                <FontAwesomeIcon icon={faPen} />
              </button>
            </Link>
            <div className="col-md-5 mt-1 ml-1 mr-1 mb-1 btn  btn-outline-secondary disabled">
              Vacation ID: {id}
            </div>
          </div>
          <img
            className="card-img-top"
            src={`${config.general.SERVER_URL}/${image}`}
            alt="card image cap"
          />
          <div className="card-body">
            <h4 className="card-title">{destination}</h4>
            <p className="card-text">{description}</p>
            <h6 className="card-text">
              {fromDate} to {toDate}
            </h6>
            <h6 className="card-subtitle mb-2 text-muted">
              {price}$ for 1 person
            </h6>
          </div>
        </div>
      )
    );

    const vacations = this.props.data;
    return (
      <div>
        <div className="row" key={vacations.id}>
          {vacations.map(renderVacation)}
        </div>
      </div>
    );
  }
}
