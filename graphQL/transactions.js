// import OrderType from './orders';
// import ChefType from './chefs';

const graphql = require('graphql');
const db = require('../database/database');

const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLID,
  GraphQLFloat,
} = graphql;

console.log('I AM IN TRANSACTIONS! RIGHT NOW!');

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
        // TODO: need to reference chefs in other graphql schema
      },
    },
    orders: {
      type: new GraphQLList(OrderType),
      resolve(root) {
        return db.Order.findAll({ where: { transactionId: root.id } });
      },
    },
  }),
});

/* **** Queries **** */
const transactionQueries = {
  transaction: {
    type: TransactionType,
    args: { id: { type: GraphQLID } },
    resolve(root, args) {
      return db.Transaction.findOne({ where: { id: args.id } });
    },
  },

  transactions: {
    type: new GraphQLList(TransactionType),
    args: { userOrChefId: { type: GraphQLID }, userOrChef: { type: GraphQLString } },
    resolve(root, args) {
      let result;
      if (args.userOrChef === 'user') {
        result = db.Transaction.findAll({
          where: { userId: args.userOrChefId },
          order: [['createdAt', 'DESC']],
        });
      } else if (args.userOrChef === 'chef') {
        result = db.Transaction.findAll({
          where: { chefId: args.userOrChefId },
          order: [['createdAt', 'DESC']],
        });
      }
      return result;
    },
  },
};

/* **** Mutations **** */
const transactionMutations = {
  createTransaction: {
    type: TransactionType,
    args: {
      userId: { type: GraphQLID },
      chefId: { type: GraphQLID },
    },
    resolve(parent, args) {
      return db.Transaction.create({
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
      return db.Transaction.update(
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
};

exports.TransactionType = TransactionType;
exports.transactionQuery = transactionQueries.transaction;
exports.transactionsQuery = transactionQueries.transactions;
exports.createTransaction = transactionMutations.createTransaction;
exports.updateTransaction = transactionMutations.updateTransaction;
