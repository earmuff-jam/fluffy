import * as React from "react";
import { Stack } from "@mui/material";

interface IUserDemographicsRowProps {
  children: React.ReactNode;
}

const UserDemographicsRow: React.FunctionComponent<
  IUserDemographicsRowProps
> = ({ children }) => {
  return (
    <Stack
      direction={"row"}
      spacing={3}
      alignItems={"center"}
      justifyContent={"space-between"}
    >
      {children}
    </Stack>
  );
};

export default UserDemographicsRow;
