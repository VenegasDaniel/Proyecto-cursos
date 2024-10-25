import { Module } from '@nestjs/common';
import { CursosController } from './cursos.controller';
import { ClasesController } from './clases.controller';  
import { CursosService } from './cursos.service';
import { PrismaModule } from '../prisma/prisma.module'; 

@Module({
  imports: [PrismaModule],
  controllers: [CursosController, ClasesController], 
  providers: [CursosService],
})
export class CursosModule {}

