import AddAssetFormInstructions from "./AddAssetFormInstructions";

export default {
  title: 'AddAssetFormDetails/AddAssetFormInstructions',
  component: AddAssetFormInstructions,
  tags: ['autodocs'],
};

const Template = (args) => <AddAssetFormInstructions {...args} />;

export const AddAssetFormInstructionsDefault = Template.bind({});
export const AddAssetFormInstructionsSecondInstruction = Template.bind({});
export const AddAssetFormInstructionsThirdInstruction = Template.bind({});

AddAssetFormInstructionsDefault.args = {
  stepNumber: 1,
};

AddAssetFormInstructionsSecondInstruction.args = {
  stepNumber: 2,
};

AddAssetFormInstructionsThirdInstruction.args = {
  stepNumber: 3,
};
