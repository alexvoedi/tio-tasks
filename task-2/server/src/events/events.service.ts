import { Injectable } from '@nestjs/common';
import { EventsRepository } from './events.repository';
import { CreateEventDto } from './dtos/create-event.dto';
import { UpdateEventDto } from './dtos/update-event.dto';
import { TicketsRepository } from '../tickets/tickets.repository';

@Injectable()
export class EventsService {
  constructor(
    private readonly eventsRepository: EventsRepository,
    private readonly ticketsRepository: TicketsRepository,
  ) {}

  async getOne(id: string) {
    const event = await this.eventsRepository.getOne(id);

    if (!event) {
      throw new Error('Event not found');
    }

    return event;
  }

  async getAll() {
    return this.eventsRepository.getAll();
  }

  async create(data: CreateEventDto) {
    return this.eventsRepository.create(data);
  }

  async update(id: string, data: UpdateEventDto) {
    const event = await this.getOne(id);

    if (!event) {
      throw new Error('Event not found');
    }

    return this.eventsRepository.update(id, data);
  }

  async delete(id: string) {
    const event = await this.getOne(id);

    if (!event) {
      throw new Error('Event not found');
    }

    return this.eventsRepository.delete(id);
  }

  async addTicket(eventId: string, ticketId: string) {
    const event = await this.getOne(eventId);

    if (!event) {
      throw new Error('Event not found');
    }

    const ticket = await this.ticketsRepository.getOne(ticketId);

    if (!ticket) {
      throw new Error('Ticket not found');
    }

    return this.eventsRepository.update(eventId, ticket);
  }
}
