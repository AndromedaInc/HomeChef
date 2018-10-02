import React from 'react';

const ChefAccountInfo = ({ state }) => {
  const {
    streetAddress,
    city,
    stateName,
    zip,
    cuisine,
    id,
  } = state;

  return (
    <div>
      <h3>Address</h3>
      <div>
        Street Address:
        {streetAddress}
      </div>
      <div>
        City:
        {city}
      </div>
      <div>
        State:
        {stateName}
      </div>
      <div>
        Zip:
        {zip}
      </div>
      <div>
        <h3>Cuisine</h3>
        {cuisine}
      </div>
    </div>
  );
};

export default ChefAccountInfo;
