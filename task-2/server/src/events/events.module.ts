import { Module } from '@nestjs/common';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { EventsRepository } from './events.repository';
import { TicketsModule } from '../tickets/tickets.module';

@Module({
  imports: [TicketsModule],
  controllers: [EventsController],
  providers: [EventsService, EventsRepository],
  exports: [EventsService, EventsRepository],
})
export class EventsModule {}
