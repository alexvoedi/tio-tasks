import { Module } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { TicketsRepository } from './tickets.repository';
import { TicketsController } from './tickets.controller';

@Module({
  imports: [],
  controllers: [TicketsController],
  providers: [TicketsService, TicketsRepository],
  exports: [TicketsService, TicketsRepository],
})
export class TicketsModule {}
