/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import { css } from '@emotion/css';
import { ArrayField } from '@formily/core';
import { spliceArrayState } from '@formily/core/esm/shared/internals';
import { observer, useFieldSchema } from '@formily/react';
import { action } from '@formily/reactive';
import { each } from '@formily/shared';
import { useUpdate } from 'ahooks';
import { Button, Card, Divider, Tooltip } from 'antd';
import React, { useCallback, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { FormActiveFieldsProvider } from '../../../block-provider/hooks/useFormActiveFields';
import { useCollection } from '../../../data-source';
import {
  useCollectionRecord,
  useCollectionRecordData,
} from '../../../data-source/collection-record/CollectionRecordProvider';
import { isNewRecord, markRecordAsNew } from '../../../data-source/collection-record/isNewRecord';
import { FlagProvider } from '../../../flag-provider';
import {
  NocoBaseRecursionField,
  RefreshComponentProvider,
  useRefreshComponent,
} from '../../../formily/NocoBaseRecursionField';
import { RecordIndexProvider, RecordProvider } from '../../../record-provider';
import { isPatternDisabled, isSystemField } from '../../../schema-settings';
import {
  DefaultValueProvider,
  IsAllowToSetDefaultValueParams,
  interfacesOfUnsupportedDefaultValue,
} from '../../../schema-settings/hooks/useIsAllowToSetDefaultValue';
import { AssociationFieldContext } from './context';
import { SubFormProvider, useAssociationFieldContext } from './hooks';

export const Nester = (props) => {
  const { options } = useContext(AssociationFieldContext);
  if (['hasOne', 'belongsTo'].includes(options.type)) {
    return (
      <FlagProvider isInSubForm>
        <ToOneNester {...props} />
      </FlagProvider>
    );
  }
  if (['hasMany', 'belongsToMany', 'belongsToArray'].includes(options.type)) {
    return (
      <FlagProvider isInSubForm>
        <ToManyNester {...props} />
      </FlagProvider>
    );
  }
  return null;
};

const ToOneNester = (props) => {
  const { field } = useAssociationFieldContext<ArrayField>();
  const recordV2 = useCollectionRecord();
  const collection = useCollection();
  const fieldSchema = useFieldSchema();

  const isAllowToSetDefaultValue = useCallback(
    ({ form, fieldSchema, collectionField, getInterface, formBlockType }: IsAllowToSetDefaultValueParams) => {
      if (!collectionField) {
        if (process.env.NODE_ENV !== 'production') {
          console.error(`collectionField should not be ${collectionField}`);
        }
        return false;
      }

      // 当 Field component 不是下列组件时，不允许设置默认值
      if (
        collectionField.target &&
        fieldSchema['x-component-props']?.mode &&
        !['Picker', 'Select'].includes(fieldSchema['x-component-props'].mode)
      ) {
        return false;
      }

      // hasOne 和 belongsTo 类型的字段只能有一个值，不会新增值，所以在编辑状态下不允许设置默认值
      if (formBlockType === 'update') {
        return false;
      }

      return (
        !form?.readPretty &&
        !isPatternDisabled(fieldSchema) &&
        !interfacesOfUnsupportedDefaultValue.includes(collectionField?.interface) &&
        !isSystemField(collectionField, getInterface)
      );
    },
    [],
  );

  return (
    <FormActiveFieldsProvider name="nester">
      <SubFormProvider value={{ value: field.value, collection, fieldSchema: fieldSchema.parent }}>
        <RecordProvider isNew={recordV2?.isNew} record={field.value} parent={recordV2?.data}>
          <DefaultValueProvider isAllowToSetDefaultValue={isAllowToSetDefaultValue}>
            <Card bordered={true}>{props.children}</Card>
          </DefaultValueProvider>
        </RecordProvider>
      </SubFormProvider>
    </FormActiveFieldsProvider>
  );
};

const ToManyNester = observer(
  (props) => {
    const fieldSchema = useFieldSchema();
    const { options, field, allowMultiple, allowDissociate } = useAssociationFieldContext<ArrayField>();
    const { t } = useTranslation();
    const recordData = useCollectionRecordData();
    const collection = useCollection();
    const update = useUpdate();
    const refreshComponent = useRefreshComponent();

    const refresh = useCallback(() => {
      update();
      refreshComponent?.();
    }, [update, refreshComponent]);

    if (!Array.isArray(field.value)) {
      field.value = [];
    }

    const isAllowToSetDefaultValue = useCallback(({ form, fieldSchema, collectionField, getInterface }) => {
      if (!collectionField) {
        if (process.env.NODE_ENV !== 'production') {
          console.error(`collectionField should not be ${collectionField}`);
        }
        return false;
      }

      // 当 Field component 不是下列组件时，不允许设置默认值
      if (
        collectionField.target &&
        fieldSchema['x-component-props']?.mode &&
        !['Picker', 'Select'].includes(fieldSchema['x-component-props'].mode)
      ) {
        return false;
      }

      return (
        !form?.readPretty &&
        !isPatternDisabled(fieldSchema) &&
        !interfacesOfUnsupportedDefaultValue.includes(collectionField?.interface) &&
        !isSystemField(collectionField, getInterface)
      );
    }, []);

    return field.value.length > 0 ? (
      <Card
        bordered={true}
        style={{ position: 'relative' }}
        className={css`
          > .ant-card-body > .ant-divider:last-child {
            display: none;
          }
        `}
      >
        <RefreshComponentProvider refresh={refresh}>
          {field.value.map((value, index) => {
            let allowed = allowDissociate;
            if (!allowDissociate) {
              allowed = !value?.[options.targetKey];
            }
            return (
              <React.Fragment key={index}>
                <div style={{ textAlign: 'right' }}>
                  {field.editable && allowMultiple && (
                    <Tooltip key={'add'} title={t('Add new')}>
                      <PlusOutlined
                        style={{ zIndex: 1000, marginRight: '10px', color: '#a8a3a3' }}
                        onClick={() => {
                          action(() => {
                            if (!Array.isArray(field.value)) {
                              field.value = [];
                            }
                            field.value.splice(index + 1, 0, markRecordAsNew({}));
                            each(field.form.fields, (targetField, key) => {
                              if (!targetField) {
                                delete field.form.fields[key];
                              }
                            });
                            return field.onInput(field.value);
                          });
                        }}
                      />
                    </Tooltip>
                  )}
                  {!field.readPretty && allowed && (
                    <Tooltip key={'remove'} title={t('Remove')}>
                      <CloseOutlined
                        style={{ zIndex: 1000, color: '#a8a3a3' }}
                        onClick={() => {
                          action(() => {
                            spliceArrayState(field as any, {
                              startIndex: index,
                              deleteCount: 1,
                            });
                            field.value.splice(index, 1);
                            return field.onInput(field.value);
                          });
                        }}
                      />
                    </Tooltip>
                  )}
                </div>
                <FormActiveFieldsProvider name="nester">
                  <SubFormProvider value={{ value, collection, fieldSchema: fieldSchema.parent }}>
                    <RecordProvider isNew={isNewRecord(value)} record={value} parent={recordData}>
                      <RecordIndexProvider index={index}>
                        <DefaultValueProvider isAllowToSetDefaultValue={isAllowToSetDefaultValue}>
                          <NocoBaseRecursionField
                            onlyRenderProperties
                            basePath={field.address.concat(index)}
                            schema={fieldSchema}
                          />
                        </DefaultValueProvider>
                      </RecordIndexProvider>
                    </RecordProvider>
                  </SubFormProvider>
                </FormActiveFieldsProvider>
                <Divider />
              </React.Fragment>
            );
          })}
        </RefreshComponentProvider>
      </Card>
    ) : (
      <>
        {field.editable && allowMultiple && (
          <Tooltip key={'add'} title={t('Add new')}>
            <Button
              type={'default'}
              className={css`
                border: 1px solid #f0f0f0 !important;
                box-shadow: none;
              `}
              block
              icon={<PlusOutlined />}
              onClick={() => {
                const result = field.value;
                result.push({});
                field.value = result;
              }}
            ></Button>
          </Tooltip>
        )}
      </>
    );
  },
  { displayName: 'ToManyNester' },
);
