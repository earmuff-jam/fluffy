import AddAssetFormReview from "./AddAssetFormReview";
import { ADD_ASSET_FORM } from "./constants";

export default {
  title: 'AddAssetFormDetails/AddAssetFormReview',
  component: AddAssetFormReview,
  tags: ['autodocs'],
};

const Template = (args) => <AddAssetFormReview {...args} />;

export const AddAssetFormReviewDefault = Template.bind({});

AddAssetFormReviewDefault.args = {
  formData: ADD_ASSET_FORM,
  handleReset: () => {},
  handleSubmit: () => {},
};
