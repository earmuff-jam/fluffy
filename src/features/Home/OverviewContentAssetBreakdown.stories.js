import OverviewContentAssetBreakdown from "./OverviewContentAssetBreakdown";

export default {
  title: 'Home/OverviewContentAssetBreakdown',
  component: OverviewContentAssetBreakdown,
  tags: ['autodocs'],
};

const Template = (args) => <OverviewContentAssetBreakdown {...args} />;

export const OverviewContentAssetBreakdownDefault = Template.bind({});

OverviewContentAssetBreakdownDefault.args = {
  assets: [{ id: 1 }, { id: 2 }],
  categories: [{ id: 1 }],
  maintenancePlans: [],
};
