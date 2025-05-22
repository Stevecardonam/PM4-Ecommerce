import { ApiProperty, PickType } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  MinLength,
  MaxLength,
  Matches,
  IsNotEmpty,
  IsNumber,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'John Doe' })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  name: string;

  
  /**
   * @example 'John@example.com'
   */
  @IsEmail()
  @IsNotEmpty()
  email: string;

   /**
   * @example 'Password1!'
   */
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,15}$/, {
    message:
      'Password must include upper/lowercase letters, a number, a special character (!@#$%^&*), and be 8-15 characters long',
  })
  @IsString()
  @MinLength(8)
  @MaxLength(15)
  password: string;

  @ApiProperty({ example: 'Password1!' })
  @IsString()
  @MinLength(8)
  @MaxLength(15)
  confirmPassword: string;

  @ApiProperty({ example: '123 Main Street' })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(80)
  address: string;

  @ApiProperty({ example: '1234567890' })
  @IsNumber()
  @IsNotEmpty()
  phone: number;

  @ApiProperty({ example: 'United States' })
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(20)
  country: string;

  @ApiProperty({ example: 'New York' })
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(20)
  city: string;
}

export class LoginDto extends PickType(CreateUserDto, ['email', 'password']) {}

export class UpdateUserDto extends PickType(CreateUserDto, [
  'name',
  'email',
  'password',
  'address',
  'phone',
  'country',
  'city',
]) {}