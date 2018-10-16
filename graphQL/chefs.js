const graphql = require('graphql');
const db = require('../database/database');

const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
} = graphql;

console.log('I AM IN CHEF! RIGHT NOW!');

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

const chefQueries = {
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
};

exports.ChefType = ChefType;
exports.chefQuery = chefQueries.chef;
exports.chefsQuery = chefQueries.chefs;
