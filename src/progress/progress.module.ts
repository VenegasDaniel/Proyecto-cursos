import { Module } from '@nestjs/common';
import { ProgressController } from './progress.controller';
import { ProgressService } from './progress.service';
import { RedisService } from '../redis/redis.service'; // RedisService será usado en ProgressService

@Module({
  controllers: [ProgressController],
  providers: [ProgressService, RedisService], // Agrega RedisService
  exports: [ProgressService], // Exporta si otros módulos lo necesitan
})
export class ProgressModule {}
