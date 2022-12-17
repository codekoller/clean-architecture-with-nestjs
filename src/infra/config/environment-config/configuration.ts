export default () => ({
  app: {
    url: process.env.APP_URL,
    port: parseInt(process.env.PORT, 10) ?? 3009,
    nodeEnv: process.env.NODE_ENV,
  },
  db: {
    mongodbUri: process.env.MONGODB_URI,
    mongodbPort: process.env.MONGODB_PORT,
  },
  passport: {
    defaultStrategy: process.env.DEFAULT_STRATEGY,
    property: process.env.PROPERTY,
    session: process.env.SESSION,
  },
  jwt: {
    expiresIn: process.env.EXPIRES_IN,
    secret: process.env.JWT_SECRET,
  },
});
