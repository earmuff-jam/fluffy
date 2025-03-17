import SectionCardHeader from './SectionCardHeader';

export default {
  title: 'Common/SectionCard/SectionCardHeader',
  component: SectionCardHeader,
  tags: ['autodocs'],
};

const Template = (args) => <SectionCardHeader {...args} />;

export const SectionCardHeaderCategoryDefault = Template.bind({});
export const SectionCardHeaderCategoryDraftStatus = Template.bind({});
export const SectionCardHeaderCategoryASCSortingOrder = Template.bind({});

export const SectionCardHeaderMaintenancePlanDefault = Template.bind({});
export const SectionCardHeaderMaintenancePlanDraftStatus = Template.bind({});
export const SectionCardHeaderMaintenancePlanASCSortingOrder = Template.bind({});

SectionCardHeaderMaintenancePlanDefault.args = {
  title: 'Weekly maintenance plan',
  caption: 'Weekly maintenance plan items',
  toggleModal: () => {},
  selectedFilter: null,
  setSelectedFilter: () => {},
  sortingOrder: true,
  setSortingOrder: () => {},
  primaryBtnTitle: 'Add Plan',
};

SectionCardHeaderMaintenancePlanDraftStatus.args = {
  title: 'Weekly maintenance plan',
  caption: 'Weekly maintenance plan items',
  toggleModal: () => {},
  selectedFilter: 'draft',
  setSelectedFilter: () => {},
  sortingOrder: true,
  setSortingOrder: () => {},
  primaryBtnTitle: 'Add Plan',
};

SectionCardHeaderMaintenancePlanASCSortingOrder.args = {
  title: 'Weekly maintenance plan',
  caption: 'Weekly maintenance plan items',
  toggleModal: () => {},
  selectedFilter: null,
  setSelectedFilter: () => {},
  sortingOrder: false,
  setSortingOrder: () => {},
  primaryBtnTitle: 'Add Plan',
};

SectionCardHeaderCategoryDefault.args = {
  title: 'Dog items',
  caption: 'Stuff related to pup items',
  toggleModal: () => {},
  selectedFilter: null,
  setSelectedFilter: () => {},
  sortingOrder: true,
  setSortingOrder: () => {},
  primaryBtnTitle: 'Add Category',
};

SectionCardHeaderCategoryDraftStatus.args = {
  title: 'Dog items',
  caption: 'Stuff related to pup items',
  toggleModal: () => {},
  selectedFilter: 'draft',
  setSelectedFilter: () => {},
  sortingOrder: true,
  setSortingOrder: () => {},
  primaryBtnTitle: 'Add Category',
};

SectionCardHeaderCategoryASCSortingOrder.args = {
  title: 'Dog items',
  caption: 'Stuff related to pup items',
  toggleModal: () => {},
  selectedFilter: null,
  setSelectedFilter: () => {},
  sortingOrder: false,
  setSortingOrder: () => {},
  primaryBtnTitle: 'Add Category',
};
