/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import Database from '../database';
import MysqlQueryInterface from './mysql-query-interface';
import PostgresQueryInterface from './postgres-query-interface';
import SqliteQueryInterface from './sqlite-query-interface';

export default function buildQueryInterface(db: Database) {
  const map = {
    mysql: MysqlQueryInterface,
    mariadb: MysqlQueryInterface,
    postgres: PostgresQueryInterface,
    sqlite: SqliteQueryInterface,
  };

  if (db.isPostgresCompatibleDialect()) {
    return new PostgresQueryInterface(db);
  }

  const dialect = db.options.dialect;

  if (!map[dialect]) {
    return null;
  }

  return new map[db.options.dialect](db);
}
