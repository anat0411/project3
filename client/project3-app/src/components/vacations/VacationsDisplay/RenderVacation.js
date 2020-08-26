import React, { Component } from "react";
import io from "socket.io-client";

export default class RenderVacation extends Component {
  constructor(props) {
    super(props);
    this.state = { follow: false };
    this.socket = null;
  }

  onFollow = () => {
    const data = this.props.data[0].id;
    this.socket.emit("follow", data);
    console.log("SEND");
    console.log(this.socket);
  };
  componentDidMount() {
    this.socket = io.connect("http://localhost:3001");
    console.log(this.socket);
    // this.socket.on("message", (message) => {
    //   console.log(message);
    // });
    // this.socket.send("this is a message to server");
  }
  render() {
    const followOnClick = () => {
      if (this.state.follow === false) {
        this.setState({ follow: true });
        this.onFollow();
      } else {
        this.setState({ follow: false });
        this.onFollow();
      }
    };

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
        className="card col-md-4 mt-1 mb-3"
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
          <a href="#" className="btn btn-primary" onClick={followOnClick}>
            {this.state.follow == false ? (
              <button>Follow</button>
            ) : (
              <button>Follwing</button>
            )}
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
