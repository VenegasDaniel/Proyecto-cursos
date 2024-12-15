export class CreateComentarioDto {
  usuarioId: string;
  cursoId: string; // Validado desde MongoDB
  titulo: string;
  detalle: string;
  meGusta: number;
  noMeGusta: number;
}
