// import {
//   IsEmail,
//   Matches,
//   IsNotEmpty,
//   IsString,
//   MinLength,
//   MaxLength,
// } from 'class-validator';

// import { PickType } from "@nestjs/mapped-types";

// export class LoginDto {
//   @IsEmail()
//   @IsNotEmpty()
//   email: string;

//   @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,15}$/, {
//     message:
//       'Password must include upper/lowercase letters, a number, a special character (!@#$%^&*), and be 8-15 characters long',
//   })
//   @IsString()
//   @MinLength(8)
//   @MaxLength(15)
//   password: string;
// }

