import React from 'react'
import "./colorCard.css";

const ColorCard = props => (
  <div className="card col-s3 colorCardIndividual">
    <div className="img-container" name={props.name} onClick={() => props.handleClicked(props.name)}>
      <img
        alt={props.name}
        src={props.image}
      />
    </div>
  </div>
);

export default ColorCard;