import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { enqueueSnackbar } from 'notistack';
import { Accordion, Skeleton } from '@mui/material';
import relativeTime from 'dayjs/plugin/relativeTime';
import { categorizeNotes, ConfirmationBoxModal, EmptyComponent } from '@common/utils';
import NoteAccordionSummary from '@features/Notes/NoteAccordionSummary';
import NoteAccordionDetails from '@features/Notes/NoteAccordionDetails';
import { useRemoveNote } from '@services/notesApi';

dayjs.extend(relativeTime);

const Note = ({ notes, loading, setEditMode, setSelectedNoteID }) => {
  const { mutate: removeNote } = useRemoveNote();

  const [deleteID, setDeleteID] = useState(-1);
  const [formattedNotes, setFormattedNotes] = useState([]);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const reset = () => {
    setConfirmDelete(false);
    setDeleteID(-1);
  };

  const handleConfirmDelete = () => {
    removeSelectedNote(deleteID);
    setConfirmDelete(false);
  };

  const removeSelectedNote = (noteID) => {
    removeNote(noteID);
    enqueueSnackbar('Successfully removed notes.', {
      variant: 'success',
    });
  };

  useEffect(() => {
    if (Array.isArray(notes) && notes.length >= 0) {
      const transformedData = categorizeNotes(notes);
      setFormattedNotes(transformedData);
    }
  }, [loading, notes]);

  if (loading) {
    return <Skeleton height="5rem" />;
  }

  if (!notes || notes.length === 0) {
    return <EmptyComponent subtitle="Add new notes." />;
  }

  return (
    <>
      {formattedNotes.map((v, index) => (
        <Accordion key={index} elevation={0} defaultExpanded={index === 0 ? true : false}>
          <NoteAccordionSummary title={v.category} totalNotes={v.totalNotes} color={v.color} />
          <NoteAccordionDetails
            details={v.details}
            setEditMode={setEditMode}
            setSelectedNoteID={setSelectedNoteID}
            setConfirmDelete={setConfirmDelete}
            setDeleteID={setDeleteID}
          />
        </Accordion>
      ))}
      <ConfirmationBoxModal
        openDialog={confirmDelete}
        title="Confirm deletion"
        handleClose={reset}
        maxSize="xs"
        deleteID={deleteID}
        confirmDelete={handleConfirmDelete}
      />
    </>
  );
};

export default Note;
