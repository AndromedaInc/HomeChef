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
    const { user, latitude, longitude } = this.props.location.state;
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
              <br />
              <UpcomingReservations user={user} />
              <h2>Payment History</h2>
              <table>
                <tbody>
                  <tr>
                    <th>Date</th>
                    <th>Transaction ID</th>
                    <th>Amount</th>
                    <th>Payment Status</th>
                    <th>Event Date</th>
                    <th>Purchased From</th>
                    <th>Items</th>
                  </tr>
                  {data.transactions.map(tran => (
                    <tr className="transactions" key={tran.id}>
                      <td>{moment(tran.createdAt).format('MMM. DD, YYYY')}</td>
                      <td>{tran.id}</td>
                      <td>{`$${(+tran.total).toFixed(2)}`}</td>
                      <td>{tran.status}</td>
                      <td>{moment(tran.orders[0].itemEvent.event.date).format('MMM. DD, YYYY')}</td>
                      <td>{tran.chef.name}</td>
                      <td>
                        {tran.orders.map((order) => (
                          <span>
                            {order.itemEvent.menuItem.name}
                            <br />
                          </span>
                        ))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Link
                to={{
                  pathname: '/user',
                  state: { username: user.username, latitude, longitude },
                }}
              >
                <button type="button">Back</button>
              </Link>
            </div>
          );
        }}
      </Query>
    );
  }
}

export { GET_TRANSACTIONS };
export default UserTransactions;
