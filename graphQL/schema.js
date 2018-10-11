const graphql = require('graphql');
const db = require('../database/database');

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLFloat,
} = graphql;

const ChefType = new GraphQLObjectType({
  name: 'Chef',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    username: { type: GraphQLString },
    password: { type: GraphQLString },
    streetAddress: { type: GraphQLString },
    city: { type: GraphQLString },
    stateName: { type: GraphQLString },
    zip: { type: GraphQLInt },
    description: { type: GraphQLString },
    imageUrl: { type: GraphQLString },
  }),
});

const EventType = new GraphQLObjectType({
  name: 'Event',
  fields: () => ({
    id: { type: GraphQLID },
    chefId: { type: GraphQLID },
    date: { type: GraphQLString },
    startTime: { type: GraphQLString },
    endTime: { type: GraphQLString },
  }),
});


const MenuItemType = new GraphQLObjectType({
  name: 'MenuItem',
  fields: () => ({
    id: { type: GraphQLID },
    chefId: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    price: { type: GraphQLInt },
    imageUrl: { type: GraphQLString },
  }),
});

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

const RatingType = new GraphQLObjectType({
  name: 'Rating',
  fields: () => ({
    // TODO
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
        return db.Order.findAll({ where: { transactionId: root.id } });
      },
    },
  }),
});

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    username: { type: GraphQLString },
    password: { type: GraphQLString },
    imageUrl: { type: GraphQLString },
  }),
});

/* **** Queries **** */
const QueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'All GraphQL queries live here',
  fields: () => ({

    chef: {
      type: ChefType,
      args: { id: { type: GraphQLID } },
      resolve(root, args) {
        return db.Chef.findOne({ where: { id: args.id } });
      },
    },

    chefs: {
      type: new GraphQLList(ChefType),
      resolve() {
        return db.Chef.findAll();
      },
    },

    event: {
      type: EventType,
      args: { id: { type: GraphQLID } },
      resolve(root, args) {
        return db.Event.findOne({ where: { id: args.id } });
      },
    },

    events: {
      type: new GraphQLList(EventType),
      resolve() {
        return db.Event.findAll();
      },
    },

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

    menuItem: {
      type: MenuItemType,
      args: { id: { type: GraphQLID } },
      resolve(root, args) {
        return db.MenuItem.findOne({ where: { id: args.id } });
      },
    },

    menu: {
      type: new GraphQLList(MenuItemType),
      args: { chefId: { type: GraphQLID } },
      resolve(root, args) {
        return db.MenuItem.findAll({ where: { chefId: args.chefId } });
      },
    },

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

    // TODO: add rating & ratings

    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve(root, args) {
        return db.User.findOne({ where: { id: args.id } });
      },
    },
    users: {
      type: new GraphQLList(UserType),
      resolve() {
        return db.User.findAll();
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

exports.ChefType = ChefType;
exports.EventType = EventType;
exports.ItemEventType = ItemEventType;
exports.MenuItemType = MenuItemType;
exports.OrderType = OrderType;
exports.RatingType = RatingType;
exports.TransactionType = TransactionType;
exports.UserType = UserType;

module.exports = new GraphQLSchema({
  query: QueryType,
  mutation: Mutation,
});
