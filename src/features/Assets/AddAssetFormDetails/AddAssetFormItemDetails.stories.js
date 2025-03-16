import dayjs from "dayjs";

import { ADD_ASSET_FORM } from "./constants";
import AddAssetFormItemDetails from "./AddAssetFormItemDetails";

export default {
  title: 'AddAssetFormDetails/AddAssetFormItemDetails',
  component: AddAssetFormItemDetails,
  tags: ['autodocs'],
};

const Template = (args) => <AddAssetFormItemDetails {...args} />;

export const AddAssetFormItemDetailsDefault = Template.bind({});

AddAssetFormItemDetailsDefault.args = {
  formData: ADD_ASSET_FORM,
  handleInputChange: () => {},
  handleCheckbox: () => {},
  returnDateTime: dayjs(),
  setReturnDateTime: () => {},
};
