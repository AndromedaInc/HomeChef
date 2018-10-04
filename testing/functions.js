const axios = require('axios');

const functions = {
  add: (num1, num2) => num1 + num2,

  fetchUser: () => {
    axios
      .get('/api/user/accountInfo/frannylikestoeat')
      .then(res => res.data)
      .catch(err => console.log(err));
  },
};

module.exports = functions;
