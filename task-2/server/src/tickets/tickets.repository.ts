import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../db/base.repository';
import { Ticket } from './ticket';
import { randomUUID } from 'crypto';
import { ID } from '../db/identifier';
import { DeepPartial } from '../types/deep-partial';
import merge from 'lodash.merge';

@Injectable()
export class TicketsRepository implements BaseRepository<Ticket> {
  private readonly tickets: Ticket[] = [];

  async getOne(id: ID): Promise<Ticket> {
    return this.tickets.find((ticket) => ticket.id === id);
  }

  async getAll(): Promise<Ticket[]> {
    return this.tickets;
  }

  async create(
    data: Pick<Ticket, 'eventId' | 'name' | 'barcode'>,
  ): Promise<Ticket> {
    const ticket = {
      ...data,
      id: randomUUID(),
    };

    this.tickets.push(ticket);

    return ticket;
  }

  async update(id: ID, data: DeepPartial<Ticket>): Promise<Ticket> {
    const ticket = this.tickets.find((ticket) => ticket.id === id);

    merge(ticket, data);

    return ticket;
  }

  async delete(id: ID): Promise<Ticket> {
    const index = this.tickets.findIndex((ticket) => ticket.id === id);

    const ticket = this.tickets[index];

    this.tickets.splice(index, 1);

    return ticket;
  }
}
