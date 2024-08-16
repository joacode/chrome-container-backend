import { BaseEntity, CreateEntity, Nullable } from '../domain/base-entity';

export class RepositoryInMemory<T extends BaseEntity> {
  protected memory: T[] = [];

  async save(entity: CreateEntity<T>): Promise<T> {
    const payload = {
      ...entity,
      created_at: new Date(),
      updated_at: new Date(),
    } as T;
    this.memory.push(payload);

    return payload;
  }

  async findAll(): Promise<T[]> {
    return new Promise(resolve => resolve(this.memory));
  }

  async findOneById(id: string): Promise<Nullable<T>> {
    const filter = this.memory.filter(data => data.id === id).find(Boolean);
    return new Promise(resolve => resolve(filter));
  }

  async update(update: Partial<T>): Promise<void> {
    const { id, ...rest } = update;
    const currentValue = await this.findOneById(id as string);
    const newValue = { ...currentValue, ...rest, updated_at: new Date() };
    await this.deleteById(id as string);
    this.memory = [...this.memory, newValue] as T[];
  }

  async deleteById(id: string): Promise<void> {
    this.memory = this.memory.filter(data => data.id !== id);
  }
}
