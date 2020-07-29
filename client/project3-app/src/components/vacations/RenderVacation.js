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
      <div className="container" key={id}>
        <div className="card" style={{ width: "18rem" }}>
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
      </div>
    );

    console.log(this.props.data);
    const vacations = this.props.data;
    return (
      <div>
        <div key={vacations.id}>{vacations.map(renderVacation)}</div>
      </div>
    );
  }
}
