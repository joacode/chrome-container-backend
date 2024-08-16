import { CreateEntity, Nullable, UpdateEntity } from './base-entity';

export interface WineMetadataRepository<T> {
  save(metadata: CreateEntity<T>): Promise<T>;
  findOneById(metadataId: string): Promise<Nullable<T>>;
  findOneByKeyword(keyword: string): Promise<Nullable<T>>;
  findAll(): Promise<T[]>;
  deleteById(metadataId: string): Promise<void>;
  update(metadata: UpdateEntity<T>): Promise<void>;
}
