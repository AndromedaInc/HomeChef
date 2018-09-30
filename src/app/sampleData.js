const sampleChefSchedule = [
  {
    eventId: 1,
    date: '12/01/2018',
    startTime: '5:00 PM',
    endTime: '7:00 PM',
    menuItems: [
      {
        menuItemId: 1,
        name: 'Pad Thai',
        description: 'Super delicious homemade pad thai.',
        imageUrl: 'https://d3cizcpymoenau.cloudfront.net/images/32489/SFS_pad_thai-44.jpg',
        price: 8,
        quantity: 15,
        reservations: 3,
      },
      {
        menuItemId: 2,
        name: 'Tom Yum',
        description: 'Spicy thai soup.',
        imageUrl: 'http://aromasian.com/wp-content/uploads/2017/06/thai-tom-yum-milky-soup-1.jpg',
        price: 10,
        quantity: 12,
        reservations: 0,
      },
    ],
  },
  {
    eventId: 2,
    date: '12/11/2018',
    startTime: '2:00 PM',
    endTime: '9:00 PM',
    menuItems: [
      {
        menuItemId: 1,
        name: 'Pad See Ew',
        description: 'Yummy fat noodles.',
        imageUrl: 'https://d3cizcpymoenau.cloudfront.net/images/32489/SFS_pad_thai-44.jpg',
        price: 8,
        quantity: 20,
        reservations: 5,
      },
      {
        menuItemId: 2,
        name: 'Tom Yum',
        description: 'Spicy thai soup.',
        imageUrl: 'http://aromasian.com/wp-content/uploads/2017/06/thai-tom-yum-milky-soup-1.jpg',
        price: 10,
        quantity: 15,
        reservations: 1,
      },
    ],
  },
];

module.exports = sampleChefSchedule;
