import { Injectable, NotFoundException } from '@nestjs/common';
import { EventsRepository } from './events.repository';
import { UpdateEventDto } from './dtos/update-event.dto';
import { TicketsRepository } from '../tickets/tickets.repository';
import { Event } from './event';
import { Ticket } from '../tickets/ticket';
import { DeepPartial } from '../types/deep-partial';

@Injectable()
export class EventsService {
  constructor(
    private readonly eventsRepository: EventsRepository,
    private readonly ticketsRepository: TicketsRepository,
  ) {}

  async getOne(id: string) {
    const event = await this.eventsRepository.getOne(id);

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    return event;
  }

  async getAll() {
    return this.eventsRepository.getAll();
  }

  async create(
    data: Omit<Event, 'id' | 'tickets'> & {
      tickets?: Omit<Ticket, 'id' | 'eventId'>[];
    },
  ) {
    return this.eventsRepository.create(data);
  }

  async update(id: string, data: DeepPartial<Event>) {
    const event = await this.getOne(id);

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    return this.eventsRepository.update(id, data);
  }

  async delete(id: string) {
    const event = await this.getOne(id);

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    return this.eventsRepository.delete(id);
  }

  async addTicket(eventId: string, ticketId: string) {
    const event = await this.getOne(eventId);

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    const ticket = await this.ticketsRepository.getOne(ticketId);

    if (!ticket) {
      throw new NotFoundException('Ticket not found');
    }

    return this.eventsRepository.update(eventId, ticket);
  }
}
