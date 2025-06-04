import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateProductDto {
    @IsNotEmpty({message:'El nombre del producto es obligatorio'})
    @IsString({message:'Nombre no valido'})
    nombre:string
    @IsNotEmpty({message:'La descripcion del producto es obligatorio'})
    @IsString({message:'Descripcion no valida'})
    descripcion:string
    @IsNotEmpty({message:'La cantidad del producto es obligatoria'})
    @IsNumber({maxDecimalPlaces:0},{message:'Cantidad no valida'})
    inventario:number
    @IsNotEmpty({message:'El precion del producto es obligatorio'})
    @IsNumber({maxDecimalPlaces:2},{message:'Precio no valido'})
    precio:number
}
