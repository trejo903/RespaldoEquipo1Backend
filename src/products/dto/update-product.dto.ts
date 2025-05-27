import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { IsNotEmpty, IsNumber, IsString } from "class-validator"


export class UpdateProductDto extends PartialType(CreateProductDto) {
    @IsNotEmpty({message:'El nombre del producto es obligatorio'})
        @IsString({message:'Nombre no valido'})
        nombre:string
        @IsNotEmpty({message:'La descripcion del producto es obligatorio'})
        @IsString({message:'Descripcion no valida'})
        descripcion:string
        @IsNotEmpty({message:'La imagen del producto es obligatoria'})
        imagen:string
        @IsNotEmpty({message:'La cantidad del producto es obligatoria'})
        @IsNumber({maxDecimalPlaces:0},{message:'Cantidad no valida'})
        inventario:number
        @IsNotEmpty({message:'El precion del producto es obligatorio'})
        @IsNumber({maxDecimalPlaces:2},{message:'Precio no valido'})
        precio:number
}
