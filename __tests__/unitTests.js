import util from '../server/util';

describe('Util organizeSchedule Tests', () => {
  const sampleInputData = [
    {"id": 1, "quantity": 20, "reservations": 5, "createdAt": null, "updatedAt": null, "menuItemId": 1, "eventId": 1, "chefId": 1, "event": { "id": 1, "date": "2018/10/31", "startTime": "4:00 PM", "endTime": "6:00 PM", "chefId": 1, "createdAt": null, "updatedAt": null, }, "menuItem": { "id": 1, "name": "Pad Thai", "description": "Tasty thai food!", "price": 10, "imageUrl": "thaiimage.com", "chefId": 1, }, },
    { "id": 31, "quantity": 20, "reservations": 2, "createdAt": null, "updatedAt": null, "menuItemId": 21, "eventId": 1, "chefId": 1, "event": { "id": 1, "date": "2018/10/31", "startTime": "4:00 PM", "endTime": "6:00 PM", "chefId": 1, "createdAt": null, "updatedAt": null, }, "menuItem": { "id": 21, "name": "Pad See Ew", "description": "Fat noodles are good.", "price": 10, "imageUrl": "padseeewimage.com", "chefId": 1, }, },
    { "id": 41, "quantity": 15, "reservations": 5, "createdAt": null, "updatedAt": null, "menuItemId": 1, "eventId": 21, "chefId": 1, "event": { "id": 21, "date": "2018/10/30", "startTime": "5:00 PM", "endTime": "9:00 PM", "chefId": 1, "createdAt": null, "updatedAt": null, }, "menuItem": { "id": 1, "name": "Pad Thai", "description": "Tasty thai food!", "price": 10, "imageUrl": "thaiimage.com", "chefId": 1, }, },
  ];
  const output = util.organizeSchedule(sampleInputData);

  test('organizeSchedule should return an array', () => {
    expect(Array.isArray(output)).toBe(true);
  });
  test('organizeSchedule should have length of 3', () => {
    expect(output.length).toBe(2);
  });
  test('organizeSchedule should include menuItems array', () => {
    expect(Array.isArray(output[0].menuItems)).toBe(true);
  });
  test('organizeSchedule should include a date', () => {
    expect(typeof output[0].date).toBe('string');
  });
});
