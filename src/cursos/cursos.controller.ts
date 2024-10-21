import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { CursosService } from './cursos.service';

@Controller('cursos')
export class CursosController {
    constructor(private readonly cursosService: CursosService) {}

      // 1. Listar todos los cursos disponibles
    @Get()
    async getCursos() {
        return this.cursosService.getCursos();
    }

    // 2. Mostrar el detalle de un curso específico por su ID
    @Get(':id')
    async getCursoById(@Param('id') id: string) {
        return this.cursosService.getCursoById(id);
    }

    // 3. Acceder a los contenidos de un curso (unidades y clases)
    @Get(':id/unidades')
    async getUnidadesByCurso(@Param('id') id: string) {
        return this.cursosService.getUnidadesByCurso(id);
    }

    // 4. Crear un curso (administrador)
    @Post()
    async createCurso(@Body() createCursoDto: any) {
        return this.cursosService.createCurso(createCursoDto);
    }

    // 5. Obtener los comentarios más valorados de un curso (con paginación)
    @Get(':id/comentarios')
    async getComentariosByCurso(
        @Param('id') id: string,
        @Query('page') page = 1,
        @Query('limit') limit = 3,
    ) {
        return this.cursosService.getComentariosByCurso(id, page, limit);
    }

    // 6. Acceder al video de una clase por ID del curso y el número de clase
    @Get(':id/unidades/:unidadId/clases/:claseId')
    async getClaseVideo(
        @Param('id') id: string,
        @Param('unidadId') unidadId: string,
        @Param('claseId') claseId: string,
    ) {
        return this.cursosService.getClaseVideo(id, unidadId, claseId);
    }

    // 7. Descargar materiales de una clase
    @Get(':id/unidades/:unidadId/clases/:claseId/materiales')
    async getClaseMateriales(
        @Param('id') id: string,
        @Param('unidadId') unidadId: string,
        @Param('claseId') claseId: string,
    ) {
        return this.cursosService.getClaseMateriales(id, unidadId, claseId);
    }
}
