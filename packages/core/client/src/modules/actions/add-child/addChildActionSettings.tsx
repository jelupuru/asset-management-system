/**
 * This file is part of the AMS-GHMC (R) project.
 * Copyright (c) 2020-2024 AMS-GHMC Co., Ltd.
 * Authors: AMS-GHMC Team.
 *
 * This project is dual-licensed under AGPL-3.0 and AMS-GHMC Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { useMemo } from 'react';
import { useSchemaToolbar } from '../../../application';
import { SchemaSettings } from '../../../application/schema-settings/SchemaSettings';
import { useCollection_deprecated, useCollectionManager_deprecated } from '../../../collection-manager';
import { ButtonEditor } from '../../../schema-component/antd/action/Action.Designer';
import { SchemaSettingOpenModeSchemaItems } from '../../../schema-items';
import { SchemaSettingsEnableChildCollections, SchemaSettingsLinkageRules } from '../../../schema-settings';
import { useOpenModeContext } from '../../popup/OpenModeProvider';

export const addChildActionSettings = new SchemaSettings({
  name: 'actionSettings:addChild',
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
      name: 'enableChildCollections',
      Component: SchemaSettingsEnableChildCollections,
      useVisible() {
        const { name } = useCollection_deprecated();
        const { getChildrenCollections } = useCollectionManager_deprecated();
        const isChildCollectionAction = useMemo(
          () => getChildrenCollections(name).length > 0,
          [getChildrenCollections, name],
        );
        return isChildCollectionAction;
      },
      useComponentProps() {
        const { name } = useCollection_deprecated();
        return {
          collectionName: name,
        };
      },
    },
    {
      name: 'delete',
      type: 'remove',
    },
  ],
});
