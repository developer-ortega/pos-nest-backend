import { IsNumberString, IsOptional } from "class-validator";


export class GetProductQueryDto {
    @IsOptional()
    @IsNumberString({}, {message: `La categoría debe ser un número válido`})
    category_Id?: number;

    @IsOptional()
    @IsNumberString({}, {message: `La cantidad debe ser un número válido`})
    take: number;

    @IsOptional()
    @IsNumberString({}, {message: `La cantidad debe ser un número válido`})
    skip: number;
}