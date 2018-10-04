const functions = require('./functions');

test('Adds 2 + 2 to equal 4', () => {
  expect(functions.add(2, 2)).toBe(4);
});

test('userDetails should contain userId', () => {
  expect.assertions(1);
  return functions.fetchUser().then((data) => {
    expect(data.id).toBeTruthy();
  });
});
