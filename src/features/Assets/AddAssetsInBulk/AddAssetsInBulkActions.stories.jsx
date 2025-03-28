import dayjs from "dayjs";
import AddAssetsInBulkActions from "./AddAssetsInBulkActions";

export default {
  title: 'AddAssetsInBulk/AddAssetsInBulkActions',
  component: AddAssetsInBulkActions,
  tags: ['autodocs'],
};

const Template = (args) => <AddAssetsInBulkActions {...args} />;

export const AddAssetsInBulkActionsDefault = Template.bind({});

AddAssetsInBulkActionsDefault.args = {
  handleFileChange: () => {},
  fileDetails: { name: 'Test default file name', lastModifiedDate: dayjs(), size: '12234' },
  handleClick: () => {},
};
