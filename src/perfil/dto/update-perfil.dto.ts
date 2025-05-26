import { PartialType } from '@nestjs/mapped-types';
import { CreatePerfilDto } from './create-perfil.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdatePerfilDto extends PartialType(CreatePerfilDto) {
    @IsNotEmpty({message:'El nombre del perfil no puede ir vacio'})
    name:string
}
