module.exports = {
  app: {
    name: "MERN",
    apiURL: `${process.env.BASE_API_URL}`,
    // serverURL: process.env.BASE_API_URL,
    // clientURL: process.env.BASE_CLIENT_URL
  },
  port: process.env.PORT || 3000,
  database: {
    url: process.env.MONGO_URI,
    name: process.env.MONGO_DB_NAME
  },
  _jwt: {
    private_key: process.env.JWT_PRIVATE_KEY,

    refresh_token_secret: process.env.REFRESH_TOKEN_SECRET,

    access_token_secret: process.env.ACCESS_TOKEN_SECRET,

    access_token_exp: process.env.ACCESS_TOKEN_EXPIRATION,

    refresh_token_exp: process.env.REFRESH_TOKEN_EXPIRATION,

    refresh_token_exp_in_days: process.env.REFRESH_TOKEN_EXPIRATION_DAYS,
    refresh_token_exp_in_seconds: process.env.REFRESH_TOKEN_EXPIRATION_SECONDS,

    tokenLife: '7d'
  },
}