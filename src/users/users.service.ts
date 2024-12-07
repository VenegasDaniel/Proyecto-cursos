import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RedisService } from '../redis/redis.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly redisService: RedisService,
    private readonly prismaService: PrismaService,
  ) {}

  async registerUser(userData: { userId: string; email: string; password: string }) {
    await this.redisService.set(`user:${userData.userId}`, userData);
    return { message: 'Usuario registrado exitosamente' };
  }

  async loginUser(loginData: { email: string; password: string }) {
    // Escanear todas las claves de usuarios en Redis
    const keys = await this.redisService.scanKeys('user:*');

    // Buscar al usuario con el email proporcionado
    let foundUser: any = null;
    for (const key of keys) {
      const user = await this.redisService.get(key);
      if (user.email === loginData.email) {
        foundUser = user;
        break;
      }
    }

    if (!foundUser) {
      throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    }

    if (foundUser.password !== loginData.password) {
      throw new HttpException('Contraseña incorrecta', HttpStatus.UNAUTHORIZED);
    }

    return { message: 'Inicio de sesión exitoso', userId: foundUser.userId, email: foundUser.email };
  }
  async assignCoursesToUser(userId: string, courseIds: string[]) {
    // Validar si el usuario existe en Redis
    const userKey = `user:${userId}`;
    const user = await this.redisService.get(userKey);
  
    if (!user) {
      throw new Error(`El usuario con ID ${userId} no está registrado`);
    }
  
    // Validar que los cursos existen en MongoDB
    const validCourses = await this.prismaService.curso.findMany({
      where: { id: { in: courseIds } },
      select: { id: true },
    });
  
    if (validCourses.length !== courseIds.length) {
      throw new Error('Uno o más cursos no existen');
    }
  
    // Obtener los cursos actuales del usuario desde Redis
    const userCoursesKey = `user:${userId}:courses`;
    const existingCourses = await this.redisService.get(userCoursesKey);
    const courses = existingCourses ? JSON.parse(existingCourses) : [];
  
    // Agregar nuevos cursos a la lista
    validCourses.forEach((course) => {
      if (!courses.includes(course.id)) {
        courses.push(course.id);
      }
    });
  
    // Guardar la lista actualizada en Redis
    await this.redisService.set(userCoursesKey, JSON.stringify(courses));
  
    return { message: 'Cursos asignados exitosamente', courses };
  }
  async getCoursesByUser(userId: string) {
    const userCoursesKey = `user:${userId}:courses`;
  
    // Obtener los IDs de los cursos desde Redis
    const courses = await this.redisService.get(userCoursesKey);
    const courseIds = courses ? JSON.parse(courses) : [];
  
    // Obtener los detalles de los cursos desde MongoDB
    return await this.prismaService.curso.findMany({
      where: { id: { in: courseIds } },
    });
  }
}
