import { Module, forwardRef } from '@nestjs/common';
import { Neo4jService } from './neo4j.service';
import { Neo4jController } from './neo4j.controller';
import { ComentariosModule } from 'src/comentarios/comentario.module';

@Module({
  imports: [
    forwardRef(() => ComentariosModule), // Utiliza forwardRef si hay dependencia circular
  ],
  providers: [Neo4jService],
  controllers: [Neo4jController],
  exports: [Neo4jService],
})
export class Neo4jModule {}
