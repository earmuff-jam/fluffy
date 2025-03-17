import AssetDetailsDrawerHeader from "./AssetDetailsDrawerHeader";

export default {
  title: 'AssetDetailsDrawer/AssetDetailsDrawerHeader',
  component: AssetDetailsDrawerHeader,
  tags: ['autodocs'],
};

const Template = (args) => <AssetDetailsDrawerHeader {...args} />;

export const AssetDetailsDrawerHeaderDefault = Template.bind({});

AssetDetailsDrawerHeaderDefault.args = {
  resetSelection: () => {},
  title: 'Asset Details Drawer Title',
};
