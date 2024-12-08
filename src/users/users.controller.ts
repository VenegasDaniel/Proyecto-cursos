import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async registerUser(@Body() userData: CreateUserDto) {
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
