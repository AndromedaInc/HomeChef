const graphql = require('graphql');
const db = require('../database/database');

const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLID,
} = graphql;

console.log('I AM IN USERS! RIGHT NOW!');

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

const userQueries = {
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
};

exports.UserType = UserType;
exports.userQuery = userQueries.user;
exports.usersQuery = userQueries.users;
