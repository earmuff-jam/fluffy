import * as React from 'react';

import { Stack } from '@mui/material';
import SimpleModal from '@utils/SimpleModal';
import Note from '@features/notes/Note/Note';
import AddNote from '@features/notes/AddNote/AddNote';
import NoteHeader from '@features/notes/NoteHeader/NoteHeader';

const NotesList: React.FunctionComponent = () => {
    const notes = [];
    const loading = false;

    const [editMode, setEditMode] = React.useState(false);
    const [selecteNoteID, setSelectedNoteID] = React.useState(null);

    const handleEditMode = () => setEditMode(!editMode);

    const resetData = () => {
        setEditMode(false);
        setSelectedNoteID(null);
    };

    React.useEffect(() => {
        //   dispatch(notesActions.getNotes());
    }, []);

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
