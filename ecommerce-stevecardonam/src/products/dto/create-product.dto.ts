import {
  IsOptional,
  IsString,
  IsNumber,
  IsBoolean,
  IsNotEmpty,
  IsUUID,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsBoolean()
  stock: number;

  @IsOptional()
  @IsString()
  imgUrl: string;

  @IsUUID()
  categoryId: string;
}
