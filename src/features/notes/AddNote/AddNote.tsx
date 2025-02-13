import * as React from "react";
import { Button, Stack } from "@mui/material";
import { AddRounded, CheckCircleRounded } from "@mui/icons-material";
import dayjs from "dayjs";
import { STATUS_OPTIONS } from "@common/StatusOptions/constants";
import {
  AddNoteFormFields,
  LocationType,
  NoteType,
} from "@features/notes/types";
import { ADD_NOTES_FORM_FIELDS } from "@features/notes/constants";
import AddNoteHeader from "@features/notes/AddNote/AddNoteHeader";
import CustomSnackbar from "@utils/Snackbar";
import { SnackbarContent } from "@utils/types";
import AddNoteStatusOptions from "@features/notes/AddNote/AddNoteStatusOptions";
import ColorPicker from "@common/ColorPicker/ColorPicker";
import CustomDatePicker from "@common/CustomDatePicker/CustomDatePicker";
import LocationPicker from "@common/Location/LocationPicker";

interface IAddNoteProps {
  noteID: string;
  notes: Array<NoteType>;
  setEditMode: (value: boolean) => void;
  setSelectedNoteID: (value: string | null) => void;
}

const AddNote: React.FunctionComponent<IAddNoteProps> = ({
  setEditMode,
  setSelectedNoteID,
  noteID,
  notes,
}) => {
  const [planColor, setPlanColor] = React.useState<string>("#f7f7f7");
  const [location, setLocation] = React.useState<LocationType>({
    lat: 0,
    lon: 0,
  });

  const [status, setStatus] = React.useState(STATUS_OPTIONS[0].label);
  const [completionDate, setCompletionDate] = React.useState(dayjs());
  const [formFields, setFormFields] = React.useState<AddNoteFormFields>(
    ADD_NOTES_FORM_FIELDS
  );

  const [snackbarContent, setSnackbarContent] = React.useState<SnackbarContent>(
    {
      open: false,
      message: null,
      severity: "success",
    }
  );

  const handleColorChange = (newValue: string) => {
    setPlanColor(newValue);
  };

  const handleStatus = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setStatus(ev.target.value);
  };

  const handleInput = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = ev.target;
    const updatedFormFields = Object.assign({}, formFields, {
      [name]: {
        ...formFields[name],
        value: value,
        errorMsg: "",
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
    const requiredFormFields = Object.values(formFields).filter(
      (v) => v.required
    );
    const isRequiredFieldsEmpty = requiredFormFields.some(
      (el) => el.value.trim() === ""
    );

    return (
      containsErr ||
      isRequiredFieldsEmpty ||
      !dayjs(completionDate).isValid() ||
      !dayjs(completionDate).isAfter(dayjs().add(-1, "day"))
    );
  };

  const submit = () => {
    const userID = localStorage.getItem("userID");

    if (isDisabled()) {
      setSnackbarContent({
        open: true,
        message: "Cannot add new item",
        severity: "error",
      });
      return;
    }

    const formattedNotes = Object.values(formFields).reduce((acc, el) => {
      if (el.value) {
        acc["noteID"] = noteID;
        acc[el.name] = el.value;
      }
      return acc;
    }, {});

    const formattedDraftNotes = {
      ...formattedNotes,
      color: planColor,
      status: status,
      location: location,
      completionDate: completionDate.toISOString(),
      updated_by: userID,
    };

    if (noteID) {
      // dispatch(notesActions.updateNote(formattedDraftNotes));
    } else {
      // dispatch(notesActions.createNote(formattedDraftNotes));
    }

    setEditMode(false);
    setSelectedNoteID(null);
    setPlanColor("#f7f7f7");
    setStatus(STATUS_OPTIONS[0].label);
    setFormFields(ADD_NOTES_FORM_FIELDS);
    setSnackbarContent({
      open: true,
      message: noteID
        ? "Successfully updated existing item."
        : "Successfully added new item.",
      severity: "success",
    });
  };

  React.useEffect(() => {
    if (noteID !== null) {
      const selectedNote = notes.filter((v) => v.noteID === noteID);
      const draftNote = selectedNote[0];
      const updatedFormFields = Object.assign({}, formFields, {
        title: {
          ...formFields.title,
          value: draftNote?.title || "",
        },
        description: {
          ...formFields.description,
          value: draftNote?.description || "",
        },
      });

      if (draftNote?.completionDate) {
        setCompletionDate(dayjs(draftNote.completionDate));
      }

      setPlanColor(draftNote.color);
      setStatus(draftNote.status_name);
      setLocation(draftNote.location);
      setFormFields(updatedFormFields);
    } else {
      setFormFields(ADD_NOTES_FORM_FIELDS);
      setStatus(STATUS_OPTIONS[0].label);
      setPlanColor("#f7f7f7");
    }
  }, [noteID]);

  return (
    <Stack spacing={1}>
      <AddNoteHeader
        formFields={formFields}
        handleInput={handleInput}
        setLocation={setLocation}
      />
      <AddNoteStatusOptions
        label="Selected status"
        name="status"
        value={status}
        handleStatus={handleStatus}
      />
      <ColorPicker
        label="Assign Color"
        value={planColor}
        handleChange={handleColorChange}
      />
      <CustomDatePicker
        label="Assign estimated completion date"
        completionDate={completionDate}
        setCompletionDate={setCompletionDate}
      />
      {location?.lat ? (
        <LocationPicker
          subtitle="Select location"
          location={location}
          onLocationChange={setLocation}
          editMode={true}
        />
      ) : null}
      <Button
        onClick={submit}
        variant="outlined"
        disabled={isDisabled()}
        startIcon={noteID ? <CheckCircleRounded /> : <AddRounded />}
      >
        {noteID ? "Save" : "Add"}
      </Button>
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
    </Stack>
  );
};

export default AddNote;
