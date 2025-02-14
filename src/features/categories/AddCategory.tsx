import * as React from "react";
import { produce } from "immer";
import { Button, Stack } from "@mui/material";
import { STATUS_OPTIONS } from "@common/StatusOptions/constants";
import ColorPicker from "@common/ColorPicker/ColorPicker";
import LocationPicker from "@common/Location/LocationPicker";
import { LocationType } from "@features/notes/types";
import { SnackbarContent } from "@utils/types";
import CustomSnackbar from "@utils/Snackbar";
import { ADD_CATEGORY_FORM_FIELDS } from "@features/categories/constants";
import AddFormHeader from "@common/FormComponents/AddFormHeader";
import StatusOptions from "@common/StatusOptions/StatusOptions";
import { AddCategoryFormFields, CategoryType } from "@features/categories/types";

interface IAddCategoryProps {
  categories: Array<CategoryType>;
  loading: boolean;
  handleCloseAddCategory: () => void;
  selectedCategoryID: string;
  setSelectedCategoryID: (value: string) => void;
}

const AddCategory: React.FunctionComponent<IAddCategoryProps> = ({
  categories,
  loading,
  handleCloseAddCategory,
  selectedCategoryID,
  setSelectedCategoryID,
}) => {
  const [planColor, setPlanColor] = React.useState<string>("#f7f7f7");
  const [status, setStatus] = React.useState<string>(STATUS_OPTIONS[0].label);
  const [formFields, setFormFields] = React.useState<AddCategoryFormFields>(ADD_CATEGORY_FORM_FIELDS);
  const [location, setLocation] = React.useState<LocationType>({
    lat: 0,
    lon: 0,
  });

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

  const handleInputChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
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

  const resetData = () => {
    setSelectedCategoryID("");
    setFormFields(ADD_CATEGORY_FORM_FIELDS);
    setPlanColor("#f7f7f7");
    handleCloseAddCategory();
  };

  const isDisabled = (): boolean => {
    const containsErr = Object.values(formFields).reduce<boolean>((acc, el) => {
      if (el.errorMsg) {
        return true;
      }
      return acc;
    }, false);

    const requiredFormFields = Object.values(formFields).filter(
      (v) => v.required
    );
    const isRequiredFieldsEmpty = requiredFormFields.some((el) => {
      return el.value.trim() === "";
    });

    return containsErr || isRequiredFieldsEmpty;
  };

  const submit = () => {
    const userID = localStorage.getItem("userID");

    if (isDisabled()) {
      setSnackbarContent({
        open: true,
        message: "Cannot add new category. Fill all required fields.",
        severity: "error",
      });
      return;
    }

    const formattedData = Object.values(formFields).reduce((acc, el) => {
      if (["min_items_limit", "max_items_limit"].includes(el.name)) {
        acc[el.name] = parseFloat(el.value);
      } else if (el.value) {
        acc[el.name] = el.value;
      }
      return acc;
    }, {});

    // seperated to prevent updating sharable groups
    if (selectedCategoryID) {
      const selectedCategory = categories.find(
        (v) => v.id === selectedCategoryID
      );
      const draftCategories = {
        id: selectedCategoryID,
        ...selectedCategory,
        ...formattedData,
        color: planColor,
        status: status,
        location: location,
        updated_by: userID,
      };
      //   dispatch(categoryActions.updateCategory(draftCategories));
    } else {
      const draftCategories = {
        ...formattedData,
        color: planColor,
        status: status,
        location: location,
        created_by: userID,
        updated_by: userID,
        sharable_groups: [userID],
      };
      //   dispatch(categoryActions.createCategory(draftCategories));
    }

    setSnackbarContent({
      open: true,
      message: selectedCategoryID
        ? "Successfully updated existing category."
        : "Successfully added new category.",
      severity: "success",
    });

    resetData();
  };

  React.useEffect(() => {
    if (!loading && selectedCategoryID !== "") {
      const draftCategory = categories
        .filter((v) => v.id === selectedCategoryID)
        .find(() => true);
      setFormFields(
        produce(formFields, (draft) => {
          draft.name.value = draftCategory?.name || "";
          draft.description.value = draftCategory?.description || "";
        })
      );

      setLocation(draftCategory.location);
      setPlanColor(draftCategory.color);
      setStatus(draftCategory.status);
    } else {
      setFormFields(ADD_CATEGORY_FORM_FIELDS);
      setPlanColor("#f7f7f7");
      setStatus(STATUS_OPTIONS[0].label);
    }
  }, [selectedCategoryID]);

  return (
    <Stack alignItems={"center"}>
      <Stack spacing={2} sx={{ width: "100%" }}>
        <AddFormHeader
          formFields={formFields}
          setLocation={setLocation}
          handleInputChange={handleInputChange}
        />
        <StatusOptions value={status} onChange={handleStatus} />
        <ColorPicker
          value={planColor}
          handleChange={handleColorChange}
          label={"Associate color"}
        />
      </Stack>
      {location?.lat ? (
        <LocationPicker
          subtitle="Assign Location"
          location={location}
          onLocationChange={setLocation}
          editMode={true}
        />
      ) : null}
      <Button
        onClick={submit}
        variant="outlined"
        disabled={isDisabled()}
        sx={{ marginTop: "1rem" }}
      >
        {selectedCategoryID ? "Edit Category" : "Add Category"}
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

export default AddCategory;
