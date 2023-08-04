import { Test, TestingModule } from '@nestjs/testing';
import { EventsRepository } from '../events/events.repository';
import { TicketsRepository } from './tickets.repository';
import { TicketsService } from './tickets.service';

describe('TicketsService', () => {
  let ticketsService: TicketsService;
  let ticketsRepository: TicketsRepository;
  let eventsRepository: EventsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TicketsService,
        {
          provide: TicketsRepository,
          useValue: {
            getOne: jest.fn(),
            getAll: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
        {
          provide: EventsRepository,
          useValue: {
            getOne: jest.fn(),
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    ticketsService = module.get<TicketsService>(TicketsService);
    ticketsRepository = module.get<TicketsRepository>(TicketsRepository);
    eventsRepository = module.get<EventsRepository>(EventsRepository);
  });

  it('should be defined', () => {
    expect(ticketsService).toBeDefined();
  });

  describe('getOne', () => {
    it('should return a ticket', async () => {
      const ticket = {
        id: '1',
        barcode: '123456789',
        name: {
          first: 'John',
          last: 'Doe',
        },
        eventId: '1',
      };

      (ticketsRepository.getOne as jest.Mock).mockResolvedValue(ticket);

      const result = await ticketsService.getOne(ticket.id);

      expect(result).toEqual(ticket);
    });

    it('should throw an error if the ticket does not exist', async () => {
      await expect(ticketsService.getOne('123')).rejects.toThrow(
        'Ticket not found',
      );
    });
  });

  describe('getAll', () => {
    it('should return all tickets', async () => {
      const event = {
        id: '1',
        city: 'Leipzig',
        title: 'Wacken',
        date: new Date(),
      };

      (eventsRepository.getOne as jest.Mock).mockResolvedValue(event);

      const ticket1 = {
        barcode: '123456789',
        name: {
          first: 'John',
          last: 'Doe',
        },
        eventId: event.id,
      };

      const ticket2 = {
        barcode: '123456789',
        name: {
          first: 'John',
          last: 'Doe',
        },
        eventId: event.id,
      };

      (ticketsRepository.getAll as jest.Mock).mockResolvedValue([
        ticket1,
        ticket2,
      ]);

      const result = await ticketsService.getAll();

      expect(result).toEqual([ticket1, ticket2]);
    });
  });

  describe('create', () => {
    it('should create a ticket', async () => {
      const event = {
        id: '1',
        city: 'Leipzig',
        title: 'Wacken',
        date: new Date(),
        tickets: [],
      };

      (eventsRepository.getOne as jest.Mock).mockResolvedValue(event);

      const ticket = {
        id: '1',
        barcode: '123456789',
        name: {
          first: 'John',
          last: 'Doe',
        },
        eventId: event.id,
      };

      (ticketsRepository.create as jest.Mock).mockResolvedValue(ticket);

      const result = await ticketsService.create(ticket);

      expect(result).toEqual({
        id: '1',
        barcode: '123456789',
        name: {
          first: 'John',
          last: 'Doe',
        },
        eventId: event.id,
      });
    });

    it('should throw an error if the event does not exist', async () => {
      const ticket = {
        barcode: '123456789',
        name: {
          first: 'John',
          last: 'Doe',
        },
        eventId: '123',
      };

      await expect(ticketsService.create(ticket)).rejects.toThrow(
        'Event not found',
      );
    });
  });
});
