export default () => ({
  port: parseInt(process.env.PORT, 10) ?? 3003,
  nodeEnv: process.env.NODE_ENV,
  mongodbUri: process.env.MONGODB_URI,
  mongodbPort: process.env.MONGODB_PORT,
});
