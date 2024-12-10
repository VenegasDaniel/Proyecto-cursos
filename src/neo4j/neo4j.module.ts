import { Module } from '@nestjs/common';
import { Neo4jService } from './neo4j.service';

@Module({
  providers: [Neo4jService],
  exports: [Neo4jService], // Exportar para usarlo en otros módulos
})
export class Neo4jModule {}