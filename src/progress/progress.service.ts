import { Injectable } from '@nestjs/common';
import { RedisService } from '../redis/redis.service';

@Injectable()
export class ProgressService {
  constructor(private readonly redisService: RedisService) {}

  async createProgress(userId: string, courseId: string, progress: any) {
    return this.redisService.setUserCourseProgress(userId, courseId, progress);
  }

  async getProgress(userId: string, courseId: string) {
    return this.redisService.getUserCourseProgress(userId, courseId);
  }
}
