import { useState } from 'react';
import { Stack } from '@mui/material';
import Note from '@features/Notes/Note/Note';
import SimpleModal from '@common/SimpleModal';
import AddNote from '@features/Notes/AddNote/AddNote';
import NoteHeader from '@features/Notes/Header/NoteHeader';
import { useFetchNotesQuery } from '../../services/notesApi';

const NotesList = () => {
  // const { notes, loading } = useFetchNotes();
  const { data: notes, error, isLoading: loading } = useFetchNotesQuery();

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
      <Note notes={notes} loading={loading} setEditMode={setEditMode} setSelectedNoteID={setSelectedNoteID} />
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
