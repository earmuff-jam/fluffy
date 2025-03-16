import { ITEM_TYPE_MAPPER } from '@features/MaintenancePlan/constants';
import AddTypeOptions from './AddTypeOptions';

export default {
  title: 'FormComponents/AddTypeOptions',
  component: AddTypeOptions,
  tags: ['autodocs'],
};

const Template = (args) => <AddTypeOptions {...args} />;

export const AddTypeOptionsDefault = Template.bind({});

AddTypeOptionsDefault.args = {
  value: ITEM_TYPE_MAPPER.daily.value,
  handleChange: () => {},
};
