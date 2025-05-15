import { IsUUID, IsArray, IsNotEmpty } from 'class-validator';

export class CreateOrderDto {
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @IsArray()
  products: string[];
}
