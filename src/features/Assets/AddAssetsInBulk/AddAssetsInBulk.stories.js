import AddAssetsInBulk from "./AddAssetsInBulk";

export default {
  title: 'AddAssetsInBulk/AddAssetsInBulk',
  component: AddAssetsInBulk,
  tags: ['autodocs'],
};

const Template = (args) => <AddAssetsInBulk {...args} />;

export const AddAssetsInBulkDefault = Template.bind({});

AddAssetsInBulkDefault.args = {
  handleClose: () => {},
};
