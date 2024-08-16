import { BaseEntity } from './base-entity';

export interface WineMetadata extends BaseEntity {
  name?: string;
  keyword: string;
  enabled?: boolean;
  image_url?: string;
}
