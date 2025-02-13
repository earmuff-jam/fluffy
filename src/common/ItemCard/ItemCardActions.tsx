import * as React from "react";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { CardActions, Chip, Stack, Tooltip, Typography } from "@mui/material";
import { STATUS_OPTIONS } from "@common/StatusOptions/constants";

dayjs.extend(relativeTime);

interface IItemCardActionsProps {
  statusName: string;
  updatedAtTimestamp: string;
  updator: string;
}

const ItemCardActions: React.FunctionComponent<IItemCardActionsProps> = ({
  statusName,
  updatedAtTimestamp,
  updator,
}) => {
  const displayTooltip = (statusName: string) => {
    const displayTitle = STATUS_OPTIONS.find(
      (v) => v.label.toLowerCase() === statusName
    );
    return (
      <Tooltip title={displayTitle?.display}>
        <Stack
          direction="row"
          spacing="0.2rem"
          alignItems="center"
          alignSelf="flex-end"
        >
          <Chip
            variant="outlined"
            size="small"
            label={displayTitle?.display.split(" ")[0]}
          />
        </Stack>
      </Tooltip>
    );
  };
  return (
    <CardActions sx={{ justifyContent: "space-between" }}>
      {updatedAtTimestamp === null ? (
        <Typography variant="caption" color="text.secondary">
          Never updated
        </Typography>
      ) : (
        <Tooltip
          title={`Last updated around ${dayjs(updatedAtTimestamp).fromNow()}`}
        >
          <Typography variant="caption" color="text.secondary">
            By {updator || "anonymous"} {dayjs(updatedAtTimestamp).fromNow()}
          </Typography>
        </Tooltip>
      )}
      {displayTooltip(statusName)}
    </CardActions>
  );
};

export default ItemCardActions;
