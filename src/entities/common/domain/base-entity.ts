export type Nullable<T> = T | undefined | null;
export type CreateEntity<T> = Omit<T, 'id' | 'created_at' | 'updated_at'>;
export type UpdateEntity<T> = Omit<T, 'created_at' | 'updated_at'>;

export interface BaseEntity {
  id: string;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
}

export interface Pagination {
  page?: number;
  limit?: number;
  sortBy?: string;
}
