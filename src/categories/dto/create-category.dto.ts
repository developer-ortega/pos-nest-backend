import { IsNotEmpty, IsString } from "class-validator";

export class CreateCategoryDto {

    @IsNotEmpty({ message: `El nombre de la Categoría es requerido ` })
    @IsString()
    name: string;

}
