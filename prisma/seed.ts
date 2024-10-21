import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Crear un curso con unidades y clases anidadas
  const curso1 = await prisma.curso.create({
    data: {
      nombre: 'Curso de Programación',
      descripcionBreve: 'Aprende a programar desde cero',
      descripcionDetallada: 'Este curso cubre los fundamentos de programación...',
      imagen: 'https://example.com/imagen1.jpg',
      valoracion: 4.5,
      cantidadInscritos: 100,
      banner: 'https://example.com/banner1.jpg',
      // Unidades y Clases
      unidades: {
        create: [
          {
            nombreUnidad: 'Introducción a la Programación',
            numeroOrden: 1,
            clases: {
              create: [
                {
                  nombreClase: 'Clase 1: Variables y Tipos de Datos',
                  numeroOrden: 1,
                  descripcionClase: 'Aprende sobre variables y tipos de datos...',
                  videoUrl: 'https://example.com/video1.mp4',
                  materiales: ['https://example.com/material1.pdf'],
                },
                {
                  nombreClase: 'Clase 2: Estructuras de Control',
                  numeroOrden: 2,
                  descripcionClase: 'Aprende sobre if, else, y loops...',
                  videoUrl: 'https://example.com/video2.mp4',
                  materiales: ['https://example.com/material2.pdf'],
                },
              ],
            },
          },
        ],
      },
      // Comentarios
      comentarios: {
        create: [
          {
            autor: 'Juan Pérez',
            titulo: 'Muy buen curso',
            detalle: 'Me ha ayudado mucho a entender los conceptos.',
            meGusta: 5,
            noMeGusta: 0,
          },
        ],
      },
    },
  });

  console.log('Curso creado:', curso1);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
