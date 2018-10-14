const graphql = require('graphql');
const db = require('../../database/database');

const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
} = graphql;

console.log('I AM IN MENU ITEMS! RIGHT NOW!');

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

const menuItemQueries = {
  menuItem: {
    type: MenuItemType,
    args: { id: { type: GraphQLID } },
    resolve(root, args) {
      return db.MenuItem.findOne({ where: { id: args.id } });
    },
  },

  menuItems: {
    type: new GraphQLList(MenuItemType),
    args: { chefId: { type: GraphQLID } },
    resolve(root, args) {
      return db.MenuItem.findAll({ where: { chefId: args.chefId } });
    },
  },
};

exports.MenuItemType = MenuItemType;
exports.menuItemQuery = menuItemQueries.menuItem;
exports.menuItemsQuery = menuItemQueries.menuItems;
