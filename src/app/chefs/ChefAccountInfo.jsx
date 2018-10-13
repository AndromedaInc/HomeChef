import React from 'react';

const ChefAccountInfo = ({ state }) => {
  const {
    streetAddress,
    city,
    stateName,
    zip,
    description,
  } = state;

  return (
    <div>
      <div>
        <h2>Address</h2>
        {streetAddress}
        {`${city}, ${stateName} ${zip}`}
      </div>
      <div>
        <h2>Cuisine</h2>
        {description}
      </div>
    </div>
  );
};

export default ChefAccountInfo;
