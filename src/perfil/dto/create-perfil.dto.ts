import { IsNotEmpty } from "class-validator";

export class CreatePerfilDto {
    @IsNotEmpty({message:'El nombre del perfil no puede ir vacio'})
    name:string
}
