import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { RedisService } from '../redis/redis.service'; // RedisService será usado en UsersService

@Module({
  controllers: [UsersController],
  providers: [UsersService, RedisService], // Agrega RedisService para interactuar con Redis
  exports: [UsersService], // Exporta el servicio si otros módulos lo necesitan
})
export class UsersModule {}
