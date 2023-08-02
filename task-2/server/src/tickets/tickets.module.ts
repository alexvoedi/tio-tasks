import { Module } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { TicketsRepository } from './tickets.repository';

@Module({
  imports: [],
  controllers: [],
  providers: [TicketsService, TicketsRepository],
  exports: [],
})
export class TicketsModule {}
