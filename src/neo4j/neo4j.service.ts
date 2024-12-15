import { Injectable, OnModuleDestroy } from '@nestjs/common';
import neo4j, { Driver } from 'neo4j-driver';
import { CreateComentarioDto } from 'src/dto/comentario.dto';

@Injectable()
export class Neo4jService implements OnModuleDestroy {
  private driver: Driver;

  constructor() {
    const host = process.env.NEO4J_HOST || 'localhost';
    const port = process.env.NEO4J_PORT || '7687';
    const user = process.env.NEO4J_USER || 'neo4j';
    const password = process.env.NEO4J_PASSWORD || 'password';
  
    this.driver = neo4j.driver(
      `bolt://${host}:${port}`,
      neo4j.auth.basic(user, password),
    );
  }
  

  async runQuery(query: string, params: Record<string, any> = {}) {
    const session = this.driver.session();
    try {
      console.log('Parámetros enviados a Neo4j:', params); // Depuración
      const result = await session.run(query, params);
      return result.records.map((record) => record.toObject());
    } finally {
      await session.close();
    }
  }
  

  async onModuleDestroy() {
    await this.driver.close();
  }
  async obtenerComentariosConValoracionesCurso(cursoId: string) {
    const query = `
      MATCH (c:Curso {id: $cursoId})-[:TIENE_COMENTARIO]->(com:Comentario)
      RETURN com {
        .id,
        .autor,
        .titulo,
        .detalle,
        .meGusta,
        .noMeGusta,
        valoracion: CASE 
          WHEN com.meGusta + com.noMeGusta = 0 THEN 0
          ELSE toFloat(com.meGusta) / (com.meGusta + com.noMeGusta) * 100
        END
      } AS comentario
    `;
    const result = await this.runQuery(query, { cursoId });
    return result.map((record) => record.comentario);
  }
  
  async obtenerValoracionCurso(cursoId: string) {
    const query = `
      MATCH (c:Curso {id: $cursoId})
      RETURN c.promedioValoracion AS promedioValoracion, 
             c.totalMeGusta AS totalMeGusta, 
             c.totalNoMeGusta AS totalNoMeGusta,
             c.cantidadComentarios AS cantidadComentarios
    `;

    const result = await this.runQuery(query, { cursoId });
    return result[0]; // Retorna la primera fila del resultado
}

}