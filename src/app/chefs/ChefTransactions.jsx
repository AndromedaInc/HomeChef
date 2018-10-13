import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';
import moment from 'moment';

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

class ChefTransactions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { chefId } = this.props.location.state;
    return (
      <Query
        query={GET_TRANSACTIONS}
        variables={{ userOrChefId: chefId, userOrChef: 'chef' }}
      >
        {({ loading, error, data }) => {
          if (loading) return 'Loading...';
          if (error) return `Error ${error.message}`;
          if (data) console.log('transactions:', data);

          return (
            <div>
              <h2>My Transactions</h2>
              <Link
                to={{
                  pathname: '/chef',
                  state: { chefId },
                }}
              >
                <button type="button">Back</button>
              </Link>
              <br />
              {data.transactions.map((tran) => {
                return (
                  <div className="transactions" key={tran.id}>
                    {`${moment(tran.createdAt).format('MMM. DD, YYYY')}  |  $${tran.total}  |  ${tran.status}`}
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

export default ChefTransactions;
