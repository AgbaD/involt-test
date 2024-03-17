import { HttpStatus } from '@nestjs/common';
import { ApiResponseProperty } from '@nestjs/swagger';
import { Response } from 'express';

export class CreatedResponseDto {
  @ApiResponseProperty({
    example: true,
  })
  status: boolean;
  @ApiResponseProperty({
    example: 201,
  })
  statusCode: number;
}

export class OkResponseDto {
  @ApiResponseProperty({
    example: true,
  })
  status: boolean;
  @ApiResponseProperty({
    example: 200,
  })
  statusCode: number;
}

export class BadRequestResponseDto {
  @ApiResponseProperty({
    example: false,
  })
  status: boolean;
  @ApiResponseProperty({
    example: 400,
  })
  statusCode: number;
  @ApiResponseProperty({ example: new Date() })
  timestamp: Date;
}

export class HttpResponse {
  createdResponse(res: Response, message: string, data: any) {
    return res.status(HttpStatus.CREATED).send({
      success: true,
      statusCode: HttpStatus.CREATED,
      message,
      data,
    });
  }

  okResponse(res: Response, message: string, data?: any) {
    return res.status(HttpStatus.OK).send({
      success: true,
      statusCode: HttpStatus.OK,
      message,
      data,
    });
  }

  badRequestResponse(res: Response, message: string, data?: any) {
    return res.status(HttpStatus.BAD_REQUEST).send({
      success: false,
      statusCode: HttpStatus.BAD_REQUEST,
      message: message.replace(/(\r\n|\n|\r)/gm, ''),
      data,
    });
  }
}
