import React, { Component } from "react";

export default class RenderVacation extends Component {
  render() {
    const renderVacation = ({
      id,
      description,
      destination,
      price,
      fromDate,
      toDate,
      image,
    }) => (
      <div
        key={id}
        className="card col-md-4 mt-1 mb-1"
        style={{ width: "18rem" }}
      >
        <img className="card-img-top" src={image} alt="card image cap" />
        <div className="card-body">
          <h4 className="card-title">{destination}</h4>
          <p className="card-text">{description}</p>
          <h6 className="card-text">
            {fromDate.slice(0, 10)} to {toDate.slice(0, 10)}
          </h6>
          <h6 className="card-subtitle mb-2 text-muted">
            {price}$ for 1 person
          </h6>
          <a href="#" className="btn btn-primary">
            follow
          </a>
        </div>
      </div>
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
