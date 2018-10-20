/* **** EXPORTS **** */
exports.organizeSchedule = (data) => {
  const schedule = {};
  data.forEach((itemEvent) => {
    const e = itemEvent.event;
    // find or create event object
    if (!Object.prototype.hasOwnProperty.call(schedule, e.id)) {
      schedule[e.id] = {
        eventId: e.id,
        date: e.date,
        startTime: e.startTime,
        endTime: e.endTime,
        chefId: e.chefId,
        createdAt: e.createdAt,
        updatedAt: e.updatedAt,
        menuItems: [],
      };
    }
    // add itemEvent details to menuItem
    let updatedMenuItem = JSON.stringify(itemEvent.menuItem);
    updatedMenuItem = JSON.parse(updatedMenuItem);
    updatedMenuItem.quantity = itemEvent.quantity;
    updatedMenuItem.reservations = itemEvent.reservations;
    updatedMenuItem.itemEventId = itemEvent.id;

    // add updatedMenuItem to menuItems array;
    schedule[e.id].menuItems.push(updatedMenuItem);
  });

  // convert schedule back into an array
  return Object.values(schedule);
};
