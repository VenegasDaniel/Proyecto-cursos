import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CursosService {
    constructor(private readonly prisma: PrismaService) {}

    // 1. Mostrar todos los cursos
    async getCursos() {
        return this.prisma.curso.findMany();
    }

    // 2. Mostrar el detalle de un curso por su ID
    async getCursoById(id: string) {
        return this.prisma.curso.findUnique({
            where: { id },
        });
    }

    // 3. Obtener unidades y clases de un curso por ID
    async getUnidadesByCurso(id: string) {
        return this.prisma.curso.findUnique({
            where: { id },
            select: {
                unidades: true,
            },
        });
    }

    // 4. Crear un nuevo curso (solo para administradores)
    async createCurso(createCursoDto: any) {
        return this.prisma.curso.create({
            data: createCursoDto,
        });
    }

    // 5. Obtener los comentarios más valorados de un curso, con paginación
    async getComentariosByCurso(id: string, page: number, limit: number) {
        const skip = (page - 1) * limit;

        // Obtener todos los comentarios del curso
        const curso = await this.prisma.curso.findUnique({
            where: { id },
            select: {
                comentarios: true,
            },
        });

        // Ordenar los comentarios por "meGusta" de manera descendente
        const comentariosOrdenados = curso?.comentarios.sort((a, b) => b.meGusta - a.meGusta);

        // Realizar la paginación manual
        const comentariosPaginados = comentariosOrdenados?.slice(skip, skip + limit);

            return comentariosPaginados;
    }

    // 6. Obtener el video de una clase específica de una unidad
    async getClaseVideo(id: string, unidadId: string, claseId: string) {
        // Obtener el curso con sus unidades y clases
        const curso = await this.prisma.curso.findUnique({
            where: { id },
            select: {
                unidades: true,
            },
        });

        // Buscar la unidad y la clase específica
        const unidad = curso?.unidades.find(u => u.numeroOrden === parseInt(unidadId));
        const clase = unidad?.clases.find(c => c.numeroOrden === parseInt(claseId));

        // Retornar el video y descripción de la clase, si existe
        return clase ? { videoUrl: clase.videoUrl, descripcionClase: clase.descripcionClase } : null;
    }

    // 7. Obtener los materiales adjuntos de una clase
    async getClaseMateriales(id: string, unidadId: string, claseId: string) {
        // Obtener el curso con sus unidades y clases
        const curso = await this.prisma.curso.findUnique({
            where: { id },
            select: {
                unidades: true,
            },
        });

        // Buscar la unidad y la clase específica
        const unidad = curso?.unidades.find(u => u.numeroOrden === parseInt(unidadId));
        const clase = unidad?.clases.find(c => c.numeroOrden === parseInt(claseId));

        // Retornar los materiales de la clase, si existen
        return clase ? clase.materiales : [];
    }


    // 8. Crear un curso (solo para administradores)
    
}
