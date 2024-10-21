import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CursosModule } from './cursos/cursos.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [CursosModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
