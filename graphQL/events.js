const graphql = require('graphql');
const db = require('../database/database');

const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLID,
} = graphql;

console.log('I AM IN EVENTS! RIGHT NOW!');

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

const eventQueries = {
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
};

exports.EventType = EventType;
exports.eventQuery = eventQueries.event;
exports.eventsQuery = eventQueries.events;
