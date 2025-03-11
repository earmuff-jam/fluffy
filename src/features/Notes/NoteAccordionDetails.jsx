import dayjs from 'dayjs';
import { DeleteRounded, EditRounded } from '@mui/icons-material';
import { AccordionDetails, Box, IconButton, Stack, Tooltip, Typography, useMediaQuery } from '@mui/material';
import relativeTime from 'dayjs/plugin/relativeTime';
import { STATUS_OPTIONS } from '@common/StatusOptions/constants';
import LocationPicker from '@common/LocationPicker';
import { useTheme } from '@emotion/react';

dayjs.extend(relativeTime);

export default function NoteAccordionDetails({
  details = [],
  setEditMode,
  setSelectedNoteID,
  setConfirmDelete,
  setDeleteID,
}) {
  const theme = useTheme();
  const higherThanSmallScreen = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <AccordionDetails>
      <Stack spacing={1}>
        {details.map((note, index) => (
          <Stack
            key={index}
            sx={{
              justifyContent: 'space-between',
              flexGrow: 1,
              padding: '1rem',
              borderRadius: '0.2rem',
            }}
          >
            <Stack direction="row" justifyContent="space-between">
              <Stack direction="row" spacing={1} alignItems="center">
                <Tooltip title={STATUS_OPTIONS.find((v) => v.label.toLowerCase() === note.status)?.display}>
                  <Stack direction="row" spacing="0.2rem">
                    {STATUS_OPTIONS.find((v) => v.label.toLowerCase() === note.status)?.icon}
                  </Stack>
                </Tooltip>
                <Typography variant="h6">{note.title}</Typography>
              </Stack>
              <Stack direction="row" alignSelf="flex-end">
                <Tooltip title="Delete">
                  <IconButton
                    onClick={() => {
                      setConfirmDelete(true);
                      setDeleteID(note.id);
                    }}
                    size="small"
                  >
                    <DeleteRounded fontSize="small" color="error" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Edit">
                  <IconButton
                    onClick={() => {
                      setEditMode(true);
                      setSelectedNoteID(note.id);
                    }}
                    size="small"
                  >
                    <EditRounded fontSize="small" color="primary" />
                  </IconButton>
                </Tooltip>
              </Stack>
            </Stack>
            <Stack direction="row" spacing={2} sx={{ margin: '1rem 0rem' }}>
              {note?.location?.lat && higherThanSmallScreen ? <LocationPicker location={note?.location} height="10vh" width='10vw'/> : null}
              <Typography variant="subtitle2">{note.description}</Typography>
            </Stack>
            <Box>
              <Typography variant="caption">
                By {note.updatedBy.emailAddress || 'Anonymous'} {dayjs(note.updatedAt).fromNow()}
              </Typography>
            </Box>
          </Stack>
        ))}
      </Stack>
    </AccordionDetails>
  );
}
