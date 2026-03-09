import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  IsEnum,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class CreateAdminDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsEnum(['admin', 'super_admin'])
  @IsNotEmpty()
  role: 'admin' | 'super_admin';

  @IsNumber()
  @IsOptional()
  restaurantId?: number;
}
