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
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;


  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,15}$/, {
    message:
      'Password must include upper/lowercase letters, a number, a special character (!@#$%^&*), and be 8-15 characters long',
  })
  @IsString()
  @MinLength(8)
  @MaxLength(15)
  password: string;

  @IsString()
  @MinLength(8)
  @MaxLength(15)
  confirmPassword: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(80)
  address: string;

  @IsNumber()
  @IsNotEmpty()
  phone: number;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(20)
  country: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(20)
  city: string;
}

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,15}$/, {
    message:
      'Password must include upper/lowercase letters, a number, a special character (!@#$%^&*), and be 8-15 characters long',
  })
  @IsString()
  @MinLength(8)
  @MaxLength(15)
  password: string;
}