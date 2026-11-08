import { IsInt, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateProductDto {

    @IsNotEmpty({ message: `El nombre es requerido` })
    @IsString({ message: `Nombre no válido` })
    name: string;

    @IsNotEmpty({ message: `El precio es requerido` })
    @IsNumber({ maxDecimalPlaces: 2 }, { message: `Precio no válido` })
    price: number;

    @IsNotEmpty({ message: `El inventario es requerido` })
    @IsNumber({ maxDecimalPlaces: 0 }, { message: `Cantidad no válida` })
    inventory: number;

    @IsNotEmpty({ message: `El categoria es requerida` })
    @IsInt({ message: `Categoria no válida` })
    categoryId: number;


}
