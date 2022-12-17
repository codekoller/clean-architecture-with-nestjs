export default () => ({
  appUrl: process.env.APP_URL,
  port: parseInt(process.env.PORT, 10) ?? 3009,
  nodeEnv: process.env.NODE_ENV,
  mongodbUri: process.env.MONGODB_URI,
  mongodbPort: process.env.MONGODB_PORT,
  jwtSecret: process.env.JWT_SECRET,
});
