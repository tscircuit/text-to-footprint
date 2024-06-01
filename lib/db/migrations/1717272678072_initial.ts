import {
  type ColumnDefinitions,
  type MigrationBuilder,
  PgLiteral,
} from "node-pg-migrate"

export const shorthands: ColumnDefinitions | undefined = {
  primary_uuid: {
    type: "uuid",
    primaryKey: true,
    notNull: true,
    default: PgLiteral.create("gen_random_uuid()"),
  },
  created_at: {
    type: "timestamptz",
    default: PgLiteral.create("current_timestamp"),
    notNull: true,
  }, //"timestamptz DEFAULT current_timestamp",
}

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.createTable("footprint_request", {
    footprint_request_id: "primary_uuid",
    text_input: { type: "text", notNull: true },
    created_at: "created_at",
  })
}
