import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../db/base.repository';
import { Event } from './event';
import { randomUUID } from 'crypto';
import { DeepPartial } from '../types/deep-partial';
import { TicketsRepository } from '../tickets/tickets.repository';
import { Ticket } from '../tickets/ticket';
import { merge } from 'lodash';
import { ID } from '../db/identifier';

@Injectable()
export class EventsRepository implements BaseRepository<Event> {
  private readonly events: Event[] = [];

  constructor(private readonly ticketsRepository: TicketsRepository) {}

  async getOne(id: ID): Promise<Event> {
    return this.events.find((event) => event.id === id);
  }

  async getAll(): Promise<Event[]> {
    const events = this.events;

    for (const event of events) {
      event.tickets = await this.ticketsRepository.getByEventId(event.id);
    }

    return events;
  }

  async create(
    data: Omit<Event, 'id' | 'tickets'> & {
      tickets?: Omit<Ticket, 'id' | 'eventId'>[];
    },
  ): Promise<Event> {
    const eventId = randomUUID();

    const event = {
      ...data,
      tickets: [],
      id: eventId,
    };

    this.events.push(event);

    if (data.tickets) {
      for (const ticket of data.tickets) {
        await this.ticketsRepository.create({
          ...ticket,
          eventId,
        });

        event.tickets.push(ticket);
      }
    }

    return event;
  }

  async update(id: ID, data: DeepPartial<Event>): Promise<Event> {
    const event = this.events.find((event) => event.id === id);

    merge(event, data);

    return event;
  }

  async delete(id: ID): Promise<Event> {
    const index = this.events.findIndex((event) => event.id === id);

    const event = this.events[index];

    this.events.splice(index, 1);

    this.ticketsRepository.deleteByEventId(id);

    return event;
  }
}
