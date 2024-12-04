import Redis from 'ioredis';


export class RedisService {
  private redis: Redis;

  constructor() {
    this.redis = new Redis({
      host: process.env.REDIS_HOST || 'redis', // Cambia 'localhost' a 'redis' si usas Docker Compose
      port: Number(process.env.REDIS_PORT) || 6379,
    });

    this.redis.on('connect', () => {
      console.log('Conectado a Redis');
    });

    this.redis.on('error', (err) => {
      console.error('Error al conectar a Redis:', err);
    });
  }

  async set(key: string, value: any) {
    return this.redis.set(key, JSON.stringify(value));
  }

  async get(key: string) {
    const value = await this.redis.get(key);
    return value ? JSON.parse(value) : null;
  }
  async setUserCourseProgress(userId: string, courseId: string, progress: any) {
    const key = `user:${userId}:course:${courseId}`;
    return this.redis.set(key, JSON.stringify(progress));
  }

  async getUserCourseProgress(userId: string, courseId: string) {
    const key = `user:${userId}:course:${courseId}`;
    const progress = await this.redis.get(key);
    return progress ? JSON.parse(progress) : null;
  }

  async updateUserCourseProgress(userId: string, courseId: string, updates: any) {
    const key = `user:${userId}:course:${courseId}`;
    const existingProgress = await this.getUserCourseProgress(userId, courseId);
    const updatedProgress = { ...existingProgress, ...updates };
    return this.redis.set(key, JSON.stringify(updatedProgress));
  }
}

export default new RedisService();
