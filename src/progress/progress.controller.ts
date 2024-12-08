import { Controller, Post, Get, Patch, Param, Body } from '@nestjs/common';
import { ProgressService } from './progress.service';

@Controller('progress')
export class ProgressController {
  constructor(private readonly progressService: ProgressService) {}

  /**
   * Actualizar el progreso de un curso específico
   */
  @Patch(':userId/:courseId')
  async updateCourseProgress(
    @Param('userId') userId: string,
    @Param('courseId') courseId: string,
    @Body() body: { classesCompleted: number },
  ) {
    return this.progressService.updateProgress(userId, courseId, body.classesCompleted);
  }

  /**
   * Obtener el progreso de un curso específico de un usuario
   */
  @Get(':userId/:courseId')
  async getCourseProgress(
    @Param('userId') userId: string,
    @Param('courseId') courseId: string,
  ) {
    return this.progressService.getProgress(userId, courseId);
  }

  /**
   * Obtener el progreso de todos los cursos de un usuario
   */
  @Get(':userId')
  async getAllCoursesProgress(@Param('userId') userId: string) {
    return this.progressService.getAllCoursesProgress(userId);
  }
}
