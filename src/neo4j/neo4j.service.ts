import { Injectable, OnModuleDestroy } from '@nestjs/common';
import neo4j, { Driver } from 'neo4j-driver';
import { CreateComentarioDto } from './DTO/comentario.dto';

@Injectable()
export class Neo4jService implements OnModuleDestroy {
  private driver: Driver;

  constructor() {
    this.driver = neo4j.driver(
      'bolt://localhost:7687', // Cambia según tu configuración
      neo4j.auth.basic('neo4j', 'password'), // Credenciales de Neo4j
    );
  }

  // Método para ejecutar queries
  async runQuery(query: string, params: Record<string, any> = {}) {
    const session = this.driver.session();
    try {
      const result = await session.run(query, params);
      return result.records.map((record) => record.toObject());
    } finally {
      await session.close();
    }
  }

  // Método para cerrar la conexión
  async onModuleDestroy() {
    await this.driver.close();
  }
  async agregarComentario(dto: CreateComentarioDto) {
    const { usuarioId, cursoId, texto, puntaje } = dto;
  
    const query = `
      MATCH (u:Usuario {id: $usuarioId}), (c:Curso {id: $cursoId})
      CREATE (com:Comentario {
        id: randomUUID(),
        texto: $texto,
        puntaje: $puntaje,
        fecha: datetime()
      })
      CREATE (u)-[:ESCRIBIO]->(com)
      CREATE (c)-[:TIENE_COMENTARIO]->(com)
      RETURN com
    `;
  
    return this.runQuery(query, { usuarioId, cursoId, texto, puntaje });
  }
}
