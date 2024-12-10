import { Controller, Post, Body } from '@nestjs/common';
import { Neo4jService } from './neo4j.service';
import { CreateComentarioDto } from './dto/comentario.dto';

@Controller('comentarios')
export class Neo4jController {
  constructor(private readonly neo4jService: Neo4jService) {}

  @Post()
  async agregarComentario(@Body() dto: CreateComentarioDto) {
    return this.neo4jService.agregarComentario(dto);
  }
}