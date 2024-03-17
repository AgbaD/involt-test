import { IsNotEmpty, IsObject, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Profile } from '@prisma/client';

export class LoginRespDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'The response message',
    example: '',
  })
  message: string;

  @IsObject()
  @ApiProperty({
    type: String,
    description: 'The profile and login token for the user',
  })
  data: { profile: Profile; token: string };
}

export class RegisterRespDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'The response message',
    example: '',
  })
  message: string;

  @IsObject()
  @ApiProperty({
    type: String,
    description: 'The profile and login token for the user',
  })
  data: { profile: Profile };
}
