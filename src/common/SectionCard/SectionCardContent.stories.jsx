import SectionCardContent from './SectionCardContent';

export default {
  title: 'Common/SectionCard/SectionCardContent',
  component: SectionCardContent,
  tags: ['autodocs'],
};

const Template = (args) => <SectionCardContent {...args} />;

export const SectionCardContentCategoryDefault = Template.bind({});
export const SectionCardContentCategoryLoading = Template.bind({});
export const SectionCardContentCategoryEmptyDetails = Template.bind({});
export const SectionCardContentCategoryModalSelection = Template.bind({});

export const SectionCardContentPlanDefault = Template.bind({});
export const SectionCardContentPlanLoading = Template.bind({});
export const SectionCardContentPlanEmptyDetails = Template.bind({});
export const SectionCardContentPlanModalSelection = Template.bind({});

SectionCardContentPlanDefault.args = {
  content: [
    {
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
  ],
  loading: false,
  displayModal: false,
  prefixURI: 'plan',
  setDisplayModal: () => {},
  setSelectedID: () => {},
  removeItem: () => {},
};

SectionCardContentPlanLoading.args = {
  content: [],
  loading: true,
  displayModal: false,
  setDisplayModal: () => {},
  setSelectedID: () => {},
  removeItem: () => {},
  prefixURI: 'plan',
};

SectionCardContentPlanEmptyDetails.args = {
  content: [],
  loading: false,
  displayModal: false,
  setDisplayModal: () => {},
  setSelectedID: () => {},
  removeItem: () => {},
  prefixURI: 'plan',
};

SectionCardContentPlanModalSelection.args = {
  content: [
    {
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
  ],
  loading: false,
  displayModal: true,
  setDisplayModal: () => {},
  setSelectedID: () => {},
  removeItem: () => {},
  prefixURI: 'plan',
};

SectionCardContentCategoryDefault.args = {
  content: [
    {
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
  ],
  loading: false,
  displayModal: false,
  setDisplayModal: () => {},
  setSelectedID: () => {},
  removeItem: () => {},
  prefixURI: 'category',
};

SectionCardContentCategoryLoading.args = {
  content: [],
  loading: true,
  displayModal: false,
  setDisplayModal: () => {},
  setSelectedID: () => {},
  removeItem: () => {},
  prefixURI: 'category',
};

SectionCardContentCategoryEmptyDetails.args = {
  content: [],
  loading: false,
  displayModal: false,
  setDisplayModal: () => {},
  setSelectedID: () => {},
  removeItem: () => {},
  prefixURI: 'category',
};

SectionCardContentCategoryModalSelection.args = {
  content: [
    {
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
  ],
  loading: false,
  displayModal: true,
  setDisplayModal: () => {},
  setSelectedID: () => {},
  removeItem: () => {},
  prefixURI: 'category',
};
