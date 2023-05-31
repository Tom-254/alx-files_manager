import { existsSync, readFileSync } from 'fs';

/**
 * Loads the appropriate environment variables for an event.
 */
const LoadEnvVars = () => {
  const env = process.env.npm_lifecycle_event || 'dev';
  const path = env.includes('test') || env.includes('cover') ? '.env.test' : '.env';

  if (existsSync(path)) {
    const environmentData = readFileSync(path, 'utf-8').trim().split('\n');

    for (const line of environmentData) {
      const delimPosition = line.indexOf('=');
      const variable = line.substring(0, delimPosition);
      const value = line.substring(delimPosition + 1);
      process.env[variable] = value;
    }
  }
};

export default LoadEnvVars;
