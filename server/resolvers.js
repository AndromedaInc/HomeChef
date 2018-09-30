const db = require('./../database/database.js');

// GraphQL resolver function for each API endpoint
export default {
  Query: {
    chefSchedule: (chefId) => {
      const events = db.Event.findAll({ where: { chefId } });
      return events.map(event => ({
        eventId: event.id,
        date: event.date,
        startTime: event.startTime,
        endTime: event.endTime,
        menuItems: this.menuItems(chefId, this.eventId),
      }));
    },

    menuItems: (chefId, eventId) => {
      const menuItems = db.MenuItem.findAll({
        where: {
          chefId,
          eventId,
        },
      });
      return menuItems.map((item) => {
        const itemEvent = db.ItemEvent.findOne({
          where: {
            eventId,
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

  // Mutation: {
  //   AddEvent: () => {},
  //   UpdateEvent: () => {},
  //   AddMenuItem: () => {},
  //   UpdateMenuItem: () => {},
  //   MakeReservation: () => {},
  // },
};
