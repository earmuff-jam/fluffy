import dayjs from 'dayjs';

import { useNavigate } from 'react-router-dom';

import { Box, Card, CardActions, CardContent, Chip, IconButton, Stack, Tooltip, Typography } from '@mui/material';

import { STATUS_OPTIONS } from '@utils/constants';
import { DeleteRounded, EditNoteRounded } from '@mui/icons-material';

export default function SectionCardDetails({ item, index, handleEdit, handleDelete, prefixURI }) {
  const navigate = useNavigate();

  const displayTooltip = (status) => {
    const displayTitle = STATUS_OPTIONS.find((v) => v.label.toLowerCase() === status);
    return (
      <Tooltip title={displayTitle?.display}>
        <Stack direction="row" spacing="0.2rem" alignItems="center" alignSelf="flex-end">
          <Chip variant="outlined" size="small" label={displayTitle?.display.split(' ')[0]} />
        </Stack>
      </Tooltip>
    );
  };

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
                <Stack width={'20rem'}>
                  <Typography
                    variant="h6"
                    component="h3"
                    onClick={() => navigate(encodeURI(`/${prefixURI}/${item?.id}`))}
                    sx={{ cursor: 'pointer' }}
                  >
                    {item?.name}
                  </Typography>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      width: '100%',
                    }}
                    noWrap
                  >
                    {item?.description}
                  </Typography>
                </Stack>
                <Stack direction="row">
                  <Box>
                    <IconButton size="small" onClick={() => handleDelete(item?.id)}>
                      <DeleteRounded fontSize="small" sx={{ color: 'error.main' }} />
                    </IconButton>
                  </Box>
                  <Box>
                    <IconButton size="small" onClick={() => handleEdit(item?.id)}>
                      <EditNoteRounded fontSize="small" sx={{ color: 'primary.main' }} />
                    </IconButton>
                  </Box>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </CardContent>
        <CardActions sx={{ justifyContent: 'space-between' }}>
          {item?.updatedAt === null ? (
            <Typography variant="caption" color="text.secondary">
              Never updated
            </Typography>
          ) : (
            <Tooltip title={`Last updated around ${dayjs(item?.updatedAt).fromNow()}`}>
              <Typography variant="caption" color="text.secondary">
                By {item?.updatedBy?.emailAddress || 'anonymous'} {dayjs(item?.updatedAt).fromNow()}
              </Typography>
            </Tooltip>
          )}
          {item?.status && displayTooltip(item?.status)}
        </CardActions>
      </Card>
    </Stack>
  );
}
