import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';  // Ruta hacia tu PrismaService

@Global() // El decorador Global asegura que esté disponible en toda la aplicación
@Module({
  providers: [PrismaService],
  exports: [PrismaService],  // Exporta PrismaService para que esté disponible en otros módulos
})
export class PrismaModule {}