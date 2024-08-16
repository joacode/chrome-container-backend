import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

export * from '@nestjs/typeorm';
export * from 'typeorm';

export const TypeOrmConfiguration: () => TypeOrmModuleOptions = () => ({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT) ?? 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  schema: process.env.POSTGRES_SCHEMA,
  database: process.env.POSTGRES_DB,
  retryAttempts: Number(process.env.POSTGRES_RETRY_ATTEMPTS) ?? 0,
  logging: JSON.parse(process.env.TYPEORM_LOGGING ?? '{}'),
  synchronize: false,
  autoLoadEntities: true,
});

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  private isTest(): boolean {
    return process.env.NODE_ENV === 'test';
  }

  private isProd(): boolean {
    return process.env.NODE_ENV === 'production';
  }

  private getPostgresConfiguration(): TypeOrmModuleOptions {
    const POSTGRES_CONFIGURATION = TypeOrmConfiguration();
    return {
      ...POSTGRES_CONFIGURATION,
      autoLoadEntities: true,
      synchronize: false,
      logging: !this.isProd() && !this.isTest(),
    };
  }

  private getSqliteConfiguration(): TypeOrmModuleOptions {
    return {
      type: 'sqlite',
      database: './data/test.sqlite',
      autoLoadEntities: true,
      logging: false,
      synchronize: this.isTest(),
      dropSchema: this.isTest(),
    };
  }

  createTypeOrmOptions() {
    if (this.isTest()) {
      return this.getSqliteConfiguration();
    }

    return this.getPostgresConfiguration();
  }
}
