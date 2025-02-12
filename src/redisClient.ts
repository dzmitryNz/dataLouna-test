import Redis from 'ioredis';

const { REDIS_URL } = process.env;

const redis = new Redis(REDIS_URL ?? 'localhost:6879', { reconnectOnError: () => false, maxRetriesPerRequest: 3 });

redis.on('error', (err) => {
  console.error('Redis', err);
});
 
export default redis;
