import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CursosModule } from './cursos/cursos.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { ProgressModule } from './progress/progress.module';
import { RedisModule } from './redis/redis.module';
import { Neo4jModule } from './neo4j/neo4j.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),  // Aquí importas el módulo Config
    CursosModule,
    PrismaModule,
    UsersModule, 
    ProgressModule, 
    RedisModule,
    Neo4jModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

