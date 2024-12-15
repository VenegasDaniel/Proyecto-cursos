import { Module, forwardRef } from '@nestjs/common';
import { ComentariosService } from 'src/comentarios/comentario.service';
import { Neo4jModule } from '../neo4j/neo4j.module';

@Module({
  imports: [
    forwardRef(() => Neo4jModule), // Utiliza forwardRef para evitar dependencias circulares
  ],
  providers: [ComentariosService],
  exports: [ComentariosService],
})
export class ComentariosModule {}
