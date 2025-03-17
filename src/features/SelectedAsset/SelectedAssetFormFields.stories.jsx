import { BLANK_ASSET_DETAILS_FORM } from "@features/Assets/constants";
import SelectedAssetFormFields from "./SelectedAssetFormFields";

export default {
  title: 'SelectedAsset/SelectedAssetFormFields',
  component: SelectedAssetFormFields,
  tags: ['autodocs'],
};

const Template = (args) => <SelectedAssetFormFields {...args} />;

export const SelectedAssetFormFieldsDefault = Template.bind({});

SelectedAssetFormFieldsDefault.args = {
  formFields: BLANK_ASSET_DETAILS_FORM,
  selectedImage: '',
  handleInputChange: () => {},
  options: [],
  storageLocation: {},
  setStorageLocation: () => {},
};
