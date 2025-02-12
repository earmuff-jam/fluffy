import * as React from 'react';

import { Accordion, Skeleton } from '@mui/material';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import CustomSnackbar from '@utils/Snackbar';
import { SnackbarContent } from '@utils/types';
import { NoteType } from '@features/notes/types';
import EmptyComponent from '@utils/EmptyComponent';
import { categorizeNotes } from '@utils/utility';
import ConfirmationBox from '@utils/ConfirmationBox';
import NoteAccordionSummary from '@features/notes/NoteAccordion/NoteAccordionSummary';
import NoteAccordionDetails from '@features/notes/NoteAccordion/NoteAccordionDetails';

dayjs.extend(relativeTime);

interface INoteProps {
    notes: Array<NoteType>;
    loading: boolean;
    setEditMode: (value: boolean) => void;
    setSelectedNoteID: (value: string) => void;
}

const Note: React.FunctionComponent<INoteProps> = ({ notes, loading, setEditMode, setSelectedNoteID }) => {

    const [deleteID, setDeleteID] = React.useState<string | number>(-1);
    const [formattedNotes, setFormattedNotes] = React.useState([]);
    const [confirmDelete, setConfirmDelete] = React.useState(false);
    const [snackbarContent, setSnackbarContent] = React.useState<SnackbarContent>(
        {
            open: false,
            message: null,
            severity: "success",
        }
    );

    const reset = () => {
        setConfirmDelete(false);
        setDeleteID(-1);
    };

    const handleConfirmDelete = () => {
        removeSelectedNote(deleteID);
        setConfirmDelete(false);
    };

    const removeSelectedNote = (noteID: string | number): void => {
        //   dispatch(notesActions.removeNote({ noteID }));
        setSnackbarContent({ open: true, message: 'Successfully removed notes', severity: 'success' });
    };

    React.useEffect(() => {
        if (Array.isArray(notes) && notes.length >= 0) {
            const transformedData = categorizeNotes(notes);
            setFormattedNotes(transformedData);
        }
    }, [loading, notes]);

    if (loading) {
        return <Skeleton height="2rem" />;
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
            <CustomSnackbar
                open={snackbarContent.open}
                message={snackbarContent.message}
                severity={snackbarContent.severity}
                handleClose={() =>
                    setSnackbarContent({
                        open: false,
                        severity: "success",
                        message: null,
                    })
                }
            />
            {confirmDelete &&
                <ConfirmationBox
                    title="Confirm deletion"
                    handleClose={reset}
                    maxSize="xs"
                    deleteID={deleteID}
                    confirmDelete={handleConfirmDelete}
                />
            }
        </>
    );
};

export default Note;
