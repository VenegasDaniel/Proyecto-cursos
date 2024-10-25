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
    @Get(':id/contenido')
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
}

// Nueva ruta para acceder directamente a las clases y su contenido
@Controller('clases')
export class ClasesController {
    constructor(private readonly cursosService: CursosService) {}

    // 6. Acceder al contenido de una clase (video o materiales)
    @Get(':claseId/contenido')
    async getClaseContenido(
        @Param('claseId') claseId: string,
        @Query('tipo') tipo: 'video' | 'materiales',
    ) {
        if (tipo === 'video') {
            return this.cursosService.getClaseVideo(claseId);
        } else if (tipo === 'materiales') {
            return this.cursosService.getClaseMateriales(claseId);
        } else {
            return { error: 'Tipo de contenido no válido' };
        }
    }
}
