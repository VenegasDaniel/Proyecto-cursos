import { Module } from '@nestjs/common';
import { RedisService } from './redis.service';

@Module({
  providers: [RedisService], // Proporciona RedisService
  exports: [RedisService],   // Exporta RedisService para que otros módulos puedan usarlo
})
export class RedisModule {}
