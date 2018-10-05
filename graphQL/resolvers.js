const graphql = require('graphql');
const axios = require('axios');

const schema = require('./schema');
// const db = require('../database/database');

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
} = graphql;


const QueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'All GraphQL queries live here',
  fields: () => ({

    chef: {
      type: schema.ChefType,
      args: {
        id: { type: GraphQLID },
      },
      resolve() {
        // TODO
      },
    },

    chefs: {
      type: new GraphQLList(schema.ChefType),
      resolve(/* root, args */) {
        // TODO
      },
    },

    event: {
      type: schema.EventType,
      args: { id: { type: GraphQLID } },
      resolve() {
        // TODO
      },
    },

    // Modify this to be schedule?
    events: {
      type: new GraphQLList(schema.EventType),
      resolve() {
        // TODO
      },
    },

    itemEvent: {
      type: schema.ItemEventType,
      args: { menuItemId: { type: GraphQLID }, eventId: { type: GraphQLID } },
      resolve() {
        // TODO
      },
    },

    menuItem: {
      type: schema.MenuItemType,
      args: { id: { type: GraphQLID } },
      resolve(root, args) {
        return axios.get('/api/chef/menu', { id: args.chefId });
      },
    },

    menu: {
      type: new GraphQLList(schema.MenuItemType),
      args: { chefId: { type: GraphQLID } },
      resolve(root, args) {
        axios.get('/api/chef/menu', { id: args.chefId });
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
      type: schema.UserType,
      args: {},
      resolve() {},
    },
    users: {
      type: new GraphQLList(schema.UserType),
      resolve() {},
    },

  }),
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    // addChef: {
    //   type: ChefType,
    //   args: {
    //     name: { type: GraphQLString },
    //     username: { type: GraphQLString },
    //     password: { type: GraphQLString },
    //   },
    //   // resolve(parent, args) {
    //   // },
    // },
    // addEvent: {
    //   // type: EventType,
    //   // args: {
    //   // },
    //   // resolve() {
    //   // },
    // },
  },
});

module.exports = new GraphQLSchema({
  query: QueryType,
  mutation: Mutation,
});
