/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { useChartQueryMetadataContext } from '../ChartQueryMetadataProvider';
import { useEffect, useState } from 'react';

const useFieldsById = (queryId: number) => {
  const [fields, setFields] = useState([]);
  const ctx = useChartQueryMetadataContext();
  useEffect(() => {
    const chartQueryList = ctx?.data;
    if (chartQueryList && Array.isArray(chartQueryList)) {
      const currentQuery = chartQueryList.find((chartQuery) => chartQuery.id === queryId);
      setFields(currentQuery?.fields || []);
    }
  }, [queryId]);
  return {
    fields,
  };
};

export { useFieldsById };
