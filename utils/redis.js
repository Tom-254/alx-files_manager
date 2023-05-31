import { promisify } from 'util';
import { createClient } from 'redis';

/**
 * Class Defining necessary properties and methods of a Redis client.
 */
class RedisClient {
  /**
   * Creates a RedisClient instance.
   */
  constructor() {
    this.client = createClient();
    this.isClientConnected = true;
    this.client.on('error', (err) => {
      console.error('Redis client failed to connect:', err.message || err.toString());
      this.isClientConnected = false;
    });
    this.client.on('connect', () => {
      this.isClientConnected = true;
    });
  }

  /**
   * Checks Connections Active Status.
   */
  isAlive() {
    return this.isClientConnected;
  }

  /**
   * Gets the value of the passed key.
   */
  async get(key) {
    return promisify(this.client.GET).bind(this.client)(key);
  }

  /**
   * Stores the value of the passed key.
   */
  async set(key, value, duration) {
    await promisify(this.client.SETEX)
      .bind(this.client)(key, duration, value);
  }

  /**
   * Removes the Value of the passed key.
   */
  async del(key) {
    await promisify(this.client.DEL).bind(this.client)(key);
  }
}

const redisClient = new RedisClient();
export default redisClient;
