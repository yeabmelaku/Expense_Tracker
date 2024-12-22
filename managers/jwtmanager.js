const jsonwebtoken = require("jsonwebtoken");

const jwtManager = (user) => {
  const accessToken = jsonwebtoken.sign(
    {
      _id: user._id,
      name: user.name,
    },
    process.env.jws
  );

  return accessToken;
};

module.exports = jwtManager;
