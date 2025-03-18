import AssociateItem from './AssociateItem';

export default {
  title: 'Common/ItemCard/AssociateItem',
  component: AssociateItem,
  tags: ['autodocs'],
};

const Template = (args) => <AssociateItem {...args} />;

export const AssociateItemDefault = Template.bind({});

AssociateItemDefault.args = {
  itemTitle: 'Test item title',
  addItems: () => {},
  associatedItems: [],
};
