const graphql = require('graphql');
const db = require('../database/database');

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
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
    // menuItems: {
    //   type: new GraphQLList(MenuType),
    //   resolve:
    // }
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

const OrderType = new GraphQLObjectType({
  name: 'Order',
  fields: () => ({
    // TODO
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
    // TODO
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

const ScheduleType = new GraphQLObjectType({
  name: 'ChefSchedule',
  fields: () => ({
    eventId: { type: GraphQLID },
    date: { type: GraphQLString },
    startTime: { type: GraphQLString },
    endTime: { type: GraphQLString },
    // chef: {
    //   type: ChefType,
    //   resolve(parent, args) {
    //     // parent is this chefschedule and has all the same properties
    //     // return query find chefId form this event
    //     // return db.Event.findById(args.chefId);
    //   },
    // },
    // menuItems: {
    //   type: new GraphQLList(MenuType),
    //   resolve(parent, args) {
    //     // return all menu items with this event id
    //     console.log(parent, args);
    //     return menuItem;
    //   },
    // },
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

    // Modify this to be schedule?
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

    // TODO: add these:
    // order
    // orders
    // rating
    // ratings
    // transaction
    // transactions

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
// const Mutation = new GraphQLObjectType({
//   name: 'Mutation',
//   fields: {
//     // addChef: {
//     //   type: ChefType,
//     //   args: {
//     //     name: { type: GraphQLString },
//     //     username: { type: GraphQLString },
//     //     password: { type: GraphQLString },
//     //   },
//     //   // resolve(parent, args) {
//     //   // },
//     // },
//     // addEvent: {
//     //   // type: EventType,
//     //   // args: {
//     //   // },
//     //   // resolve() {
//     //   // },
//     // },
//   },
// });

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
  // mutation: Mutation,
});
