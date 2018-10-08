import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const GET_TRANSACTIONS = gql`
  {
    transactions(userOrChefId: ${this.props.location.state.chefId}, userOrChef: "chef" ) {
      id,
      status,
    }
  }
`;

const ChefTransactions = () => (
  <Query
    query={GET_TRANSACTIONS}
  >
    {({ loading, error, data }) => {
      if (loading) return 'Loading...';
      if (error) return `Error ${error.message}`;
      if (data) console.log(data);

      return (
        <div>
          <h1>My Transactions</h1>
          <h3>Upcoming Events</h3>
            transactions with future date/time
            -chef and address
            -date/time
            -meals
            -total cost
          <h3>Pending Transactions</h3>
            transactions with pending status
          <h3>Past Events</h3>
            transactions with past date/time
        </div>
      );
    }}
  </Query>
);

export default ChefTransactions;
