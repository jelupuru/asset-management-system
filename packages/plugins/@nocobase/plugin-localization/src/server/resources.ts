/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { Cache } from '@nocobase/cache';
import { Database, Transaction } from '@nocobase/database';

export default class Resources {
  cache: Cache;
  db: Database;

  constructor(db: Database, cache: Cache) {
    this.cache = cache;
    this.db = db;
  }

  async getTexts(transaction?: Transaction) {
    if (!(await this.db.collectionExistsInDb('localizationTexts'))) {
      return [];
    }
    return await this.cache.wrap(`texts`, async () => {
      return await this.db.getRepository('localizationTexts').find({
        fields: ['id', 'module', 'text'],
        raw: true,
        transaction,
      });
    });
  }

  async getTranslations(locale: string) {
    if (!(await this.db.collectionExistsInDb('localizationTranslations'))) {
      return [];
    }
    return await this.cache.wrap(`translations:${locale}`, async () => {
      return await this.db.getRepository('localizationTranslations').find({
        fields: ['textId', 'translation'],
        filter: { locale },
        raw: true,
      });
    });
  }

  async getResources(locale: string) {
    const [texts, translations] = await Promise.all([this.getTexts(), this.getTranslations(locale)]);
    const resources = {};
    const textsMap = texts.reduce((map, item) => {
      map[item.id] = item;
      return map;
    }, {});
    translations.forEach((item) => {
      const text = textsMap[item.textId];
      if (!text) {
        return;
      }
      const module = text.module;
      if (!resources[module]) {
        resources[module] = {};
      }
      resources[module][text.text] = item.translation;
    });
    return resources;
  }

  async filterExists(texts: { text: string; module: string }[], transaction?: Transaction) {
    const existTexts = await this.getTexts(transaction);
    return texts.filter((text) => {
      return !existTexts.find((item: any) => item.text === text.text && item.module === text.module);
    });
  }

  async updateCacheTexts(texts: any[], transaction?: Transaction) {
    const newTexts = texts.map((text) => ({
      id: text.id,
      module: text.module,
      text: text.text,
    }));
    const existTexts = await this.getTexts(transaction);
    await this.cache.set(`texts`, [...existTexts, ...newTexts]);
  }

  async reset() {
    await this.cache.reset();
  }
}
