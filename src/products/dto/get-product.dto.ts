import { IsNumberString, IsOptional } from "class-validator";


export class GetProductQueryDto {
    @IsOptional()
    @IsNumberString({}, {message: `La categoría debe ser un número válido`})
    category_Id?: string;
}