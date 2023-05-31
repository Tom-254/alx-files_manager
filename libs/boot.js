import LoadEnvVars from '../utils/load_env_vars';

const StartServer = (app) => {
  LoadEnvVars();
  const port = process.env.PORT || 5000;
  const env = process.env.npm_lifecycle_event || 'dev';
  app.listen(port, () => {
    console.log(`[${env}] API has started listening at port:${port}`);
  });
};

export default StartServer;
