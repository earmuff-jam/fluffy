import { Typography } from "@mui/material";
import OverviewCardWrapper from "./OverviewCardWrapper";

export default {
  title: 'Home/OverviewCardWrapper',
  component: OverviewCardWrapper,
  tags: ['autodocs'],
};

const Template = (args) => <OverviewCardWrapper {...args} />;

export const OverviewCardWrapperDefault = Template.bind({});

OverviewCardWrapperDefault.args = {
  children: <Typography> Children </Typography>,
};
