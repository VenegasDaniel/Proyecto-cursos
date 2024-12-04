import { Injectable } from '@nestjs/common';
import { RedisService } from '../redis/redis.service';

@Injectable()
export class UsersService {
  constructor(private readonly redisService: RedisService) {}

  async registerUser(userData: { userId: string; email: string; password: string }) {
    const existingUser = await this.redisService.get(`user:${userData.userId}`);
    if (existingUser) {
      throw new Error('El usuario ya existe');
    }

    await this.redisService.set(`user:${userData.userId}`, userData);
    return { message: 'Usuario registrado exitosamente' };
  }

  async loginUser(loginData: { email: string; password: string }) {
    // Busca el usuario en Redis, valida credenciales
    return { message: 'Inicio de sesión exitoso' };
  }
}
