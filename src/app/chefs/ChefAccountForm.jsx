import React from 'react';
// import PropTypes from 'prop-types';

const ChefAccountForm = ({ state, onChange, handleSubmit }) => {
  const {
    streetAddress,
    city,
    stateName,
    zip,
    cuisine,
    id,
  } = state;
  return (
    <form onSubmit={handleSubmit}>
      <h3>Address</h3>
      <label htmlFor="address">
        Street Address:
        <input
          type="text"
          name="streetAddress"
          value={streetAddress}
          onChange={onChange}
        />
      </label>
      <label htmlFor="city">
        City:
        <input
          type="text"
          name="city"
          value={city}
          onChange={onChange}
        />
      </label>
      <label htmlFor="stateName">
        State:
        <input
          type="text"
          name="stateName"
          value={stateName}
          onChange={onChange}
        />
      </label>
      <label htmlFor="zip">
        Zip:
        <input
          type="text"
          name="zip"
          value={zip}
          onChange={onChange}
        />
      </label>
      <br />
      <h3>Cuisine</h3>
      <label htmlFor="cuisine">
        How do you describe your food?
        <input
          type="textarea"
          name="cuisine"
          value={cuisine}
          onChange={onChange}
        />
      </label>
      <br />
      <input type="hidden" name="id" value={id} onChange={onChange} />
    </form>
  );
};

export default ChefAccountForm;
