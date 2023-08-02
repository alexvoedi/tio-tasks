import { Injectable } from '@nestjs/common';
import { TicketsRepository } from './tickets.repository';
import { CreateTicketDto } from './dtos/create-ticket.dto';
import { UpdateTicketDto } from './dtos/update-ticket.dto';

@Injectable()
export class TicketsService {
  constructor(private readonly ticketsRepository: TicketsRepository) {}

  async getOne(id: string) {
    const ticket = this.ticketsRepository.getOne(id);

    if (!ticket) {
      throw new Error('Ticket not found');
    }

    return ticket;
  }

  async getAll() {
    return this.ticketsRepository.getAll();
  }

  async create(data: CreateTicketDto) {
    return this.ticketsRepository.create(data);
  }

  async update(id: string, data: UpdateTicketDto) {
    const ticket = await this.getOne(id);

    if (!ticket) {
      throw new Error('Ticket not found');
    }

    return this.ticketsRepository.update(id, data);
  }

  async delete(id: string) {
    const ticket = await this.getOne(id);

    if (!ticket) {
      throw new Error('Ticket not found');
    }

    return this.ticketsRepository.delete(id);
  }
}
