import {  IsNotEmpty, IsString, Matches } from "class-validator"

export class CreateProfileDto {
    @IsNotEmpty({message:'El nombre del usuario es obligatorio'})
    @IsString()
    nombre:string
    @IsNotEmpty({message:'El apellido del usuario es obligatorio'})
    @IsString()
    apellido:string
    @IsNotEmpty({message:'El numero del usuario es obligatorio'})
    @Matches(/^\d{10}$/,{message:'El numero debe de contener 10 digitos'})
    numero:string
    @IsString()
    estado:string
    @IsString()
    ciudad:string
    @IsString()
    fraccionamiento:string
    @IsString()
    calle:string
    @Matches(/^\d{5}$/,{message:'El codigo postal debe de contener 5 digitos'})
    codigoPostal:string
}
