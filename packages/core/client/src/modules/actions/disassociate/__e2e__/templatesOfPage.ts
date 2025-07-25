/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { PageConfig } from '@nocobase/test/e2e';

export const disassociatePage: PageConfig = {
  collections: [
    {
      name: 'collection1',
      fields: [
        {
          name: 'manyToMany',
          interface: 'm2m',
          target: 'collection2',
        },
      ],
    },
    {
      name: 'collection2',
      fields: [
        {
          name: 'singleLineText',
          interface: 'input',
        },
      ],
    },
  ],
  pageSchema: {
    _isJSONSchemaObject: true,
    version: '2.0',
    type: 'void',
    'x-component': 'Page',
    'x-index': 1,
    properties: {
      wpr26fau9xr: {
        _isJSONSchemaObject: true,
        version: '2.0',
        type: 'void',
        'x-component': 'Grid',
        'x-initializer': 'page:addBlock',
        'x-index': 1,
        properties: {
          en9rmxzezha: {
            _isJSONSchemaObject: true,
            version: '2.0',
            type: 'void',
            'x-component': 'Grid.Row',
            properties: {
              yxbglvb5hog: {
                _isJSONSchemaObject: true,
                version: '2.0',
                type: 'void',
                'x-component': 'Grid.Col',
                properties: {
                  '8j54tok1ami': {
                    _isJSONSchemaObject: true,
                    version: '2.0',
                    type: 'void',
                    'x-decorator': 'TableBlockProvider',
                    'x-acl-action': 'collection1:list',
                    'x-decorator-props': {
                      collection: 'collection1',
                      dataSource: 'main',
                      action: 'list',
                      params: {
                        pageSize: 20,
                      },
                      rowKey: 'id',
                      showIndex: true,
                      dragSort: false,
                      disableTemplate: false,
                    },
                    'x-toolbar': 'BlockSchemaToolbar',
                    'x-settings': 'blockSettings:table',
                    'x-component': 'CardItem',
                    'x-filter-targets': [],
                    properties: {
                      actions: {
                        _isJSONSchemaObject: true,
                        version: '2.0',
                        type: 'void',
                        'x-initializer': 'table:configureActions',
                        'x-component': 'ActionBar',
                        'x-component-props': {
                          style: {
                            marginBottom: 'var(--nb-spacing)',
                          },
                        },
                        'x-uid': 'b678n93qa6y',
                        'x-async': false,
                        'x-index': 1,
                      },
                      qikcey9adni: {
                        _isJSONSchemaObject: true,
                        version: '2.0',
                        type: 'array',
                        'x-initializer': 'table:configureColumns',
                        'x-component': 'TableV2',
                        'x-component-props': {
                          rowKey: 'id',
                          rowSelection: {
                            type: 'checkbox',
                          },
                          useProps: '{{ useTableBlockProps }}',
                        },
                        properties: {
                          actions: {
                            _isJSONSchemaObject: true,
                            version: '2.0',
                            type: 'void',
                            title: '{{ t("Actions") }}',
                            'x-action-column': 'actions',
                            'x-decorator': 'TableV2.Column.ActionBar',
                            'x-component': 'TableV2.Column',
                            'x-designer': 'TableV2.ActionColumnDesigner',
                            'x-initializer': 'table:configureItemActions',
                            properties: {
                              m7jxx6ybqin: {
                                _isJSONSchemaObject: true,
                                version: '2.0',
                                type: 'void',
                                'x-decorator': 'DndContext',
                                'x-component': 'Space',
                                'x-component-props': {
                                  split: '|',
                                },
                                properties: {
                                  xm4xv98j8rq: {
                                    'x-uid': 'zzpqq51vya7',
                                    _isJSONSchemaObject: true,
                                    version: '2.0',
                                    type: 'void',
                                    title: 'Edit record',
                                    'x-action': 'update',
                                    'x-toolbar': 'ActionSchemaToolbar',
                                    'x-settings': 'actionSettings:edit',
                                    'x-component': 'Action.Link',
                                    'x-component-props': {
                                      openMode: 'drawer',
                                      danger: false,
                                    },
                                    'x-decorator': 'ACLActionProvider',
                                    'x-designer-props': {
                                      linkageAction: true,
                                    },
                                    properties: {
                                      drawer: {
                                        _isJSONSchemaObject: true,
                                        version: '2.0',
                                        type: 'void',
                                        title: '{{ t("Edit record") }}',
                                        'x-component': 'Action.Container',
                                        'x-component-props': {
                                          className: 'nb-action-popup',
                                        },
                                        properties: {
                                          tabs: {
                                            _isJSONSchemaObject: true,
                                            version: '2.0',
                                            type: 'void',
                                            'x-component': 'Tabs',
                                            'x-component-props': {},
                                            'x-initializer': 'TabPaneInitializers',
                                            properties: {
                                              tab1: {
                                                _isJSONSchemaObject: true,
                                                version: '2.0',
                                                type: 'void',
                                                title: '{{t("Edit")}}',
                                                'x-component': 'Tabs.TabPane',
                                                'x-designer': 'Tabs.Designer',
                                                'x-component-props': {},
                                                properties: {
                                                  grid: {
                                                    _isJSONSchemaObject: true,
                                                    version: '2.0',
                                                    type: 'void',
                                                    'x-component': 'Grid',
                                                    'x-initializer': 'popup:common:addBlock',
                                                    'x-uid': '4ywsuzafbcb',
                                                    'x-async': false,
                                                    'x-index': 1,
                                                  },
                                                },
                                                'x-uid': 'i9vjup0exgk',
                                                'x-async': false,
                                                'x-index': 1,
                                              },
                                            },
                                            'x-uid': 'v193kvjot2a',
                                            'x-async': false,
                                            'x-index': 1,
                                          },
                                        },
                                        'x-uid': 'cm1v9u7tfsu',
                                        'x-async': false,
                                        'x-index': 1,
                                      },
                                    },
                                    'x-async': false,
                                    'x-index': 1,
                                  },
                                },
                                'x-uid': '1wxlbm4mmvg',
                                'x-async': false,
                                'x-index': 1,
                              },
                            },
                            'x-uid': '5sqdt97tixj',
                            'x-async': false,
                            'x-index': 1,
                          },
                        },
                        'x-uid': 'kplsu47q2a6',
                        'x-async': false,
                        'x-index': 2,
                      },
                    },
                    'x-uid': 'pq9i71986i8',
                    'x-async': false,
                    'x-index': 1,
                  },
                },
                'x-uid': 'oce2w1t8coi',
                'x-async': false,
                'x-index': 1,
              },
            },
            'x-uid': 'i7ti4qryd4o',
            'x-async': false,
            'x-index': 1,
          },
          gq928ipecvy: {
            _isJSONSchemaObject: true,
            version: '2.0',
            type: 'void',
            'x-component': 'Grid.Row',
            properties: {
              zue50ioabjl: {
                _isJSONSchemaObject: true,
                version: '2.0',
                type: 'void',
                'x-component': 'Grid.Col',
                properties: {
                  dv7csive187: {
                    _isJSONSchemaObject: true,
                    version: '2.0',
                    type: 'void',
                    'x-decorator': 'TableBlockProvider',
                    'x-acl-action': 'collection2:list',
                    'x-decorator-props': {
                      collection: 'collection2',
                      dataSource: 'main',
                      action: 'list',
                      params: {
                        pageSize: 20,
                      },
                      rowKey: 'id',
                      showIndex: true,
                      dragSort: false,
                      disableTemplate: false,
                    },
                    'x-toolbar': 'BlockSchemaToolbar',
                    'x-settings': 'blockSettings:table',
                    'x-component': 'CardItem',
                    'x-filter-targets': [],
                    properties: {
                      actions: {
                        _isJSONSchemaObject: true,
                        version: '2.0',
                        type: 'void',
                        'x-initializer': 'table:configureActions',
                        'x-component': 'ActionBar',
                        'x-component-props': {
                          style: {
                            marginBottom: 'var(--nb-spacing)',
                          },
                        },
                        'x-uid': 'oe1qrytmueq',
                        'x-async': false,
                        'x-index': 1,
                      },
                      gjd57a4bks3: {
                        _isJSONSchemaObject: true,
                        version: '2.0',
                        type: 'array',
                        'x-initializer': 'table:configureColumns',
                        'x-component': 'TableV2',
                        'x-component-props': {
                          rowKey: 'id',
                          rowSelection: {
                            type: 'checkbox',
                          },
                          useProps: '{{ useTableBlockProps }}',
                        },
                        properties: {
                          actions: {
                            _isJSONSchemaObject: true,
                            version: '2.0',
                            type: 'void',
                            title: '{{ t("Actions") }}',
                            'x-action-column': 'actions',
                            'x-decorator': 'TableV2.Column.ActionBar',
                            'x-component': 'TableV2.Column',
                            'x-designer': 'TableV2.ActionColumnDesigner',
                            'x-initializer': 'table:configureItemActions',
                            properties: {
                              '3ysynbg1lv6': {
                                _isJSONSchemaObject: true,
                                version: '2.0',
                                type: 'void',
                                'x-decorator': 'DndContext',
                                'x-component': 'Space',
                                'x-component-props': {
                                  split: '|',
                                },
                                'x-uid': 'aelf0u0qx6q',
                                'x-async': false,
                                'x-index': 1,
                              },
                            },
                            'x-uid': '5iadqvuebvd',
                            'x-async': false,
                            'x-index': 1,
                          },
                          '10a10qkpiz7': {
                            _isJSONSchemaObject: true,
                            version: '2.0',
                            type: 'void',
                            'x-decorator': 'TableV2.Column.Decorator',
                            'x-toolbar': 'TableColumnSchemaToolbar',
                            'x-settings': 'fieldSettings:TableColumn',
                            'x-component': 'TableV2.Column',
                            properties: {
                              singleLineText: {
                                _isJSONSchemaObject: true,
                                version: '2.0',
                                'x-collection-field': 'collection2.singleLineText',
                                'x-component': 'CollectionField',
                                'x-component-props': {
                                  ellipsis: true,
                                },
                                'x-read-pretty': true,
                                'x-decorator': null,
                                'x-decorator-props': {
                                  labelStyle: {
                                    display: 'none',
                                  },
                                },
                                'x-uid': 'fixqxflxl3p',
                                'x-async': false,
                                'x-index': 1,
                              },
                            },
                            'x-uid': '8huj8o6hk58',
                            'x-async': false,
                            'x-index': 2,
                          },
                        },
                        'x-uid': 'zyewv4tfzsm',
                        'x-async': false,
                        'x-index': 2,
                      },
                    },
                    'x-uid': 'c5o951ypirb',
                    'x-async': false,
                    'x-index': 1,
                  },
                },
                'x-uid': 'i50ffbtryxp',
                'x-async': false,
                'x-index': 1,
              },
            },
            'x-uid': 'w6dx01br9dy',
            'x-async': false,
            'x-index': 2,
          },
        },
        'x-uid': 'aro2fcypx34',
        'x-async': false,
      },
    },
    'x-uid': '8ykc66k5p12',
    'x-async': true,
  },
};
