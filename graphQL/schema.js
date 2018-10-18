import { ChefType, chefQuery, chefsQuery } from './chefs';
import { EventType, eventQuery, eventsQuery } from './events';
import { UserType, userQuery, usersQuery } from './users';
import { MenuItemType, menuItemQuery, menuItemsQuery } from './menuItems';

const graphql = require('graphql');
const db = require('../database/database');
const trans = require('../database/transactions');

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLFloat,
} = graphql;

const ItemEventType = new GraphQLObjectType({
  name: 'ItemEvent',
  fields: () => ({
    id: { type: GraphQLID },
    chefId: { type: GraphQLID },
    menuItemId: { type: GraphQLID },
    eventId: { type: GraphQLID },
    quantity: { type: GraphQLInt },
    reservations: { type: GraphQLInt },
    event: {
      type: EventType,
      resolve(root) {
        return db.Event.findById(root.eventId);
      },
    },
    menuItem: {
      type: MenuItemType,
      resolve(root) {
        return db.MenuItem.findById(root.menuItemId);
      },
    },
  }),
});

const OrderType = new GraphQLObjectType({
  name: 'Order',
  fields: () => ({
    id: { type: GraphQLID },
    userId: { type: GraphQLID },
    itemEventId: { type: GraphQLID },
    transactionId: { type: GraphQLID },
    itemEvent: {
      type: ItemEventType,
      resolve(root) {
        return db.ItemEvent.findById(root.itemEventId);
      },
    },
  }),
});

const TransactionType = new GraphQLObjectType({
  name: 'Transaction',
  fields: () => ({
    id: { type: GraphQLID },
    userId: { type: GraphQLID },
    chefId: { type: GraphQLID },
    status: { type: GraphQLString },
    total: { type: GraphQLString },
    tax: { type: GraphQLString },
    fee: { type: GraphQLString },
    tip: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    chef: {
      type: ChefType,
      resolve(root) {
        return db.Chef.findById(root.chefId);
      },
    },
    orders: {
      type: new GraphQLList(OrderType),
      resolve(root) {
        return trans.Order.findAll({ where: { transactionId: root.id } });
      },
    },
    user: {
      type: UserType,
      resolve(root) {
        return db.User.findById(root.userId);
      },
    },
  }),
});

/* **** Queries **** */
const QueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'All GraphQL queries live here',
  fields: () => ({
    chef: chefQuery,
    chefs: chefsQuery,
    event: eventQuery,
    events: eventsQuery,
    menuItem: menuItemQuery,
    menuItems: menuItemsQuery,
    user: userQuery,
    users: usersQuery,

    itemEvent: {
      type: ItemEventType,
      args: { menuItemId: { type: GraphQLID }, eventId: { type: GraphQLID } },
      resolve(root, args) {
        return db.ItemEvent.findOne({
          where: { menuItemId: args.menuItemId, ieventId: args.eventId },
        });
      },
    },

    itemEvents: {
      type: new GraphQLList(ItemEventType),
      resolve() {
        return db.ItemEvent.findAll();
      },
    },

    order: {
      type: OrderType,
      args: { itemEventId: { type: GraphQLID } },
      resolve(root, args) {
        return trans.Order.findOne({ where: { itemEventId: args.itemEventId } });
      },
    },

    orders: {
      type: new GraphQLList(OrderType),
      args: { userId: { type: GraphQLID } },
      resolve(root, args) {
        return trans.Order.findAll({ where: { userId: args.userId } });
      },
    },

    transaction: {
      type: TransactionType,
      args: { id: { type: GraphQLID } },
      resolve(root, args) {
        return trans.Transaction.findOne({ where: { id: args.id } });
      },
    },

    transactions: {
      type: new GraphQLList(TransactionType),
      args: { userOrChefId: { type: GraphQLID }, userOrChef: { type: GraphQLString } },
      resolve(root, args) {
        let result;
        if (args.userOrChef === 'user') {
          result = trans.Transaction.findAll({
            where: { userId: args.userOrChefId },
            order: [['createdAt', 'DESC']],
          });
        } else if (args.userOrChef === 'chef') {
          result = trans.Transaction.findAll({
            where: { chefId: args.userOrChefId },
            order: [['createdAt', 'DESC']],
          });
        }
        return result;
      },
    },

  }),
});

/* **** Mutations **** */
const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createTransaction: {
      type: TransactionType,
      args: {
        userId: { type: GraphQLID },
        chefId: { type: GraphQLID },
      },
      resolve(parent, args) {
        return trans.Transaction.create({
          status: 'pending',
          userId: args.userId,
          chefId: args.chefId,
        });
      },
    },
    updateTransaction: {
      type: TransactionType,
      args: {
        id: { type: GraphQLID },
        total: { type: GraphQLFloat },
        tax: { type: GraphQLFloat },
        fee: { type: GraphQLFloat },
      },
      resolve(parent, args) {
        return trans.Transaction.update(
          {
            status: 'paid',
            total: args.total,
            tax: args.tax,
            fee: args.fee,
          },
          { where: { id: args.id } },
        );
      },
    },

    createOrder: {
      type: OrderType,
      args: {
        itemEventId: { type: GraphQLID },
        userId: { type: GraphQLID },
        transactionId: { type: GraphQLID },
      },
      resolve(parent, args) {
        return trans.Order.create({
          transactionId: args.transactionId,
          userId: args.userId,
          itemEventId: args.itemEventId,
        });
      },
    },
    updateItemEventReservations: {
      type: ItemEventType,
      args: {
        itemEventId: { type: GraphQLID },
        newReservationCount: { type: GraphQLInt },
      },
      resolve(parent, args) {
        return db.ItemEvent.update(
          { reservations: args.newReservationCount },
          { where: { id: args.itemEventId } },
        );
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: QueryType,
  mutation: Mutation,
});
