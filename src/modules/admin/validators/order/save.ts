import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, Min, MinLength, IsNumber } from 'class-validator';
import { Order } from 'modules/database/models/order';

export class OrderSaveValidator extends Order {
  @IsOptional()
  @IsInt()
  @Min(0)
  @ApiProperty({ required: false, type: 'integer' })
  public id?: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(300)
  @ApiProperty({ required: true, type: 'string', minLength: 3, maxLength: 300 })
  public description: string;

  @IsNotEmpty()
  @IsInt()
  @ApiProperty({ required: true, type: 'integer' })
  public quantity: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ required: true, type: 'number' })
  public value: number;
}
