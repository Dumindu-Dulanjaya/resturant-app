import { IsInt, IsNotEmpty, IsOptional, IsString, IsArray, ValidateNested, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateOrderItemDto {
  @IsInt()
  @IsNotEmpty()
  foodItemId: number;

  @IsInt()
  @IsNotEmpty()
  @Min(1)
  qty: number;

  @IsString()
  @IsOptional()
  notes?: string;
}

export class CreateOrderDto {
  @IsString()
  @IsOptional()
  tableNo?: string;

  @IsString()
  @IsOptional()
  notes?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  items: CreateOrderItemDto[];
}
