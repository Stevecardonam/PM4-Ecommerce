import { IsUUID, IsArray, IsNotEmpty, ArrayMinSize } from 'class-validator';

export class CreateOrderDto {
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @ArrayMinSize(1)
  @IsArray()
  products: { id: string }[];
}
