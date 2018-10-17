// // import ItemEventType from '../itemEvents/itemEvents';
// import ItemEventType from '../schema';

// const graphql = require('graphql');
// const db = require('../../database/database');
// const trans = require('../../database/transactions');

// const {
//   GraphQLObjectType,
//   GraphQLList,
//   GraphQLID,
// } = graphql;

// const OrderType = new GraphQLObjectType({
//   name: 'Order',
//   fields: () => ({
//     id: { type: GraphQLID },
//     userId: { type: GraphQLID },
//     itemEventId: { type: GraphQLID },
//     transactionId: { type: GraphQLID },
//     itemEvent: {
//       type: ItemEventType,
//       resolve(root) {
//         return db.ItemEvent.findById(root.itemEventId);
//       },
//     },
//   }),
// });

// /* **** Queries **** */
// const orderQueries = {
//   order: {
//     type: OrderType,
//     args: { itemEventId: { type: GraphQLID } },
//     resolve(root, args) {
//       return trans.Order.findOne({ where: { itemEventId: args.itemEventId } });
//     },
//   },

//   orders: {
//     type: new GraphQLList(OrderType),
//     args: { userId: { type: GraphQLID } },
//     resolve(root, args) {
//       return trans.Order.findAll({ where: { userId: args.userId } });
//     },
//   },
// };

// /* **** Mutations **** */
// const orderMutations = {
//   createOrder: {
//     type: OrderType,
//     args: {
//       itemEventId: { type: GraphQLID },
//       userId: { type: GraphQLID },
//       transactionId: { type: GraphQLID },
//     },
//     resolve(parent, args) {
//       return trans.Order.create({
//         transactionId: args.transactionId,
//         userId: args.userId,
//         itemEventId: args.itemEventId,
//       });
//     },
//   },
// };

// exports.OrderType = OrderType;
// exports.orderQuery = orderQueries.order;
// exports.ordersQuery = orderQueries.orders;
// exports.createOrder = orderMutations.createOrder;
