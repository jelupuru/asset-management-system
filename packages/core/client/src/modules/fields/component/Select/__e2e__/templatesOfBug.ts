/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

export const T3867 = {
  pageSchema: {
    _isJSONSchemaObject: true,
    version: '2.0',
    type: 'void',
    'x-component': 'Page',
    properties: {
      s5cjt8zbavu: {
        _isJSONSchemaObject: true,
        version: '2.0',
        type: 'void',
        'x-component': 'Grid',
        'x-initializer': 'page:addBlock',
        properties: {
          d1n1knkhn2j: {
            _isJSONSchemaObject: true,
            version: '2.0',
            type: 'void',
            'x-component': 'Grid.Row',
            properties: {
              kf89qhko8o4: {
                _isJSONSchemaObject: true,
                version: '2.0',
                type: 'void',
                'x-component': 'Grid.Col',
                properties: {
                  exiwrzejk22: {
                    _isJSONSchemaObject: true,
                    version: '2.0',
                    type: 'void',
                    'x-acl-action-props': {
                      skipScopeCheck: true,
                    },
                    'x-acl-action': 'users:create',
                    'x-decorator': 'FormBlockProvider',
                    'x-use-decorator-props': 'useCreateFormBlockDecoratorProps',
                    'x-decorator-props': {
                      dataSource: 'main',
                      collection: 'users',
                    },
                    'x-toolbar': 'BlockSchemaToolbar',
                    'x-settings': 'blockSettings:createForm',
                    'x-component': 'CardItem',
                    properties: {
                      fbmn67be1zi: {
                        _isJSONSchemaObject: true,
                        version: '2.0',
                        type: 'void',
                        'x-component': 'FormV2',
                        'x-use-component-props': 'useCreateFormBlockProps',
                        properties: {
                          grid: {
                            _isJSONSchemaObject: true,
                            version: '2.0',
                            type: 'void',
                            'x-component': 'Grid',
                            'x-initializer': 'form:configureFields',
                            properties: {
                              jff7vsu8j5s: {
                                _isJSONSchemaObject: true,
                                version: '2.0',
                                type: 'void',
                                'x-component': 'Grid.Row',
                                properties: {
                                  qhpd737ckz3: {
                                    _isJSONSchemaObject: true,
                                    version: '2.0',
                                    type: 'void',
                                    'x-component': 'Grid.Col',
                                    properties: {
                                      roles: {
                                        'x-uid': 'hkrim8fsg6l',
                                        _isJSONSchemaObject: true,
                                        version: '2.0',
                                        type: 'string',
                                        'x-toolbar': 'FormItemSchemaToolbar',
                                        'x-settings': 'fieldSettings:FormItem',
                                        'x-component': 'CollectionField',
                                        'x-decorator': 'FormItem',
                                        'x-collection-field': 'users.roles',
                                        'x-component-props': {
                                          fieldNames: {
                                            label: 'name',
                                            value: 'name',
                                          },
                                          service: {
                                            params: {
                                              filter: {},
                                            },
                                          },
                                        },
                                        'x-async': false,
                                        'x-index': 1,
                                      },
                                    },
                                    'x-uid': 'tb9lf9yyhy9',
                                    'x-async': false,
                                    'x-index': 1,
                                  },
                                },
                                'x-uid': 'ar7k608qmd2',
                                'x-async': false,
                                'x-index': 1,
                              },
                            },
                            'x-uid': 's4bqgcb1lcw',
                            'x-async': false,
                            'x-index': 1,
                          },
                          kq8qslxsw0g: {
                            _isJSONSchemaObject: true,
                            version: '2.0',
                            type: 'void',
                            'x-initializer': 'createForm:configureActions',
                            'x-component': 'ActionBar',
                            'x-component-props': {
                              layout: 'one-column',
                              style: {
                                marginTop: 24,
                              },
                            },
                            'x-uid': 'psxtkltcrnx',
                            'x-async': false,
                            'x-index': 2,
                          },
                        },
                        'x-uid': 'dkha40ualdp',
                        'x-async': false,
                        'x-index': 1,
                      },
                    },
                    'x-uid': 'vq2tiw2skt0',
                    'x-async': false,
                    'x-index': 1,
                  },
                },
                'x-uid': '12yzm4085xn',
                'x-async': false,
                'x-index': 1,
              },
            },
            'x-uid': 'ovmsg9hd18d',
            'x-async': false,
            'x-index': 1,
          },
        },
        'x-uid': '7ekmknvq2v6',
        'x-async': false,
        'x-index': 1,
      },
    },
    'x-uid': 'h9hdcz34nux',
    'x-async': true,
    'x-index': 1,
  },
};

