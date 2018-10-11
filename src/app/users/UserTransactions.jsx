import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const GET_TRANSACTIONS = gql`
query transactions($userOrChefId: ID!, $userOrChef: String) {
  transactions(userOrChefId: $userOrChefId , userOrChef: $userOrChef ) {
    id,
    status,
    total,
    chefId,
    createdAt,
  }
}
`;

class UserTransactions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { userId } = this.props.location.state;
    return (
      <Query
        query={GET_TRANSACTIONS}
        variables={{ userOrChefId: userId, userOrChef: 'user' }}
      >
        {({ loading, error, data }) => {
          if (loading) return 'Loading...';
          if (error) return `Error ${error.message}`;
          if (data) console.log('transactions:', data);

          return (
            <div>
              <h1>My Transactions</h1>
              {data.transactions.map((tran) => {
                return (
                  <div key={tran.id}>
                    {`${tran.createdAt} $${tran.total} ${tran.status}`}
                  </div>
                );
              })}
            </div>
          );
          // TODO: Add upcoming with event details
        }}
      </Query>
    );
  }
}

export default UserTransactions;
