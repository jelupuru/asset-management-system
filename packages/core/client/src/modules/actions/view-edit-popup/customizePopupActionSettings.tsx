/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { useFieldSchema } from '@formily/react';
import { useSchemaToolbar } from '../../../application';
import { SchemaSettings } from '../../../application/schema-settings/SchemaSettings';
import { useCollection_deprecated } from '../../../collection-manager';
import { useCollection } from '../../../data-source';
import { ButtonEditor, RemoveButton } from '../../../schema-component/antd/action/Action.Designer';
import { SchemaSettingOpenModeSchemaItems } from '../../../schema-items';
import { SchemaSettingsLinkageRules } from '../../../schema-settings';
import { useOpenModeContext } from '../../popup/OpenModeProvider';
import { useCurrentPopupRecord } from '../../variable/variablesProvider/VariablePopupRecordProvider';

export const customizePopupActionSettings = new SchemaSettings({
  name: 'actionSettings:popup',
  items: [
    {
      name: 'editButton',
      Component: ButtonEditor,
      useComponentProps() {
        const { buttonEditorProps } = useSchemaToolbar();
        return buttonEditorProps;
      },
    },
    {
      name: 'linkageRules',
      Component: SchemaSettingsLinkageRules,
      useComponentProps() {
        const { name } = useCollection_deprecated();
        const { linkageRulesProps } = useSchemaToolbar();
        return {
          ...linkageRulesProps,
          collectionName: name,
        };
      },
      useVisible() {
        const { collection } = useCurrentPopupRecord() || {};
        const currentCollection = useCollection();
        return !collection || collection?.name === currentCollection?.name;
      },
    },
    {
      name: 'openMode',
      Component: SchemaSettingOpenModeSchemaItems,
      useComponentProps() {
        const { hideOpenMode } = useOpenModeContext();
        return {
          openMode: !hideOpenMode,
          openSize: !hideOpenMode,
        };
      },
    },
    {
      name: 'remove',
      sort: 100,
      Component: RemoveButton as any,
      useComponentProps() {
        const { removeButtonProps } = useSchemaToolbar();
        return removeButtonProps;
      },
    },
  ],
});
