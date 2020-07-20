import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsOptional, IsString } from 'class-validator';
import { PaginationValidator } from 'modules/common/validators/pagination';

export class OrderListValidator extends PaginationValidator {
  @IsString()
  @IsOptional()
  @IsIn(['description', 'value', 'quantity'])
  @ApiProperty({ required: false, enum: ['description', 'value', 'quantity'] })
  public orderBy: string;
}
