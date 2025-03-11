import { useEffect, useState } from 'react';

import { AddRounded, CheckCircleRounded } from '@mui/icons-material';
import { Button, Stack } from '@mui/material';

import dayjs from 'dayjs';
import { enqueueSnackbar } from 'notistack';
import ColorPicker from '@common/ColorPicker';

import { STATUS_OPTIONS } from '@common/StatusOptions/constants';
import { ADD_NOTES_FORM_FIELDS } from '@features/Notes/constants';

import LocationPicker from '@common/LocationPicker';
import AddNoteHeader from '@features/Notes/AddNote/AddNoteHeader';
import CustomDatePicker from '@common/CustomDatePicker';
import AddNoteStatusOptions from '@features/Notes/AddNote/AddNoteStatusOptions';

import { useAuthenticator } from '@aws-amplify/ui-react';
import { useCreateNote, useUpdateNote } from '@services/notesApi';

const AddNote = ({ setEditMode, setSelectedNoteID, noteID, notes }) => {
  const { user } = useAuthenticator();
  const { mutate: createNote } = useCreateNote();
  const { mutate: updateNote } = useUpdateNote();

  const [planColor, setPlanColor] = useState('#f7f7f7');
  const [location, setLocation] = useState({ lat: 0, lon: 0 });
  const [completionDate, setCompletionDate] = useState(dayjs());
  const [formFields, setFormFields] = useState(ADD_NOTES_FORM_FIELDS);
  const [status, setStatus] = useState(STATUS_OPTIONS[0].label);

  const handleColorChange = (newValue) => {
    setPlanColor(newValue);
  };

  const handleStatus = (e) => {
    setStatus(e.target.value);
  };

  const handleInput = (event) => {
    const { name, value } = event.target;
    const updatedFormFields = Object.assign({}, formFields, {
      [name]: {
        ...formFields[name],
        value: value,
        errorMsg: '',
      },
    });
    for (const validator of updatedFormFields[name].validators) {
      if (validator.validate(value)) {
        updatedFormFields[name].errorMsg = validator.message;
        break;
      }
    }
    setFormFields(updatedFormFields);
  };

  const isDisabled = () => {
    const containsErr = Object.values(formFields).some((el) => el.errorMsg);
    const requiredFormFields = Object.values(formFields).filter((v) => v.required);
    const isRequiredFieldsEmpty = requiredFormFields.some((el) => el.value.trim() === '');

    return (
      containsErr ||
      isRequiredFieldsEmpty ||
      !dayjs(completionDate).isValid() ||
      !dayjs(completionDate).isAfter(dayjs().add(-1, 'day'))
    );
  };

  const submit = async () => {
    if (isDisabled()) {
      enqueueSnackbar('Cannot add new item.', {
        variant: 'error',
      });
      return;
    }

    const formattedNotes = Object.values(formFields).reduce((acc, el) => {
      if (el.value) {
        acc[el.name] = el.value;
      }
      if (noteID) {
        acc['id'] = noteID;
      }
      return acc;
    }, {});

    if (noteID) {
      updateNote({
        ...formattedNotes,
        color: planColor,
        status: status,
        location: location,
        completionDate: completionDate.toISOString(),
        updatedNoteIdRef: user.userId,
      });
    } else {
      createNote({
        ...formattedNotes,
        color: planColor,
        status: status,
        location: location,
        completionDate: completionDate.toISOString(),
        createdNoteIdRef: user.userId,
        updatedNoteIdRef: user.userId,
      });
    }

    setEditMode(false);
    setSelectedNoteID(null);
    setPlanColor('#f7f7f7');
    setStatus(STATUS_OPTIONS[0].label);
    setFormFields(ADD_NOTES_FORM_FIELDS);
    enqueueSnackbar(noteID ? 'Successfully updated existing item.' : 'Successfully added new item.', {
      variant: 'success',
    });
  };

  useEffect(() => {
    if (noteID !== null) {
      const selectedNote = notes.find((v) => v.id === noteID);
      const updatedFormFields = Object.assign({}, formFields, {
        title: {
          ...formFields.title,
          value: selectedNote?.title || '',
        },
        description: {
          ...formFields.description,
          value: selectedNote?.description || '',
        },
      });

      if (selectedNote?.completionDate) {
        setCompletionDate(dayjs(selectedNote.completionDate));
      }

      setPlanColor(selectedNote?.color || '#ffffff');
      setStatus(selectedNote.status || STATUS_OPTIONS[0].label);
      setLocation(selectedNote.location);
      setFormFields(updatedFormFields);
    } else {
      setFormFields(ADD_NOTES_FORM_FIELDS);
      setStatus(STATUS_OPTIONS[0].label);
      setPlanColor('#f7f7f7');
    }
  }, [noteID]);

  return (
    <Stack spacing={1}>
      <AddNoteHeader formFields={formFields} handleInput={handleInput} setLocation={setLocation} />
      <AddNoteStatusOptions label="Selected status" name="status" value={status} handleStatus={handleStatus} />
      <ColorPicker label="Assign Color" value={planColor} handleChange={handleColorChange} />
      <CustomDatePicker
        label="Assign estimated completion date"
        completionDate={completionDate}
        setCompletionDate={setCompletionDate}
      />
      {location?.lat ? <LocationPicker location={location} onLocationChange={setLocation} editMode /> : null}
      <Button
        onClick={submit}
        variant="outlined"
        disabled={isDisabled()}
        startIcon={noteID ? <CheckCircleRounded /> : <AddRounded />}
      >
        {noteID ? 'Save' : 'Add'}
      </Button>
    </Stack>
  );
};

export default AddNote;
