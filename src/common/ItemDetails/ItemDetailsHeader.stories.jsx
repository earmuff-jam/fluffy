import ItemDetailsHeader from './ItemDetailsHeader';

export default {
  title: 'Common/ItemCard/ItemDetailsHeader',
  component: ItemDetailsHeader,
  tags: ['autodocs'],
};

const Template = (args) => <ItemDetailsHeader {...args} />;

export const ItemDetailsHeaderDefault = Template.bind({});
export const ItemDetailsHeaderCategoryHeader = Template.bind({});

ItemDetailsHeaderDefault.args = {
  label: 'Daily maintenance plan Overview',
  caption: 'View details of selected maintenance plan',
  item: {
    id: 'd4d6ce04-1eb1-42fc-89ae-26abb6ac0c2b',
    name: 'Daily maintenance plan',
    description: 'A maintenance plan built for assets that require daily management.',
    color: '#d20a0a',
    status: 'draft',
    planType: 'annual',
    planDue: '0001-01-01T00:00:00Z',
    location: {
      lat: 0,
      lon: 0,
    },
    createdBy: { id: 'fa956520-fc6c-4783-acc6-4ba743fae9dc', emailAddress: 'john_doe47@gmail.com' },
    createdAt: '2024-11-29T13:19:16.754332Z',
    updatedBy: { id: 'fa956520-fc6c-4783-acc6-4ba743fae9dc', emailAddress: 'john_doe47@gmail.com' },
    updatedAt: '2024-11-29T13:19:16.754332Z',
    collaborators: ['fa956520-fc6c-4783-acc6-4ba743fae9dc'],
  },
  image: 'blob:http://localhost:random_ip_address/random_uuid_here',
};

ItemDetailsHeaderCategoryHeader.args = {
  label: 'Groceries',
  caption: 'View details of selected category details.',
  item: {
    id: 'd4d6ce04-1eb1-42fc-89ae-26abb6ac0c2b',
    name: 'Dog stuff',
    description: 'Store all dog related items here',
    color: '#d20a0a',
    status: 'draft',
    location: {
      lat: 0,
      lon: 0,
    },
    createdBy: { id: 'fa956520-fc6c-4783-acc6-4ba743fae9dc', emailAddress: 'john_doe47@gmail.com' },
    createdAt: '2024-11-29T13:19:16.754332Z',
    updatedBy: { id: 'fa956520-fc6c-4783-acc6-4ba743fae9dc', emailAddress: 'john_doe47@gmail.com' },
    updatedAt: '2024-11-29T13:19:16.754332Z',
    collaborators: ['fa956520-fc6c-4783-acc6-4ba743fae9dc'],
  },
  image: 'blob:http://localhost:random_ip_address/random_uuid_here',
};
