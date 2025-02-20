import * as React from "react";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { Box, Card, CardContent, CardMedia, Stack } from "@mui/material";
import ItemCardTextContent from "@common/ItemCard/ItemCardTextContent";
import ItemCardButtons from "@common/ItemCard/ItemCardButtons";
import ItemCardActions from "@common/ItemCard/ItemCardActions";
import { CategoryType } from "@features/categories/types";

dayjs.extend(relativeTime);

interface IItemCardProps {
  data: Array<CategoryType>;
  handleEdit: (value: string) => void;
  handleDelete: (value: string) => void;
  prefixURI?: string;
}

const ItemCard: React.FunctionComponent<IItemCardProps> = ({
  data,
  handleEdit,
  handleDelete,
  prefixURI,
}) => {
  return (
    <Box sx={{ overflow: "auto", paddingBottom: "1rem" }}>
      <Stack spacing={{ xs: 2 }} direction="row" useFlexGap flexWrap="wrap">
        {data?.map((item, index: number) => (
          <Stack key={index} flexGrow={1}>
            <Card
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <CardMedia
                sx={{ height: "10rem" }}
                image={item?.image || "/blank_canvas.png"}
              />
              <CardContent>
                <Stack direction="row">
                  <Stack flexGrow={1}>
                    <Stack direction="row" justifyContent="space-between">
                      <ItemCardTextContent
                        uri={encodeURI(`/${prefixURI}/${item.id}`)}
                        name={item.name}
                        description={item.description}
                      />
                      <ItemCardButtons
                        id={item.id}
                        handleDelete={handleDelete}
                        handleEdit={handleEdit}
                      />
                    </Stack>
                  </Stack>
                </Stack>
              </CardContent>
              <ItemCardActions
                updator={item.updator}
                updatedAtTimestamp={item.updated_at}
                statusName={
                  prefixURI === "plan"
                    ? item.maintenance_status_name
                    : item.status
                }
              />
            </Card>
          </Stack>
        ))}
      </Stack>
    </Box>
  );
};

export default ItemCard;
