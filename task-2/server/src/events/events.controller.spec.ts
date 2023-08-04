import { Test, TestingModule } from '@nestjs/testing';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';

describe('EventsController', () => {
  let controller: EventsController;
  let service: EventsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventsController],
      providers: [
        {
          provide: EventsService,
          useValue: {
            getAll: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<EventsController>(EventsController);
    service = module.get<EventsService>(EventsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAll', () => {
    it('should return all events', async () => {
      const event1 = {
        id: '1',
        city: 'Leipzig',
        title: 'Wacken',
        date: new Date(),
        tickets: [],
      };

      const event2 = {
        id: '2',
        city: 'Leipzig',
        title: 'Wacken',
        date: new Date(),
        tickets: [],
      };

      (service.getAll as jest.Mock).mockResolvedValue([event1, event2]);

      const result = await controller.getAll();

      expect(result).toEqual([event1, event2]);
    });
  });

  describe('create', () => {
    it('should create an event', async () => {
      const event = {
        id: '1',
        city: 'Leipzig',
        title: 'Wacken',
        date: new Date(),
        tickets: [],
      };

      (service.create as jest.Mock).mockResolvedValue(event);

      const result = await controller.create(event);

      expect(result).toEqual(event);
    });
  });

  describe('update', () => {
    it('should update an event', async () => {
      const event = {
        id: '1',
        city: 'Leipzig',
        title: 'Wacken',
        date: new Date(),
        tickets: [],
      };

      (service.update as jest.Mock).mockResolvedValue(event);

      const result = await controller.update(event.id, {
        city: 'Berlin',
      });

      expect(result).toEqual(event);
    });
  });

  describe('delete', () => {
    it('should delete an event', async () => {
      const event = {
        id: '1',
        city: 'Leipzig',
        title: 'Wacken',
        date: new Date(),
        tickets: [],
      };

      (service.delete as jest.Mock).mockResolvedValue(event);

      const result = await controller.delete(event.id);

      expect(result).toEqual(event);
    });
  });
});
