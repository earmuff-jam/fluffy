import * as React from "react";
import { Stack, Typography } from "@mui/material";

interface IItemCardTextContentProps {
  uri: string;
  name: string;
  description: string;
}

const ItemCardTextContent: React.FunctionComponent<
  IItemCardTextContentProps
> = ({ uri, name, description }) => {
  return (
    <Stack width={"20rem"}>
      <Typography
        variant="h6"
        component="h3"
        onClick={() => {
          console.log(uri);
          // navigate(uri);
        }}
        sx={{ cursor: "pointer" }}
      >
        {name}
      </Typography>
      <Typography
        variant="caption"
        color="text.secondary"
        sx={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          width: "100%",
        }}
        noWrap
      >
        {description}
      </Typography>
    </Stack>
  );
};

export default ItemCardTextContent;
