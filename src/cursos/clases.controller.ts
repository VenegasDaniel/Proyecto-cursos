import { Controller, Get, Param, Query } from "@nestjs/common";
import { CursosService } from "./cursos.service";

@Controller('clases')
export class ClasesController {
  constructor(private readonly cursosService: CursosService) {}

  @Get(':claseId/video')
  async getClaseVideo(@Param('claseId') claseId: string) {
    return this.cursosService.getClaseVideo(claseId);
  }
  @Get(':claseId/materiales')
  async getClaseMateriales(@Param('claseId') claseId: string) {
    return this.cursosService.getClaseMateriales(claseId);
  }
}
