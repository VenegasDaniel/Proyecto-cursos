import { Controller, Post, Body } from '@nestjs/common';
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
}
