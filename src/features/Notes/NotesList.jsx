import { useState } from 'react';

import { Stack } from '@mui/material';

import Note from '@features/Notes/Note';
import SimpleModal from '@common/SimpleModal';
import AddNote from '@features/Notes/AddNote';
import NoteHeader from '@features/Notes/NoteHeader';

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
      <NoteHeader handleClick={handleEditMode} />
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
