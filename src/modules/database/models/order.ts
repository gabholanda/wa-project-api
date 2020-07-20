import { ApiProperty } from '@nestjs/swagger';
import { Model } from 'objection';

export class Order extends Model {
    @ApiProperty({ type: 'integer' })
    public id?: number
    @ApiProperty({ type: 'string' })
    public description: string
    @ApiProperty({ type: 'number' })
    public quantity: number
    @ApiProperty({ type: 'number' })
    public value: number
}