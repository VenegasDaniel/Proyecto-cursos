import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { RedisService } from '../redis/redis.service'; // RedisService será usado en UsersService
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, RedisService, PrismaService], // Agrega RedisService para interactuar con Redis
  exports: [UsersService], // Exporta el servicio si otros módulos lo necesitan
  
})
export class UsersModule {}
