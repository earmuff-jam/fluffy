import AddItem from './AddItem';

export default {
  title: 'Common/ItemCard/AddItem',
  component: AddItem,
  tags: ['autodocs'],
};

const Template = (args) => <AddItem {...args} />;

export const AddItemDefault = Template.bind({});

AddItemDefault.args = {
  selectedIDList: [],
  setSelectedIDList: () => {},
  itemsInMaintenancePlan: [],
};
