// test the events service

import { TicketsRepository } from '../tickets/tickets.repository';
import { EventsRepository } from './events.repository';
import { EventsService } from './events.service';

describe('EventsService', () => {
  let eventsService: EventsService;
  let eventsRepository: EventsRepository;
  let ticketsRepository: TicketsRepository;

  beforeEach(() => {
    ticketsRepository = new TicketsRepository();
    eventsRepository = new EventsRepository(ticketsRepository);

    eventsService = new EventsService(eventsRepository);
  });

  describe('getOne', () => {
    it('should return an event', async () => {
      const event = await eventsService.create({
        city: 'Leipzig',
        title: 'Wacken',
        date: new Date(),
      });

      const result = await eventsService.getOne(event.id);

      expect(result).toEqual(event);
    });

    it('should throw an error if the event does not exist', async () => {
      await expect(eventsService.getOne('123')).rejects.toThrow(
        'Event not found',
      );
    });
  });

  describe('getAll', () => {
    it('should return all events', async () => {
      const event1 = await eventsService.create({
        city: 'Leipzig',
        title: 'Wacken',
        date: new Date(),
      });

      const event2 = await eventsService.create({
        city: 'Leipzig',
        title: 'Wacken',
        date: new Date(),
      });

      const result = await eventsService.getAll();

      expect(result).toEqual([event1, event2]);
    });
  });

  describe('create', () => {
    it('should create an event', async () => {
      const result = await eventsService.create({
        city: 'Leipzig',
        title: 'Wacken',
        date: new Date(),
      });

      expect(result).toEqual({
        id: expect.any(String),
        city: 'Leipzig',
        title: 'Wacken',
        date: expect.any(Date),
        tickets: [],
      });
    });
  });

  describe('update', () => {
    it('should update an event', async () => {
      const event = await eventsService.create({
        city: 'Leipzig',
        title: 'Wacken',
        date: new Date(),
      });

      const result = await eventsService.update(event.id, {
        city: 'Berlin',
      });

      expect(result).toEqual({
        id: event.id,
        city: 'Berlin',
        title: 'Wacken',
        date: expect.any(Date),
        tickets: [],
      });
    });

    it('should throw an error if the event does not exist', async () => {
      await expect(
        eventsService.update('123', { city: 'Berlin' }),
      ).rejects.toThrow('Event not found');
    });
  });

  describe('delete', () => {
    it('should delete an event', async () => {
      const event = await eventsService.create({
        city: 'Leipzig',
        title: 'Wacken',
        date: new Date(),
      });

      const result = await eventsService.delete(event.id);

      expect(result).toEqual({
        id: event.id,
        city: 'Leipzig',
        title: 'Wacken',
        date: expect.any(Date),
        tickets: [],
      });
    });

    it('should throw an error if the event does not exist', async () => {
      await expect(eventsService.delete('123')).rejects.toThrow(
        'Event not found',
      );
    });
  });
});
