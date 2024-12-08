import { Injectable } from '@nestjs/common';
import { RedisService } from '../redis/redis.service';

@Injectable()
export class ProgressService {
  constructor(private readonly redisService: RedisService) {}


  async getProgress(userId: string, courseId: string) {
    return this.redisService.getUserCourseProgress(userId, courseId);
  }


  async updateProgress(userId: string, courseId: string, classesCompleted: number) {
    const progressKey = `user:${userId}:course:${courseId}`;
    const progress = await this.redisService.get(progressKey);
  
    if (!progress) {
      throw new Error('Progreso no encontrado para este curso');
    }
  
    const progressData = JSON.parse(progress);
  
    if (classesCompleted > progressData.totalClasses) {
      throw new Error('La cantidad de clases completadas no puede exceder el total de clases');
    }
  
    const percentage = (classesCompleted / progressData.totalClasses) * 100;
    let status = 'INICIADO';
  
    if (percentage > 0 && percentage < 100) {
      status = 'EN CURSO';
    } else if (percentage === 100) {
      status = 'COMPLETADO';
    }
  
    const updatedProgress = {
      ...progressData,
      classesCompleted,
      percentage,
      status,
    };
  
    await this.redisService.set(progressKey, JSON.stringify(updatedProgress));
  
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
