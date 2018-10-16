// import ItemEventType from './itemEvents';

const graphql = require('graphql');
const db = require('../database/database');

const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
} = graphql;

console.log('I AM IN ORDERS! RIGHT NOW!');

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
        // TODO: need to reference itemEvent in other graphql schema
        return db.ItemEvent.findById(root.itemEventId);
      },
    },
  }),
});

/* **** Queries **** */
const orderQueries = {
  order: {
    type: OrderType,
    args: { itemEventId: { type: GraphQLID } },
    resolve(root, args) {
      return db.Order.findOne({ where: { itemEventId: args.itemEventId } });
    },
  },

  orders: {
    type: new GraphQLList(OrderType),
    args: { userId: { type: GraphQLID } },
    resolve(root, args) {
      return db.Order.findAll({ where: { userId: args.userId } });
    },
  },
};

/* **** Mutations **** */
const orderMutations = {
  createOrder: {
    type: OrderType,
    args: {
      itemEventId: { type: GraphQLID },
      userId: { type: GraphQLID },
      transactionId: { type: GraphQLID },
    },
    resolve(parent, args) {
      return db.Order.create({
        transactionId: args.transactionId,
        userId: args.userId,
        itemEventId: args.itemEventId,
      });
    },
  },
};

exports.OrderType = OrderType;
exports.orderQuery = orderQueries.order;
exports.ordersQuery = orderQueries.orders;
exports.createOrder = orderMutations.createOrder;
