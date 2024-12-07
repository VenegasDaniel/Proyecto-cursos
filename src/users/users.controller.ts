import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async registerUser(@Body() userData: { userId: string; email: string; password: string }) {
    return this.usersService.registerUser(userData);
  }

  @Post('login')
  async loginUser(@Body() loginData: { email: string; password: string }) {
    return this.usersService.loginUser(loginData);
  }
  @Post(':userId/courses')
  async assignCoursesToUser(
    @Param('userId') userId: string,
    @Body() body: { courseIds: string[] },
  ) {
    return this.usersService.assignCoursesToUser(userId, body.courseIds);
  }

  @Get(':userId/courses')
  async getCoursesByUser(@Param('userId') userId: string) {
    return this.usersService.getCoursesByUser(userId);
  }
}
