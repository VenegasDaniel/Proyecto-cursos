import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { Neo4jService } from './neo4j.service';
import { CreateComentarioDto } from 'src/dto/comentario.dto';
import { ComentariosService } from 'src/comentarios/comentario.service';

@Controller('comentarios')
export class Neo4jController {
  constructor(private readonly neo4jService: Neo4jService,
    private readonly neo4j: Neo4jService,
    private readonly comentariosService: ComentariosService,
  ) {}

  @Post()
  async agregarComentario(@Body() dto: CreateComentarioDto) {
    return this.comentariosService.agregarComentario(dto); // Usa comentariosService
  }
  @Get('curso/:cursoId')
  async obtenerComentariosConValoracionesCurso(@Param('cursoId') cursoId: string) {
    console.log('cursoId recibido:', cursoId); // Depuración
    const query = `
      MATCH (c:Curso {id: $cursoId})-[:TIENE_COMENTARIO]->(com:Comentario)
      RETURN com
    `;
    return this.neo4j.runQuery(query, { cursoId });
  }

  @Get(':cursoId/valoracion')
  async obtenerValoracionCurso(@Param('cursoId') cursoId: string) {
      return this.neo4jService.obtenerValoracionCurso(cursoId);
  }

  
}