import { Test, TestingModule } from '@nestjs/testing';
import { TicketsController } from './tickets.controller';
import { TicketsService } from './tickets.service';

describe('TicketsController', () => {
  let controller: TicketsController;
  let service: TicketsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TicketsController],
      providers: [
        {
          provide: TicketsService,
          useValue: {
            getOne: jest.fn(),
            getAll: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<TicketsController>(TicketsController);
    service = module.get<TicketsService>(TicketsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
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

      const event = {
        id: '1',
        city: 'Leipzig',
        title: 'Wacken',
        date: new Date(),
        tickets: [ticket],
      };

      (service.getOne as jest.Mock).mockResolvedValue(ticket);

      const result = await controller.getById(event.id, ticket.id);

      expect(result).toEqual(ticket);
    });
  });

  describe('getAll', () => {
    it('should return all tickets', async () => {
      const ticket1 = {
        id: '1',
        barcode: '123456789',
        name: {
          first: 'John',
          last: 'Doe',
        },
        eventId: '1',
      };

      const ticket2 = {
        id: '2',
        barcode: '123456789',
        name: {
          first: 'John',
          last: 'Doe',
        },
        eventId: '1',
      };

      (service.getAll as jest.Mock).mockResolvedValue([ticket1, ticket2]);

      const result = await controller.getAll();

      expect(result).toEqual([ticket1, ticket2]);
    });
  });

  describe('create', () => {
    it('should create a ticket', async () => {
      const eventId = '1';

      const ticket = {
        barcode: '123456789',
        name: {
          first: 'John',
          last: 'Doe',
        },
        eventId,
      };

      (service.create as jest.Mock).mockResolvedValue({
        id: '1',
        ...ticket,
      });

      const result = await controller.create(eventId, ticket);

      expect(result).toEqual({
        id: '1',
        ...ticket,
      });
    });
  });

  describe('update', () => {
    it('should update a ticket', async () => {
      const eventId = '1';

      const ticket = {
        id: '1',
        barcode: '123456789',
        name: {
          first: 'John',
          last: 'Doe',
        },
        eventId,
      };

      (service.update as jest.Mock).mockResolvedValue(ticket);

      const result = await controller.update(ticket.id, eventId, {
        barcode: '987654321',
      });

      expect(result).toEqual(ticket);
    });
  });

  describe('delete', () => {
    it('should delete a ticket', async () => {
      const eventId = '1';

      const ticket = {
        id: '1',
        barcode: '123456789',
        name: {
          first: 'John',
          last: 'Doe',
        },
        eventId,
      };

      (service.delete as jest.Mock).mockResolvedValue(ticket);

      const result = await controller.delete(ticket.id, eventId);

      expect(result).toEqual(ticket);
    });
  });
});
