import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dtos/create-ticket.dto';
import { UpdateTicketDto } from './dtos/update-ticket.dto';

@Controller()
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Get(['tickets/:ticketId', 'events/:eventId/tickets/:ticketId'])
  async getById(
    @Param('eventId') eventId: string,
    @Param('ticketId') ticketId: string,
  ) {
    return this.ticketsService.getOne(ticketId);
  }

  @Get(['tickets', 'events/:eventId/tickets'])
  async getAll(@Param('eventId') eventId?: string) {
    if (eventId) {
      return this.ticketsService.getByEventId(eventId);
    } else {
      return this.ticketsService.getAll();
    }
  }

  @Post('events/:eventId/tickets')
  async create(
    @Param('eventId') eventId: string,
    @Body() dto: CreateTicketDto,
  ) {
    return this.ticketsService.create({
      ...dto,
      eventId,
    });
  }

  @Patch(['tickets/:ticketId', 'events/:eventId/tickets/:ticketId'])
  async update(
    @Param('ticketId') ticketId: string,
    @Param('eventId') eventId: string,
    @Body() dto: UpdateTicketDto,
  ) {
    return this.ticketsService.update(ticketId, dto);
  }

  @Delete(['tickets/:ticketId', 'events/:eventId/tickets/:ticketId'])
  async delete(
    @Param('eventId') eventId: string,
    @Param('ticketId') ticketId: string,
  ) {
    return this.ticketsService.delete(ticketId);
  }
}
