import { BLANK_ASSET_DETAILS_FORM } from '@features/Assets/constants';
import SelectedAssetWeightDimensionFormFields from './SelectedAssetWeightDimensionFormFields';

export default {
  title: 'SelectedAsset/SelectedAssetWeightDimensionFormFields',
  component: SelectedAssetWeightDimensionFormFields,
  tags: ['autodocs'],
};

const Template = (args) => <SelectedAssetWeightDimensionFormFields {...args} />;

export const SelectedAssetWeightDimensionFormFieldsDefault = Template.bind({});

SelectedAssetWeightDimensionFormFieldsDefault.args = {
  formFields: BLANK_ASSET_DETAILS_FORM,
  handleInputChange: () => {},
};
