const graphql = require('graphql');
const db = require('./../database/database');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
} = graphql;

const ChefType = new GraphQLObjectType({
  name: 'Chef',
  fields: () => ({ // incomplete fields
    chefId: { type: GraphQLID },
    name: { type: GraphQLString },
    imageUrl: { type: GraphQLString },
  }),
});

const MenuType = new GraphQLObjectType({
  name: 'MenuItem',
  fields: () => ({
    menuItemId: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    imageUrl: { type: GraphQLString },
    price: { type: GraphQLInt },
    quantity: { type: GraphQLInt },
    reservations: { type: GraphQLInt },
  }),
});

const ScheduleType = new GraphQLObjectType({
  name: 'ChefSchedule',
  fields: () => ({
    eventId: { type: GraphQLID },
    date: { type: GraphQLString },
    startTime: { type: GraphQLString },
    endTime: { type: GraphQLString },
    chef: {
      type: ChefType,
      resolve(parent, args) {
        // parent is this chefschedule and has all the same properties
        console.log(parent.eventId, args);
        // return query find chefId form this event
      },
    },
    menuItems: {
      type: new GraphQLList(MenuType),
      resolve(parent, args) {
        // return all menu items with this event id
        console.log(parent, args);
        return menuItem;
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    chefSchedule: {
      type: ScheduleType,
      args: { chefId: { type: GraphQLID } },
      resolve(parent, args) {
        const events = db.Event.findAll({ where: { chefId: args.chefId } });
        return events.map(event => ({
          eventId: event.id,
          date: event.date,
          startTime: event.startTime,
          endTime: event.endTime,
          // menuItems: this.menuItems(args.chefId, this.eventId),
        }));
      },
    },
    menuItem: {
      type: MenuType,
      args: { chefId: { type: GraphQLID }, eventId: { type: GraphQLID } },
      resolve(parent, args) {
        const menuItems = db.MenuItem.findAll({
          where: {
            chefId: args.chefId,
            eventId: args.eventId,
          },
        });
        return menuItems.map((item) => {
          const itemEvent = db.ItemEvent.findOne({
            where: {
              eventId: args.eventId,
              menuItemId: item.id,
            },
          });
          return {
            menuItemId: item.id,
            name: item.name,
            description: item.description,
            imageUrl: item.imageUrl,
            price: item.price,
            quantity: itemEvent.quantity,
            reservations: itemEvent.reservations,
          };
        });
      },
    },
    // chef: {
    // },
    // chefs: {
    //   type: new GraphQLList(ChefType),
    //   resolve( /* parent, args */) {
    //     return chefs; // i don't think it needs to be defined... 
    //   },
    // },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
