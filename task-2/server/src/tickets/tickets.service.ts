import { Injectable, NotFoundException } from '@nestjs/common';
import { TicketsRepository } from './tickets.repository';
import { Ticket } from './ticket';
import { DeepPartial } from '../types/deep-partial';
import { EventsRepository } from '../events/events.repository';

@Injectable()
export class TicketsService {
  constructor(
    private readonly ticketsRepository: TicketsRepository,
    private readonly eventsRepository: EventsRepository,
  ) {}

  async getOne(id: string) {
    const ticket = await this.ticketsRepository.getOne(id);

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
    const event = await this.eventsRepository.getOne(data.eventId);

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    const ticket = await this.ticketsRepository.create(data);

    event.tickets.push(ticket);

    return ticket;
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
