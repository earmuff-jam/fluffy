import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import { Box, Stack } from '@mui/material';
import ItemCardDetails from '@common/ItemCard/ItemCardDetails';

dayjs.extend(relativeTime);

export default function ItemCard({ data, handleEdit, handleDelete, prefixURI }) {
  return (
    <Box sx={{ overflow: 'auto', paddingBottom: '1rem' }}>
      <Stack spacing={{ xs: 2 }} direction="row" useFlexGap flexWrap="wrap">
        {data?.map((item, index) => (
          <ItemCardDetails
            key={index}
            item={item}
            index={index}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            prefixURI={prefixURI}
          />
        ))}
      </Stack>
    </Box>
  );
}
