import { BaseEntity } from './base.entity';
import { ID } from './identifier';

export interface BaseRepository<T extends BaseEntity> {
  getOne(id: ID): Promise<T>;
  getAll(): Promise<T[]>;
  create(data: T): Promise<T>;
  update(id: string, data: T): Promise<T>;
  delete(id: ID): Promise<T>;
}
