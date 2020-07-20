import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthRequired } from 'modules/common/guards/token';

import { enRoles } from 'modules/database/interfaces/user';
import { Order } from 'modules/database/models/order';
import { OrderService } from '../services/order';
import { OrderRepository } from '../repositories/order';
import { OrderListValidator } from '../validators/order/list';
import { OrderSaveValidator } from '../validators/order/save';

@ApiTags('Admin: Order')
@Controller('/order')
@AuthRequired([enRoles.admin])
export class OrderController {
  constructor(private orderRepository: OrderRepository, private orderService: OrderService) {}

  @Get()
  @ApiResponse({ status: 200, type: [Order] })
  public async list(@Query() model: OrderListValidator) {
    return this.orderRepository.list(model);
  }

  @Post()
  @ApiResponse({ status: 200, type: Order })
  public async save(@Body() model: OrderSaveValidator) {
    return this.orderService.save(model);
  }
}
