import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';
import moment from 'moment';

const GET_TRANSACTIONS = gql`
query transactions($userOrChefId: ID!, $userOrChef: String) {
  transactions(userOrChefId: $userOrChefId , userOrChef: $userOrChef ) {
    id
    status
    total
    chefId
    createdAt
    user {
      name
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
        }
      }
    }
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
        // pollInterval={60000} // refreshes query every minute
      >
        {({ loading, error, data }) => {
          if (loading) return 'Loading...';
          if (error) return 'Oops! Try refreshing.';
          if (data) console.log('transactions:', data);

          return (
            <div>
              <h2>My Transactions</h2>
              <br />
              <table>
                <tbody>
                  <tr>
                    <th>Date</th>
                    <th>Transaction ID</th>
                    <th>Amount</th>
                    <th>Payment Status</th>
                    <th>Event Date</th>
                    <th>Purchased By</th>
                    <th>Items</th>
                  </tr>
                  {data.transactions.map(tran => (
                    <tr className="transactions" key={tran.id}>
                      <td>{moment(tran.createdAt).format('MMM. DD, YYYY')}</td>
                      <td>{tran.id}</td>
                      <td>{`$${(+tran.total).toFixed(2)}`}</td>
                      <td>{tran.status}</td>
                      <td>{moment(tran.orders[0].itemEvent.event.date).format('MMM. DD, YYYY')}</td>
                      <td>{tran.user.name}</td>
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
                  pathname: '/chef',
                  state: { chefId },
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

export default ChefTransactions;
