import { Optional } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsHexColor, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ModelDto {
  @ApiProperty({ type: String, required: false, example: 'Object' })
  @Optional()
  @IsString()
  title?: string;
  
  @ApiProperty({
    type: String,
    required: true,
    description: '3D Box color',
    example: '0xffffff',
  })
  @IsNotEmpty()
  @IsHexColor()
  color: string;

  @ApiProperty({
    type: Number,
    required: true,
    description: '3D Box width',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  width: number;

  @ApiProperty({
    type: Number,
    required: true,
    description: '3D Box height',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  height: number;

  @ApiProperty({
    type: Number,
    required: true,
    description: '3D Box depth',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  depth: number;
}
