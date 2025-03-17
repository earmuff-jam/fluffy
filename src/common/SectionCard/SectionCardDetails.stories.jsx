import SectionCardDetails from './SectionCardDetails';

export default {
  title: 'Common/SectionCard/SectionCardDetails',
  component: SectionCardDetails,
  tags: ['autodocs'],
};

const Template = (args) => <SectionCardDetails {...args} />;

export const SectionCardDetailsDefault = Template.bind({});
export const SectionCardDetailsCategory = Template.bind({});

SectionCardDetailsDefault.args = {
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
    createdBy: { id: 'fa956520-fc6c-4783-acc6-4ba743fae9dc', emailAddress: 'john_doe45@gmail.com' },
    createdAt: '2024-11-29T13:19:16.754332Z',
    updatedBy: { id: 'fa956520-fc6c-4783-acc6-4ba743fae9dc', emailAddress: 'john_doe45@gmail.com' },
    updatedAt: '2024-11-29T13:19:16.754332Z',
    collaborators: ['fa956520-fc6c-4783-acc6-4ba743fae9dc'],
  },
  index: 1,
  handleEdit: () => {},
  handleDelete: () => {},
  prefixURI: 'category',
};

SectionCardDetailsCategory.args = {
  item: {
    id: 'd4d6ce04-1eb1-42fc-89ae-26abb6ac0c2b',
    name: 'Dog stuffs',
    description: 'Store all dog related items here',
    color: '#d20a0a',
    status: 'draft',
    location: {
      lat: 0,
      lon: 0,
    },
    createdBy: { id: 'fa956520-fc6c-4783-acc6-4ba743fae9dc', emailAddress: 'john_doe45@gmail.com' },
    createdAt: '2024-11-29T13:19:16.754332Z',
    updatedBy: { id: 'fa956520-fc6c-4783-acc6-4ba743fae9dc', emailAddress: 'john_doe45@gmail.com' },
    updatedAt: '2024-11-29T13:19:16.754332Z',
    collaborators: ['fa956520-fc6c-4783-acc6-4ba743fae9dc'],
  },
  index: 1,
  handleEdit: () => {},
  handleDelete: () => {},
  prefixURI: 'category',
};
