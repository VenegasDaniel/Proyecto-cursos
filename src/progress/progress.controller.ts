import { Controller, Post, Get, Patch, Param, Body } from '@nestjs/common';
import { ProgressService } from './progress.service';

@Controller('progress')
export class ProgressController {
  constructor(private readonly progressService: ProgressService) {}

  @Post(':userId/:courseId')
  async createProgress(
    @Param('userId') userId: string,
    @Param('courseId') courseId: string,
    @Body() progress: { status: string; percentage: number; startDate: string },
  ) {
    return this.progressService.createProgress(userId, courseId, progress);
  }

  @Get(':userId/:courseId')
  async getProgress(@Param('userId') userId: string, @Param('courseId') courseId: string) {
    return this.progressService.getProgress(userId, courseId);
  }
}
