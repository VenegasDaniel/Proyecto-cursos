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
            unidades: {
              select: {
                id: true,
                numeroOrden: true,
                nombreUnidad: true,
                cursoId: true,
                clases: {  // Incluir las clases asociadas a la unidad
                  select: {
                    id: true,
                    nombreClase: true,
                    descripcionClase: true,
                    numeroOrden: true,
                    videoUrl: true,
                    materiales: true,
                  },
                },
              },
            },
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

  // 6. Obtener el video de una clase específica por claseId
  async getClaseVideo(claseId: string) {
    const clase = await this.prisma.clase.findUnique({
        where: { id: claseId },
        select: {
            videoUrl: true,
            descripcionClase: true,
        },
    });

    if (!clase) {
        throw new Error('Clase no encontrada');
    }

    return { videoUrl: clase.videoUrl, descripcionClase: clase.descripcionClase };
  }

  // 7. Obtener los materiales adjuntos de una clase por claseId
  async getClaseMateriales(claseId: string) {
    const clase = await this.prisma.clase.findUnique({
        where: { id: claseId },
        select: {
            materiales: true,
        },
    });

    if (!clase) {
        throw new Error('Clase no encontrada');
    }

    return clase.materiales || [];
  }

    
    
}
