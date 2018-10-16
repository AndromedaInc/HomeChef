import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';
import moment from 'moment';
import UpcomingReservations from './UpcomingReservations';

const GET_TRANSACTIONS = gql`
query transactions($userOrChefId: ID!, $userOrChef: String) {
  transactions(userOrChefId: $userOrChefId , userOrChef: $userOrChef ) {
    id
    status
    total
    chefId
    createdAt
    chef {
      name
      streetAddress
      city
      stateName
      zip
    }
    orders {
      id
      itemEvent {
        id
        menuItem {
          name
        }
        event {
          date
          startTime
          endTime
        }
      }
    }
  }
}
`;

class UserTransactions extends React.Component {
  render() {
    console.log('state is', this.state);
    console.log('this.props is', this.props);

    // const { user, user: { id: userId } } = this.props.location.state;
    const { user } = this.props.location.state;
    return (
      <Query
        query={GET_TRANSACTIONS}
        variables={{ userOrChefId: user.id, userOrChef: 'user' }}
      >
        {({ loading, error, data }) => {
          if (loading) return 'Loading...';
          if (error) return 'Oops! Try refreshing.';
          if (data) console.log('transactions:', data);

          return (
            <div className="grid-wide">
              <Link
                to={{
                  pathname: '/user',
                  state: { user },
                }}
              >
                <button type="button">Back</button>
              </Link>
              <br />
              <UpcomingReservations data={data.transactions} />
              <h2>Payment History</h2>
              {data.transactions.map(tran => (
                <div className="transactions" key={tran.id}>
                  {`${moment(tran.createdAt).format('ddd MMM. DD, YYYY')}  |  $${tran.total}  |  ${tran.status}`}
                </div>
              ))}
            </div>
          );
        }}
      </Query>
    );
  }
}

export default UserTransactions;
