import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dtos/create-event.dto';
import { UpdateEventDto } from './dtos/update-event.dto';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get(':eventId')
  async getById(@Param('eventId') eventId: string) {
    return this.eventsService.getOne(eventId);
  }

  @Get()
  async getAll() {
    return this.eventsService.getAll();
  }

  @Post()
  async create(@Body() dto: CreateEventDto) {
    return this.eventsService.create(dto);
  }

  @Patch(':eventId')
  async update(@Param('eventId') eventId: string, @Body() dto: UpdateEventDto) {
    return this.eventsService.update(eventId, dto);
  }

  @Delete(':eventId')
  async delete(@Param('eventId') eventId: string) {
    return this.eventsService.delete(eventId);
  }
}
