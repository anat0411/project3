import React, { Component, Redirect } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen } from "@fortawesome/free-solid-svg-icons";
import config from "../../../config";

export default class RenderVacationAdmin extends Component {
  render() {
    const onDelete = async (id) => {
      const res = await fetch(`http://localhost:3001/delete/vacation/${id}`, {
        method: "DELETE",
        mode: "cors",
        credentials: "include",
      });
      console.log(res);
      if (res.status === 200) {
        alert("Vacation Deleted!");
        // history.push("/vacations/admin");
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
          className="card col-md-4 mt-1 mb-1"
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

    console.log(this.props.data);
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

// import React, { Component, useEffect, useState } from "react";
// import { useHistory } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faTrash, faPen } from "@fortawesome/free-solid-svg-icons";

// function RenderVacationAdmin() {
//   const [vacations, setVacations] = useState([]);

//   const renderVacation = ({
//     id,
//     description,
//     destination,
//     price,
//     fromDate,
//     toDate,
//     image,
//   }) => (
//     <div className="card col-md-4 mt-1 mb-1" style={{ width: "18rem" }}>
//       <div className="row">
//         <div className="col-md-1"></div>
//         <button className="btn btn-danger col-md-2 mt-1 ml-1 mr-1 mb-1">
//           <FontAwesomeIcon icon={faTrash} />
//         </button>
//         <button className="btn btn-secondary col-md-2 mt-1 ml-1 mr-1 mb-1">
//           <FontAwesomeIcon icon={faPen} />
//         </button>
//         <div className="col-md-5 mt-1 ml-1 mr-1 mb-1 btn  btn-outline-secondary disabled">
//           Vacation ID: {id}
//         </div>
//       </div>
//       <img className="card-img-top" src={image} alt="card image cap" />
//       <div className="card-body">
//         <h4 className="card-title">{destination}</h4>
//         <p className="card-text">{description}</p>
//         <h6 className="card-text">
//           {fromDate.slice(0, 10)} to {toDate.slice(0, 10)}
//         </h6>
//         <h6 className="card-subtitle mb-2 text-muted">{price}$ for 1 person</h6>
//       </div>
//     </div>
//   );

//   useEffect(() => {
//     setVacations(this.props.data);
//   }, []);

//   return (
//     <div>
//       <div className="row" key={vacations.id}>
//         {vacations.map(renderVacation)}
//       </div>
//     </div>
//   );
// }

// export default RenderVacationAdmin;
