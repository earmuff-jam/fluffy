import { Card, CardContent, Stack } from '@mui/material';

import ItemCardActions from '@common/ItemCard/ItemCardActions';
import ItemCardButtons from '@common/ItemCard/ItemCardButtons';
import ItemCardTextContent from '@common/ItemCard/ItemCardTextContent';

export default function ItemCardDetails({ item, index, handleEdit, handleDelete, prefixURI }) {
  return (
    <Stack key={index} flexGrow={1}>
      <Card
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <CardContent>
          <Stack direction="row">
            <Stack flexGrow={1}>
              <Stack direction="row" justifyContent="space-between">
                <ItemCardTextContent
                  uri={encodeURI(`/${prefixURI}/${item.id}`)}
                  name={item.name}
                  description={item.description}
                />
                <ItemCardButtons id={item.id} handleDelete={handleDelete} handleEdit={handleEdit} />
              </Stack>
            </Stack>
          </Stack>
        </CardContent>
        <ItemCardActions
          updator={item?.updatedBy?.emailAddress}
          updatedAtTimestamp={item.updatedAt}
          statusName={item.status}
        />
      </Card>
    </Stack>
  );
}
