import { CollectionFieldInterface } from '../../data-source/collection-field-interface/CollectionFieldInterface';
import { dateTimeProps, defaultProps, operators } from './properties';

export class UnixTimestampFieldInterface extends CollectionFieldInterface {
  name = 'unixTimestamp';
  type = 'object';
  group = 'datetime';
  order = 1;
  title = '{{t("UnixTimestamp")}}';
  sortable = true;
  default = {
    type: 'bigInt',
    uiSchema: {
      type: 'number',
      'x-component': 'UnixTimestamp',
      'x-component-props': {
        stringMode: true,
        step: '1',
      },
    },
  };
  availableTypes = ['integet', 'bigInt'];
  hasDefaultValue = true;
  properties = {
    ...defaultProps,
    'uiSchema.x-component-props.accuracy': {
      type: 'boolean',
      title: '{{t("Accuracy")}}',
      'x-hidden': true,
      'x-component': 'Radio.Group',
      'x-decorator': 'FormItem',
      default: 'millisecond',
      enum: [
        { value: 'millisecond', label: '{{t("Millisecond")}}' },
        { value: 'second', label: '{{t("Second")}}' },
      ],
    },
  };
  filterable = {
    operators: operators.number,
  };
  titleUsable = true;
}
