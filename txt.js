import React, { Component, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen } from "@fortawesome/free-solid-svg-icons";

function RenderVacationAdmin() {
  const renderVacation = ({
    id,
    description,
    destination,
    price,
    fromDate,
    toDate,
    image,
  }) => (
    <div className="card col-md-4 mt-1 mb-1" style={{ width: "18rem" }}>
      <div className="row">
        <div className="col-md-1"></div>
        <button className="btn btn-danger col-md-2 mt-1 ml-1 mr-1 mb-1">
          <FontAwesomeIcon icon={faTrash} />
        </button>
        <button className="btn btn-secondary col-md-2 mt-1 ml-1 mr-1 mb-1">
          <FontAwesomeIcon icon={faPen} />
        </button>
        <div className="col-md-5 mt-1 ml-1 mr-1 mb-1 btn  btn-outline-secondary disabled">
          Vacation ID: {id}
        </div>
      </div>
      <img className="card-img-top" src={image} alt="card image cap" />
      <div className="card-body">
        <h4 className="card-title">{destination}</h4>
        <p className="card-text">{description}</p>
        <h6 className="card-text">
          {fromDate.slice(0, 10)} to {toDate.slice(0, 10)}
        </h6>
        <h6 className="card-subtitle mb-2 text-muted">{price}$ for 1 person</h6>
      </div>
    </div>
  );

  useEffect(() => {
    renderVacation();
  }, []);

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

export default RenderVacationAdmin;

////

delete ((req, res) => {
  const customerID = req.params.id;

  pool.query(
    "DELETE FROM customers WHERE id=?",
    customerID,
    (err, results, fields) => {
      if (err) throw err;

      res.json({ success: results.affectedRows > 0 });
    }
  );
});
