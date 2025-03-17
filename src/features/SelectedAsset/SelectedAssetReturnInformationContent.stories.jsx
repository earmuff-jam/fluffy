import { BLANK_ASSET_DETAILS_FORM } from "@features/Assets/constants";
import SelectedAssetReturnInformationContent from "./SelectedAssetReturnInformationContent";
import dayjs from "dayjs";

export default {
  title: 'SelectedAsset/SelectedAssetReturnInformationContent',
  component: SelectedAssetReturnInformationContent,
  tags: ['autodocs'],
};

const Template = (args) => <SelectedAssetReturnInformationContent {...args} />;

export const SelectedAssetReturnInformationContentDefault = Template.bind({});
export const SelectedAssetReturnInformationContentWithReturnNotes = Template.bind({});

SelectedAssetReturnInformationContentDefault.args = {
  formFields: BLANK_ASSET_DETAILS_FORM,
  handleInputChange: () => {},
  returnDateTime: dayjs(),
  setReturnDateTime: () => {},
  openReturnNote: false,
  setOpenReturnNote: () => {},
};

SelectedAssetReturnInformationContentWithReturnNotes.args = {
  formFields: BLANK_ASSET_DETAILS_FORM,
  handleInputChange: () => {},
  returnDateTime: dayjs(),
  setReturnDateTime: () => {},
  openReturnNote: true,
  setOpenReturnNote: () => {},
};
