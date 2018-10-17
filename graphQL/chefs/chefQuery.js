// import ChefType from './chefSchema';

// const graphql = require('graphql');
// const db = require('../../database/database');

// const {
//   GraphQLList,
//   GraphQLID,
// } = graphql;

// const chefQueries = {
//   chef: {
//     type: ChefType,
//     args: { id: { type: GraphQLID } },
//     resolve(root, args) {
//       return db.Chef.findOne({ where: { id: args.id } });
//     },
//   },

//   chefs: {
//     type: new GraphQLList(ChefType),
//     resolve() {
//       return db.Chef.findAll();
//     },
//   },
// };

// exports.chefQuery = chefQueries.chef;
// exports.chefsQuery = chefQueries.chefs;
