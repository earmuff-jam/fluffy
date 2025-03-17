import { BLANK_ASSET_DETAILS_FORM } from '@features/Assets/constants';
import AddAssetFormDetails from './AddAssetFormDetails';

export default {
  title: 'AddAssetFormDetails/AddAssetFormDetails',
  component: AddAssetFormDetails,
  tags: ['autodocs'],
};

const Template = (args) => <AddAssetFormDetails {...args} />;

export const AddAssetFormDetailsDefault = Template.bind({});

AddAssetFormDetailsDefault.args = {
  formData: BLANK_ASSET_DETAILS_FORM,
  options: [],
  storageLocation: 'Garage 001',
  setStorageLocation: () => {},
  handleInputChange: () => {},
  handleCheckbox: () => {},
};
