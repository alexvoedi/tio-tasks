import { Module } from '@nestjs/common';
import { TicketsModule } from './tickets/tickets.module';
import { EventsModule } from './events/events.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), TicketsModule, EventsModule],
})
export class AppModule {}
