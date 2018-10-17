// // import MenuItemType from '../menuItems';
// // import EventType from '../events/events';

// const graphql = require('graphql');
// const db = require('../../database/database');

// const {
//   GraphQLObjectType,
//   GraphQLList,
//   GraphQLID,
//   GraphQLInt,
// } = graphql;

// const ItemEventType = new GraphQLObjectType({
//   name: 'ItemEvent',
//   fields: () => ({
//     id: { type: GraphQLID },
//     chefId: { type: GraphQLID },
//     menuItemId: { type: GraphQLID },
//     eventId: { type: GraphQLID },
//     quantity: { type: GraphQLInt },
//     reservations: { type: GraphQLInt },
//     event: {
//       type: EventType,
//       resolve(root) {
//         return db.Event.findById(root.eventId);
//       },
//     },
//     menuItem: {
//       type: MenuItemType,
//       resolve(root) {
//         return db.MenuItem.findById(root.menuItemId);
//       },
//     },
//   }),
// });

// /* **** Queries **** */
// const itemEventQueries = {
//   itemEvent: {
//     type: ItemEventType,
//     args: { menuItemId: { type: GraphQLID }, eventId: { type: GraphQLID } },
//     resolve(root, args) {
//       return db.ItemEvent.findOne({
//         where: { menuItemId: args.menuItemId, ieventId: args.eventId },
//       });
//     },
//   },

//   itemEvents: {
//     type: new GraphQLList(ItemEventType),
//     resolve() {
//       return db.ItemEvent.findAll();
//     },
//   },
// };

// /* **** Mutations **** */
// const itemEventMutations = {
//   updateItemEventReservations: {
//     type: ItemEventType,
//     args: {
//       itemEventId: { type: GraphQLID },
//       newReservationCount: { type: GraphQLInt },
//     },
//     resolve(parent, args) {
//       return db.ItemEvent.update(
//         { reservations: args.newReservationCount },
//         { where: { id: args.itemEventId } },
//       );
//     },
//   },
// };

// exports.ItemEventType = ItemEventType;
// exports.itemEventQuery = itemEventQueries.itemEvent;
// exports.itemEventsQuery = itemEventQueries.itemEvents;
// exports.updateItemEventReservations = itemEventMutations.updateItemEventReservations;
