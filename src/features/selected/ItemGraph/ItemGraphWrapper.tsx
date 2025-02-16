import * as React from "react";
import { Paper } from "@mui/material";
import { SelectedAssetType } from "@features/categories/types";
import ItemGraph from "@features/selected/ItemGraph/ItemGraph";

interface IItemGraphWrapperProps {
  associatedAssets: Array<SelectedAssetType>;
  graphDataTour: string;
}

const ItemGraphWrapper: React.FunctionComponent<IItemGraphWrapperProps> = ({
  associatedAssets = [],
  graphDataTour,
}) => {
  return (
    <Paper elevation={1} sx={{ padding: "1rem" }} data-tour={graphDataTour}>
      <ItemGraph associatedAssets={associatedAssets} />
    </Paper>
  );
};

export default ItemGraphWrapper;
