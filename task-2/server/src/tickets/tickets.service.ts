import { Injectable, NotFoundException } from '@nestjs/common';
import { TicketsRepository } from './tickets.repository';
import { Ticket } from './ticket';
import { DeepPartial } from '../types/deep-partial';

@Injectable()
export class TicketsService {
  constructor(private readonly ticketsRepository: TicketsRepository) {}

  async getOne(id: string) {
    const ticket = this.ticketsRepository.getOne(id);

    if (!ticket) {
      throw new NotFoundException('Ticket not found');
    }

    return ticket;
  }

  async getAll() {
    return await this.ticketsRepository.getAll();
  }

  async getByEventId(eventId: string) {
    return await this.ticketsRepository.getByEventId(eventId);
  }

  async create(data: Omit<Ticket, 'id'>) {
    return this.ticketsRepository.create(data);
  }

  async update(id: string, data: DeepPartial<Ticket>) {
    const ticket = await this.getOne(id);

    if (!ticket) {
      throw new NotFoundException('Ticket not found');
    }

    return this.ticketsRepository.update(id, data);
  }

  async delete(id: string) {
    const ticket = await this.getOne(id);

    if (!ticket) {
      throw new NotFoundException('Ticket not found');
    }

    return this.ticketsRepository.delete(id);
  }
}
