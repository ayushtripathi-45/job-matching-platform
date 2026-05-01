import Redis from 'ioredis';
import dotenv from 'dotenv';

dotenv.config();

const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';

export const redis = new Redis(redisUrl, {
  maxRetriesPerRequest: 1,
  retryStrategy: (times: number) => {
    if (times > 3) return null; 
    return Math.min(times * 100, 2000);
  }
});

redis.on('error', (err: any) => console.log('Redis not connected (expected if local Redis is missing)'));
redis.on('connect', () => console.log('Redis connected successfully'));
