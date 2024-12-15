import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateComentarioDto } from 'src/dto/comentario.dto';
import { PrismaService } from '../prisma/prisma.service'; // O tu servicio de MongoDB
import { Neo4jService } from '../neo4j/neo4j.service';

@Injectable()
export class ComentariosService {
  constructor(
    private readonly prisma: PrismaService, // Servicio para MongoDB
    private readonly neo4j: Neo4jService,
  ) {}

  async agregarComentario(dto: CreateComentarioDto) {
    const { usuarioId, cursoId, titulo, detalle, meGusta, noMeGusta } = dto;

    // Validar existencia del curso en MongoDB
    const curso = await this.prisma.curso.findUnique({
      where: { id: cursoId },
    });

    if (!curso) {
      throw new HttpException(
        'El curso no existe en la base de datos',
        HttpStatus.NOT_FOUND,
      );
    }

    // Agregar comentario en Neo4j
    const query = `
      MERGE (u:Usuario {id: $usuarioId})
      MERGE (c:Curso {id: $cursoId})
      CREATE (com:Comentario {
        id: randomUUID(),
        titulo: $titulo,
        detalle: $detalle,
        meGusta: $meGusta,
        noMeGusta: $noMeGusta,
        fecha: datetime()
      })
      CREATE (u)-[:ESCRIBIO]->(com)
      CREATE (c)-[:TIENE_COMENTARIO]->(com)
      SET c.valoracion = coalesce(c.valoracion, 0) + $meGusta - $noMeGusta,
          c.cantidadValoraciones = coalesce(c.cantidadValoraciones, 0) + 1,
          c.promedioValoracion = c.valoracion / c.cantidadValoraciones
      RETURN com
    `;

    return this.neo4j.runQuery(query, {
      usuarioId,
      cursoId,
      titulo,
      detalle,
      meGusta,
      noMeGusta,
    });
  }

}
