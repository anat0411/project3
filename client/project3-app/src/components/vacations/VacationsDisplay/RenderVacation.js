//React
import React, { Component } from "react";
import io from "socket.io-client";

//Pages
import config from "../../../config";

export default class RenderVacation extends Component {
  constructor(props) {
    super(props);
    this.socket = null;
    this.state = { sortedVacations: null };
  }

  componentDidMount() {
    this.socket = io.connect(`${config.general.SERVER_URL}`);
  }

  render() {
    const { data, getVacations } = this.props;

    const sortedVacations = data.sort((a, b) => {
      const x = a.follow ? 1 : 0;
      const y = b.follow ? 1 : 0;
      return y - x;
    });

    const followOnClick = (id, follow) => {
      if (follow) {
        this.socket.emit("follow", { vacationId: id, follow: false });
      } else {
        this.socket.emit("follow", { vacationId: id, follow: true });
      }
      setTimeout(() => {
        getVacations();
      }, 500);
    };

    const renderVacation = ({
      id,
      description,
      destination,
      price,
      fromDate,
      toDate,
      image,
      follow,
    }) => (
      <div
        key={id}
        id={id}
        className="card col-md-4 mt-1 mb-3"
        style={{ width: "18rem" }}
      >
        <img className="card-img-top" src={image} alt="card image cap" />
        <div className="card-body" id={id}>
          <h4 className="card-title">{destination}</h4>
          <p className="card-text">{description}</p>
          <h6 className="card-text">
            {fromDate} to {toDate}
          </h6>
          <h6 className="card-subtitle mb-2 text-muted">
            {price}$ for 1 person
          </h6>
          <a
            href="#"
            className="btn btn-primary"
            onClick={() => followOnClick(id, follow)}
          >
            {follow ? <button>Following</button> : <button>Follow</button>}
          </a>
        </div>
      </div>
    );

    return (
      <div>
        <div className="row" key={data.id}>
          {sortedVacations.map((vacation) => renderVacation(vacation))}
        </div>
      </div>
    );
  }
}
