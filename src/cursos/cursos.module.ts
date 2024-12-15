import { Module } from '@nestjs/common';
import { CursosController } from './cursos.controller';
import { ClasesController } from './clases.controller';  
import { CursosService } from './cursos.service';
import { PrismaModule } from '../prisma/prisma.module'; 
import { Neo4jModule } from 'src/neo4j/neo4j.module';

@Module({
  imports: [PrismaModule,Neo4jModule],
  controllers: [CursosController, ClasesController], 
  providers: [CursosService],
})
export class CursosModule {}

