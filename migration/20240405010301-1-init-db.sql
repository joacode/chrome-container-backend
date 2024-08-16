--liquibase formatted sql
--changeset joaco:1 labels: init db context: init db

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS "accounts" (
  "id" UUID DEFAULT uuid_generate_v4() NOT NULL,
  "email" VARCHAR UNIQUE NOT NULL,
  "password" VARCHAR,
  "primary_name" VARCHAR NOT NULL,
  "last_name" VARCHAR NOT NULL,
  "type" VARCHAR NOT NULL,
  "external" BOOLEAN,
  "created_at" TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL,
  "updated_at" TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL,
  "deleted_at" TIMESTAMP WITHOUT TIME ZONE DEFAULT NULL,
  CONSTRAINT "PK_Accounts" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "auth_tokens" (
  "id" UUID DEFAULT uuid_generate_v4() NOT NULL,
  "account_id" UUID NOT NULL,
  "refresh_token" VARCHAR,
  "expires_at" TIMESTAMP WITHOUT TIME ZONE,
  "created_at" TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL,
  "updated_at" TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL,
  "deleted_at" TIMESTAMP WITHOUT TIME ZONE DEFAULT NULL,
  CONSTRAINT "PK_Auth_Tokens" PRIMARY KEY ("id"),
  CONSTRAINT "FK_AuthTokens_Accounts" FOREIGN KEY ("account_id") REFERENCES "accounts" ("id")
);

CREATE TABLE IF NOT EXISTS "external_sso" (
  "id" UUID DEFAULT uuid_generate_v4() NOT NULL,
  "provider" VARCHAR NOT NULL,
  "provider_id" VARCHAR NOT NULL,
  "account_id" UUID NOT NULL,
  "created_at" TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL,
  "updated_at" TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL,
  "deleted_at" TIMESTAMP WITHOUT TIME ZONE DEFAULT NULL,
  CONSTRAINT "PK_External_Sso" PRIMARY KEY ("id"),
  CONSTRAINT "FK_External_Sso_Accounts" FOREIGN KEY ("account_id") REFERENCES "accounts" ("id")
);


GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO "chrome_container_backend";
