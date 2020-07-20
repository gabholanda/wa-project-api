import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Order } from 'modules/database/models/order';

import { OrderRepository } from '../repositories/order';

@Injectable()
export class OrderService {
  constructor(private orderRepository: OrderRepository) {}

  public async save(model: Order): Promise<Order> {
    if (!model.description || !model.value || !model.quantity) {
      throw new BadRequestException('all-params-required');
    }

    if (model.id) return this.update(model);
    return this.create(model);
  }

  private async create(model: Order): Promise<Order> {
    return this.orderRepository.insert(model);
  }

  private async update(model: Order): Promise<Order> {
    const order = await this.orderRepository.findById(model.id);
    if (!order) throw new NotFoundException('not-found');
    return this.orderRepository.update(model);
  }
}
