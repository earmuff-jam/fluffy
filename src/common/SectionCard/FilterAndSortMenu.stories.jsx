import FilterAndSortMenu from './FilterAndSortMenu';

export default {
  title: 'Common/SectionCard/FilterAndSortMenu',
  component: FilterAndSortMenu,
  tags: ['autodocs'],
};

const Template = (args) => <FilterAndSortMenu {...args} />;

export const FilterAndSortMenuDefault = Template.bind({});

FilterAndSortMenuDefault.args = {
  sortingOrder: '',
  setSortingOrder: () => {},
  selectedFilter: '',
  setSelectedFilter: () => {},
};
