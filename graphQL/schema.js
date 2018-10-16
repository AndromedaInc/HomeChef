import { chefQuery, chefsQuery } from './chefs';
import { eventQuery, eventsQuery } from './events';
import { itemEventQuery, itemEventsQuery, updateItemEventReservations } from './itemEvents';
import { menuItemQuery, menuQuery } from './menuItems';
import { orderQuery, ordersQuery, createOrder } from './orders';
import { transactionQuery, transactionsQuery, createTransaction, updateTransaction } from './transactions';
import { userQuery, usersQuery } from './users';

const graphql = require('graphql');

const { GraphQLSchema, GraphQLObjectType } = graphql;

const QueryType = new GraphQLObjectType({
  name: 'query',
  description: 'All GraphQL queries live here',
  fields: () => ({
    chef: chefQuery,
    chefs: chefsQuery,
    event: eventQuery,
    events: eventsQuery,
    itemEvent: itemEventQuery,
    itemEvents: itemEventsQuery,
    menuItem: menuItemQuery,
    menu: menuQuery,
    order: orderQuery,
    orders: ordersQuery,
    transaction: transactionQuery,
    transactions: transactionsQuery,
    user: userQuery,
    users: usersQuery,
  }),
});

const MutationType = new GraphQLObjectType({
  name: 'mutation',
  fields: {
    updateItemEventReservations,
    createOrder,
    createTransaction,
    updateTransaction,
  },
});

module.exports = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType,
});
