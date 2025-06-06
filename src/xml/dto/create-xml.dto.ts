import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
export class CreateXmlDto {
    @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsNumber()
  precio: number;
}
