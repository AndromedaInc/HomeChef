/* **** AUTHENTICATION USING JWT **** */
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const fs = require('fs');

const RSA_PRIVATE_KEY = process.env.RSA_PRIVATE_KEY || fs.readFileSync(`${__dirname}/../config/private.key`);
const RSA_PUBLIC_KEY = process.env.RSA_PUBLIC_KEY || fs.readFileSync(`${__dirname}/../config/public.key`);

const createJWTBearerToken = user => jwt.sign({}, RSA_PRIVATE_KEY, {
  algorithm: 'RS256',
  expiresIn: 600000, // 10 min
  subject: user.id.toString(),
});

const checkIfAuthenticated = expressJwt({
  secret: RSA_PUBLIC_KEY,
  getToken: req => req.cookies.SESSIONID,
}).unless({ path: ['/', '/chefauth', '/userauth'] });


/* **** EXPORTS **** */
exports.createJWTBearerToken = createJWTBearerToken;
exports.checkIfAuthenticated = checkIfAuthenticated;
exports.organizeSchedule = (data) => {
  const schedule = {}; // eventId : { event object }
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

// const sampleScheduleDataFromDatabaseQuery =
// [
//   {
//     "id": 1,
//     "quantity": 20,
//     "reservations": 5,
//     "createdAt": null,
//     "updatedAt": null,
//     "menuItemId": 1,
//     "eventId": 1,
//     "chefId": 1,
//     "event": {
//       "id": 1,
//       "date": "2018/10/31",
//       "startTime": "4:00 PM",
//       "endTime": "6:00 PM",
//       "chefId": 1,
//       "createdAt": null,
//       "updatedAt": null,
//     },
//     "menuItem": {
//       "id": 1,
//       "name": "Pad Thai",
//       "description": "Tasty thai food!",
//       "price": 10,
//       "imageUrl": "thaiimage.com",
//       "chefId": 1,
//     },
//   },
//   {
//     "id": 31,
//     "quantity": 20,
//     "reservations": 2,
//     "createdAt": null,
//     "updatedAt": null,
//     "menuItemId": 21,
//     "eventId": 1,
//     "chefId": 1,
//     "event": {
//       "id": 1,
//       "date": "2018/10/31",
//       "startTime": "4:00 PM",
//       "endTime": "6:00 PM",
//       "chefId": 1,
//       "createdAt": null,
//       "updatedAt": null,
//     },
//     "menuItem": {
//       "id": 21,
//       "name": "Pad See Ew",
//       "description": "Fat noodles are good.",
//       "price": 10,
//       "imageUrl": "padseeewimage.com",
//       "chefId": 1,
//     },
//   },
//   {
//     "id": 41,
//     "quantity": 15,
//     "reservations": 5,
//     "createdAt": null,
//     "updatedAt": null,
//     "menuItemId": 1,
//     "eventId": 21,
//     "chefId": 1,
//     "event": {
//       "id": 21,
//       "date": "2018/10/30",
//       "startTime": "5:00 PM",
//       "endTime": "9:00 PM",
//       "chefId": 1,
//       "createdAt": null,
//       "updatedAt": null,
//     },
//     "menuItem": {
//       "id": 1,
//       "name": "Pad Thai",
//       "description": "Tasty thai food!",
//       "price": 10,
//       "imageUrl": "thaiimage.com",
//       "chefId": 1,
//     },
//   },
// ];
