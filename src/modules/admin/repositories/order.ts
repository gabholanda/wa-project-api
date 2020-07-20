import { Injectable } from '@nestjs/common';
import { IPaginationParams } from 'modules/common/interfaces/pagination';
import { Page, Transaction } from 'objection';
import { Order } from 'modules/database/models/order';

@Injectable()
export class OrderRepository {
  public async list(params: IPaginationParams, transaction?: Transaction): Promise<Page<Order>> {
    let query = Order.query(transaction)
      .select('*')
      .page(params.page, params.pageSize);

    if (params.orderBy) {
      if (params.orderBy !== 'value') {
        query = query.orderBy(params.orderBy, params.orderDirection);
      } else {
        query = query.orderBy('quantity', params.orderDirection);
      }
    }

    if (params.term) {
      if (typeof params.term === 'number') {
        query = query.where(query => {
          return query.where('quantity', `${params.term}`).orWhere('value', `${params.term}`);
        });
      } else {
        query = query.where(query => {
          return query.where('description', 'ilike', `%${params.term}%`);
        });
      }
    }

    return query;
  }

  public async findById(id: number, transaction?: Transaction): Promise<Order> {
    return Order.query(transaction)
      .where({ id })
      .first();
  }

  public async insert(model: Order, transaction?: Transaction): Promise<Order> {
    return Order.query(transaction).insert(model);
  }

  public async update(model: Order, transaction?: Transaction): Promise<Order> {
    return Order.query(transaction).updateAndFetchById(model.id, <Order>model);
  }
}
