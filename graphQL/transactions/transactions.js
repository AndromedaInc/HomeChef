// // import OrderType from './schema';
// // import OrderType from '../orders/orders';
// // import ChefType from '../chefs/chefSchema';

// const graphql = require('graphql');
// const db = require('../../database/database');
// const trans = require('../../database/transactions');

// const {
//   GraphQLObjectType,
//   GraphQLList,
//   GraphQLString,
//   GraphQLID,
//   GraphQLFloat,
// } = graphql;

// console.log('I AM IN TRANSACTIONS! RIGHT NOW!');

// const TransactionType = new GraphQLObjectType({
//   name: 'Transaction',
//   fields: () => ({
//     id: { type: GraphQLID },
//     userId: { type: GraphQLID },
//     chefId: { type: GraphQLID },
//     status: { type: GraphQLString },
//     total: { type: GraphQLString },
//     tax: { type: GraphQLString },
//     fee: { type: GraphQLString },
//     tip: { type: GraphQLString },
//     createdAt: { type: GraphQLString },
//     chef: {
//       type: ChefType,
//       resolve(root) {
//         return db.Chef.findById(root.chefId);
//       },
//     },
//     orders: {
//       type: new GraphQLList(OrderType), // IS THIS THE PROBLEM? 
//       resolve(root) {
//         return trans.Order.findAll({ where: { transactionId: root.id } });
//       },
//     },
//   }),
// });

// /* **** Queries **** */
// const transactionQueries = {
//   transaction: {
//     type: TransactionType,
//     args: { id: { type: GraphQLID } },
//     resolve(root, args) {
//       return trans.Transaction.findOne({ where: { id: args.id } });
//     },
//   },

//   transactions: {
//     type: new GraphQLList(TransactionType),
//     args: { userOrChefId: { type: GraphQLID }, userOrChef: { type: GraphQLString } },
//     resolve(root, args) {
//       let result;
//       if (args.userOrChef === 'user') {
//         result = trans.Transaction.findAll({
//           where: { userId: args.userOrChefId },
//           order: [['createdAt', 'DESC']],
//         });
//       } else if (args.userOrChef === 'chef') {
//         result = trans.Transaction.findAll({
//           where: { chefId: args.userOrChefId },
//           order: [['createdAt', 'DESC']],
//         });
//       }
//       return result;
//     },
//   },
// };

// /* **** Mutations **** */
// const transactionMutations = {
//   createTransaction: {
//     type: TransactionType,
//     args: {
//       userId: { type: GraphQLID },
//       chefId: { type: GraphQLID },
//     },
//     resolve(parent, args) {
//       return trans.Transaction.create({
//         status: 'pending',
//         userId: args.userId,
//         chefId: args.chefId,
//       });
//     },
//   },

//   updateTransaction: {
//     type: TransactionType,
//     args: {
//       id: { type: GraphQLID },
//       total: { type: GraphQLFloat },
//       tax: { type: GraphQLFloat },
//       fee: { type: GraphQLFloat },
//     },
//     resolve(parent, args) {
//       return trans.Transaction.update(
//         {
//           status: 'paid',
//           total: args.total,
//           tax: args.tax,
//           fee: args.fee,
//         },
//         { where: { id: args.id } },
//       );
//     },
//   },
// };

// exports.TransactionType = TransactionType;
// exports.transactionQuery = transactionQueries.transaction;
// exports.transactionsQuery = transactionQueries.transactions;
// exports.createTransaction = transactionMutations.createTransaction;
// exports.updateTransaction = transactionMutations.updateTransaction;
