import { useState } from 'react';

import { AddRounded } from '@mui/icons-material';
import { IconButton, Stack, Typography } from '@mui/material';

import Note from '@features/Notes/Note';
import SimpleModal from '@utils/SimpleModal';
import AddNote from '@features/Notes/AddNote';

import { useFetchNotes } from '@services/notesApi';
import { useAuthenticator } from '@aws-amplify/ui-react';

const NotesList = () => {
  const { user } = useAuthenticator();
  const { data: notes, isLoading } = useFetchNotes(user.userId);

  const [editMode, setEditMode] = useState(false);
  const [selecteNoteID, setSelectedNoteID] = useState(null);

  const handleEditMode = () => setEditMode(!editMode);

  const resetData = () => {
    setEditMode(false);
    setSelectedNoteID(null);
  };

  return (
    <Stack spacing="1rem" data-tour="notes-0">
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h5" color="text.secondary" gutterBottom>
          Notes
        </Typography>
        <IconButton onClick={handleEditMode} size="small" data-tour="notes-1">
          <AddRounded fontSize="small" />
        </IconButton>
      </Stack>
      <Note notes={notes} loading={isLoading} setEditMode={setEditMode} setSelectedNoteID={setSelectedNoteID} />
      {editMode && (
        <SimpleModal
          title="Add New Note"
          subtitle={'Notes with assigned locations reflect approximate values.'}
          handleClose={resetData}
          maxSize="xs"
        >
          <AddNote
            setEditMode={setEditMode}
            setSelectedNoteID={setSelectedNoteID}
            noteID={selecteNoteID}
            notes={notes}
          />
        </SimpleModal>
      )}
    </Stack>
  );
};

export default NotesList;
