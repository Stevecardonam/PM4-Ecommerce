import { IsUUID } from 'class-validator';

export class PartialProductDto {
  @IsUUID()
  id: string;
}