export const oneFormWithSubTableSelectField = {
  pageSchema: {
    _isJSONSchemaObject: true,
    version: '2.0',
    type: 'void',
    'x-component': 'Page',
    'x-app-version': '1.2.7-alpha',
    properties: {
      iza2br2wzq4: {
        _isJSONSchemaObject: true,
        version: '2.0',
        type: 'void',
        'x-component': 'Grid',
        'x-initializer': 'page:addBlock',
        'x-app-version': '1.2.7-alpha',
        properties: {
          hq9u92krwno: {
            _isJSONSchemaObject: true,
            version: '2.0',
            type: 'void',
            'x-component': 'Grid.Row',
            'x-app-version': '1.2.7-alpha',
            properties: {
              '0xl94yvrqjq': {
                _isJSONSchemaObject: true,
                version: '2.0',
                type: 'void',
                'x-component': 'Grid.Col',
                'x-app-version': '1.2.7-alpha',
                properties: {
                  h8cs7cjc0y5: {
                    _isJSONSchemaObject: true,
                    version: '2.0',
                    type: 'void',
                    'x-acl-action-props': {
                      skipScopeCheck: true,
                    },
                    'x-acl-action': 'test1:create',
                    'x-decorator': 'FormBlockProvider',
                    'x-use-decorator-props': 'useCreateFormBlockDecoratorProps',
                    'x-decorator-props': {
                      dataSource: 'main',
                      collection: 'test1',
                    },
                    'x-toolbar': 'BlockSchemaToolbar',
                    'x-settings': 'blockSettings:createForm',
                    'x-component': 'CardItem',
                    'x-app-version': '1.2.7-alpha',
                    properties: {
                      '6acyz9zsvf9': {
                        _isJSONSchemaObject: true,
                        version: '2.0',
                        type: 'void',
                        'x-component': 'FormV2',
                        'x-use-component-props': 'useCreateFormBlockProps',
                        'x-app-version': '1.2.7-alpha',
                        properties: {
                          grid: {
                            _isJSONSchemaObject: true,
                            version: '2.0',
                            type: 'void',
                            'x-component': 'Grid',
                            'x-initializer': 'form:configureFields',
                            'x-app-version': '1.2.7-alpha',
                            properties: {
                              uc6hcqm7i1p: {
                                _isJSONSchemaObject: true,
                                version: '2.0',
                                type: 'void',
                                'x-component': 'Grid.Row',
                                'x-app-version': '1.2.7-alpha',
                                properties: {
                                  ay7buet4shb: {
                                    _isJSONSchemaObject: true,
                                    version: '2.0',
                                    type: 'void',
                                    'x-component': 'Grid.Col',
                                    'x-app-version': '1.2.7-alpha',
                                    properties: {
                                      o2m: {
                                        'x-uid': 'fuq57lhf9sw',
                                        _isJSONSchemaObject: true,
                                        version: '2.0',
                                        type: 'string',
                                        'x-toolbar': 'FormItemSchemaToolbar',
                                        'x-settings': 'fieldSettings:FormItem',
                                        'x-component': 'CollectionField',
                                        'x-decorator': 'FormItem',
                                        'x-collection-field': 'test1.o2m',
                                        'x-component-props': {
                                          fieldNames: {
                                            value: 'id',
                                            label: 'id',
                                          },
                                          mode: 'SubTable',
                                        },
                                        'x-app-version': '1.2.7-alpha',
                                        default: null,
                                        properties: {
                                          lp61waqr2kn: {
                                            _isJSONSchemaObject: true,
                                            version: '2.0',
                                            type: 'void',
                                            'x-component': 'AssociationField.SubTable',
                                            'x-initializer': 'table:configureColumns',
                                            'x-initializer-props': {
                                              action: false,
                                            },
                                            'x-index': 1,
                                            'x-app-version': '1.2.7-alpha',
                                            properties: {
                                              d0eyyy1lzkr: {
                                                _isJSONSchemaObject: true,
                                                version: '2.0',
                                                type: 'void',
                                                'x-decorator': 'TableV2.Column.Decorator',
                                                'x-toolbar': 'TableColumnSchemaToolbar',
                                                'x-settings': 'fieldSettings:TableColumn',
                                                'x-component': 'TableV2.Column',
                                                'x-app-version': '1.2.7-alpha',
                                                properties: {
                                                  o2m: {
                                                    _isJSONSchemaObject: true,
                                                    version: '2.0',
                                                    'x-collection-field': 'test2.o2m',
                                                    'x-component': 'CollectionField',
                                                    'x-component-props': {
                                                      fieldNames: {
                                                        value: 'id',
                                                        label: 'id',
                                                      },
                                                      ellipsis: true,
                                                      size: 'small',
                                                    },
                                                    'x-decorator': 'FormItem',
                                                    'x-decorator-props': {
                                                      labelStyle: {
                                                        display: 'none',
                                                      },
                                                    },
                                                    'x-app-version': '1.2.7-alpha',
                                                    'x-uid': '101fr7c218n',
                                                    'x-async': false,
                                                    'x-index': 1,
                                                  },
                                                },
                                                'x-uid': 'enhm21ca4bc',
                                                'x-async': false,
                                                'x-index': 1,
                                              },
                                            },
                                            'x-uid': 'li6u5na3ath',
                                            'x-async': false,
                                          },
                                        },
                                        'x-async': false,
                                        'x-index': 1,
                                      },
                                    },
                                    'x-uid': 'w5wa4lqrxnh',
                                    'x-async': false,
                                    'x-index': 1,
                                  },
                                },
                                'x-uid': 'fcan7iyk7y4',
                                'x-async': false,
                                'x-index': 1,
                              },
                            },
                            'x-uid': 'ragpzxlvl3l',
                            'x-async': false,
                            'x-index': 1,
                          },
                          becbhdzvfd4: {
                            _isJSONSchemaObject: true,
                            version: '2.0',
                            type: 'void',
                            'x-initializer': 'createForm:configureActions',
                            'x-component': 'ActionBar',
                            'x-component-props': {
                              layout: 'one-column',
                              style: {
                                marginTop: 'var(--nb-spacing)',
                              },
                            },
                            'x-app-version': '1.2.7-alpha',
                            'x-uid': 'kgrvq35c5v1',
                            'x-async': false,
                            'x-index': 2,
                          },
                        },
                        'x-uid': 'mr5v4ycueol',
                        'x-async': false,
                        'x-index': 1,
                      },
                    },
                    'x-uid': 'gwsv7nvdiam',
                    'x-async': false,
                    'x-index': 1,
                  },
                },
                'x-uid': 'n71wq1k8491',
                'x-async': false,
                'x-index': 1,
              },
            },
            'x-uid': 'ymnl0yjrviv',
            'x-async': false,
            'x-index': 1,
          },
        },
        'x-uid': 'usfanrw7m95',
        'x-async': false,
        'x-index': 1,
      },
    },
    'x-uid': 'hizrr7jzogr',
    'x-async': true,
    'x-index': 1,
  },
  collections: [
    {
      name: 'test1',
      title: 'test1',
      inherit: false,
      hidden: false,
      description: null,
      fields: [
        {
          name: 'id',
          type: 'bigInt',
          interface: 'integer',
          description: null,
          collectionName: 'test1',
          parentKey: null,
          reverseKey: null,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
          uiSchema: {
            type: 'number',
            title: '{{t("ID")}}',
            'x-component': 'InputNumber',
            'x-read-pretty': true,
          },
        },
        {
          key: '6vyl22ibdj1',
          name: 'o2m',
          type: 'hasMany',
          interface: 'o2m',
          description: null,
          collectionName: 'test1',
          parentKey: null,
          reverseKey: null,
          sourceKey: 'id',
          foreignKey: 'f_ul4q5koxzgd',
          onDelete: 'SET NULL',
          uiSchema: {
            'x-component': 'AssociationField',
            'x-component-props': {
              multiple: true,
            },
            title: 'o2m(test2)',
          },
          target: 'test2',
          targetKey: 'id',
        },
      ],
      category: [],
      logging: true,
      autoGenId: true,
      createdAt: false,
      createdBy: false,
      updatedAt: false,
      updatedBy: false,
      template: 'general',
      view: false,
      schema: 'public',
      filterTargetKey: 'id',
    },
    {
      name: 'test2',
      title: 'test2',
      inherit: false,
      hidden: false,
      description: null,
      fields: [
        {
          name: 'id',
          type: 'bigInt',
          interface: 'integer',
          description: null,
          collectionName: 'test2',
          parentKey: null,
          reverseKey: null,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
          uiSchema: {
            type: 'number',
            title: '{{t("ID")}}',
            'x-component': 'InputNumber',
            'x-read-pretty': true,
          },
        },
        {
          key: 'kawadu893z7',
          name: 'f_ul4q5koxzgd',
          type: 'bigInt',
          interface: 'integer',
          description: null,
          collectionName: 'test2',
          parentKey: null,
          reverseKey: null,
          isForeignKey: true,
          uiSchema: {
            type: 'number',
            title: 'f_ul4q5koxzgd',
            'x-component': 'InputNumber',
            'x-read-pretty': true,
          },
        },
        {
          key: '68i40oyixck',
          name: 'o2m',
          type: 'hasMany',
          interface: 'o2m',
          description: null,
          collectionName: 'test2',
          parentKey: null,
          reverseKey: null,
          sourceKey: 'id',
          foreignKey: 'f_pbe3bj214df',
          onDelete: 'SET NULL',
          uiSchema: {
            'x-component': 'AssociationField',
            'x-component-props': {
              multiple: true,
            },
            title: 'o2m(test3)',
          },
          target: 'test3',
          targetKey: 'id',
        },
      ],
      category: [],
      logging: true,
      autoGenId: true,
      createdAt: false,
      createdBy: false,
      updatedAt: false,
      updatedBy: false,
      template: 'general',
      view: false,
      schema: 'public',
      filterTargetKey: 'id',
    },
    {
      key: 'o0nnfuhi5ur',
      name: 'test3',
      title: 'test3',
      inherit: false,
      hidden: false,
      description: null,
      fields: [
        {
          key: 'q75s3xv1jf2',
          name: 'id',
          type: 'bigInt',
          interface: 'integer',
          description: null,
          collectionName: 'test3',
          parentKey: null,
          reverseKey: null,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
          uiSchema: {
            type: 'number',
            title: '{{t("ID")}}',
            'x-component': 'InputNumber',
            'x-read-pretty': true,
          },
        },
        {
          key: 'ggm4fgwukh1',
          name: 'f_pbe3bj214df',
          type: 'bigInt',
          interface: 'integer',
          description: null,
          collectionName: 'test3',
          parentKey: null,
          reverseKey: null,
          isForeignKey: true,
          uiSchema: {
            type: 'number',
            title: 'f_pbe3bj214df',
            'x-component': 'InputNumber',
            'x-read-pretty': true,
          },
        },
      ],
      category: [],
      logging: true,
      autoGenId: true,
      createdAt: false,
      createdBy: false,
      updatedAt: false,
      updatedBy: false,
      template: 'general',
      view: false,
      schema: 'public',
      filterTargetKey: 'id',
    },
  ],
};
