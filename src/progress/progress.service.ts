import { Injectable } from '@nestjs/common';
import { RedisService } from '../redis/redis.service';

@Injectable()
export class ProgressService {
  constructor(private readonly redisService: RedisService) {}

  async createProgress(userId: string, courseId: string, progress: { 
    status: string; 
    startDate: string; 
    percentage: number; 
    totalClasses?: number; 
    classesCompleted?: number; 
  }) {
    const courseKey = `user:${userId}:course:${courseId}`;
  
    // Establece un progreso inicial con valores por defecto si faltan parámetros
    const defaultProgress = {
      status: progress.status || 'INICIADO',
      startDate: progress.startDate || new Date().toISOString().split('T')[0],
      percentage: progress.percentage || 0,
      totalClasses: progress.totalClasses || 0,
      classesCompleted: progress.classesCompleted || 0,
    };
  
    // Guardar el progreso inicial en Redis
    await this.redisService.set(courseKey, JSON.stringify(defaultProgress));
  
    return { message: 'Progreso creado exitosamente', progress: defaultProgress };
  }
  

  async getProgress(userId: string, courseId: string) {
    return this.redisService.getUserCourseProgress(userId, courseId);
  }


  async updateCourseProgress(userId: string, courseId: string, percentage: number) {
    const courseKey = `user:${userId}:course:${courseId}`;
    const currentDate = new Date().toISOString().split('T')[0];
  
    // Obtener el progreso actual del curso
    const existingProgress = await this.redisService.get(courseKey);
    const progress = existingProgress ? JSON.parse(existingProgress) : {};
  
    // Determinar el estado basado en el porcentaje
    let status = 'INICIADO';
    if (percentage > 0 && percentage < 100) {
      status = 'EN CURSO';
    } else if (percentage === 100) {
      status = 'COMPLETADO';
    }
  
    // Actualizar el progreso
    const updatedProgress = {
      ...progress,
      status,
      percentage,
      startDate: progress.startDate || currentDate, // Si no existe, asignar fecha de inicio
    };
  
    // Guardar el progreso actualizado en Redis
    await this.redisService.set(courseKey, JSON.stringify(updatedProgress));
  
    return { message: 'Progreso actualizado exitosamente', progress: updatedProgress };
  }
  
  async getAllCoursesProgress(userId: string) {
    // Escanear claves relacionadas con los cursos del usuario
    const keys = await this.redisService.scanKeys(`user:${userId}:course:*`);
    const coursesProgress = [];
  
    for (const key of keys) {
      const progress = await this.redisService.get(key);
      const courseId = key.split(':')[3]; // Extraer el ID del curso desde la clave
      coursesProgress.push({ courseId, progress: JSON.parse(progress) });
    }
  
    return coursesProgress;
  }
  
}
