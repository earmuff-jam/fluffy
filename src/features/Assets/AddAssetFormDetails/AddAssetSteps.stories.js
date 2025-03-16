import AddAssetSteps from './AddAssetSteps';

export default {
  title: 'AddAssetFormDetails/AddAssetSteps',
  component: AddAssetSteps,
  tags: ['autodocs'],
};

const Template = (args) => <AddAssetSteps {...args} />;

export const AddAssetStepsDefault = Template.bind({});

AddAssetStepsDefault.args = {
  activeStep: 0,
  isStepOptional: () => {},
  isStepSkipped: () => {},
};
