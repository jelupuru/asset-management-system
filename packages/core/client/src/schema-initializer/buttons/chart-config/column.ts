/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

export const column = {
  data: [
    {
      type: '家具家电',
      sales: 38,
    },
    {
      type: '粮油副食',
      sales: 52,
    },
    {
      type: '生鲜水果',
      sales: 61,
    },
    {
      type: '美容洗护',
      sales: 145,
    },
    {
      type: '母婴用品',
      sales: 48,
    },
    {
      type: '进口食品',
      sales: 38,
    },
    {
      type: '食品饮料',
      sales: 38,
    },
    {
      type: '家庭清洁',
      sales: 38,
    },
  ],
  xField: 'type',
  yField: 'sales',
  label: {
    // 可手动配置 label 数据标签位置
    position: 'middle', // 'top', 'bottom', 'middle',
    // 配置样式
    style: {
      fill: '#FFFFFF',
      opacity: 0.6,
    },
  },
  xAxis: {
    label: {
      autoHide: true,
      autoRotate: false,
    },
  },
  meta: {
    type: {
      alias: '类别',
    },
    sales: {
      alias: '销售额',
    },
  },
};
