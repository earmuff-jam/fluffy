import { produce } from 'immer';
import { enqueueSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { Button, Stack } from '@mui/material';
import ColorPicker from '@common/ColorPicker';
import LocationPicker from '@common/Location/LocationPicker';
import StatusOptions from '@common/StatusOptions/StatusOptions';
import { STATUS_OPTIONS } from '@common/StatusOptions/constants';
import AddFormHeader from '@features/FormComponents/AddFormHeader';
import { ADD_CATEGORY_FORM_FIELDS } from '@features/Categories/constants';
import { useCreateCategory, useUpdateCategory } from '@services/categoriesApi';
import dayjs from 'dayjs';

export default function AddCategory({
  categories,
  loading,
  handleCloseAddCategory,
  selectedCategoryID,
  setSelectedCategoryID,
}) {
  const { mutate: createCategory } = useCreateCategory();
  const { mutate: updateCategory } = useUpdateCategory();

  const [location, setLocation] = useState({ lat: 0, lon: 0 });
  const [planColor, setPlanColor] = useState('#f7f7f7');
  const [status, setStatus] = useState(STATUS_OPTIONS[0].label);
  const [formFields, setFormFields] = useState(ADD_CATEGORY_FORM_FIELDS);

  const handleColorChange = (el) => setPlanColor(el);
  const handleStatus = (e) => setStatus(e.target.value);

  const handleInputChange = (event) => {
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

  const resetData = () => {
    setSelectedCategoryID('');
    setFormFields(ADD_CATEGORY_FORM_FIELDS);
    setPlanColor('#f7f7f7');
    handleCloseAddCategory();
  };

  const isDisabled = () => {
    const containsErr = Object.values(formFields).reduce((acc, el) => {
      if (el.errorMsg) {
        return true;
      }
      return acc;
    }, false);

    const requiredFormFields = Object.values(formFields).filter((v) => v.required);
    const isRequiredFieldsEmpty = requiredFormFields.some((el) => {
      return el.value.trim() === '';
    });

    return containsErr || isRequiredFieldsEmpty;
  };

  const submit = () => {
    if (isDisabled() || status == null) {
      enqueueSnackbar('Cannot add new category. Fill all required fields.', {
        variant: 'error',
      });
      return;
    }

    const formattedData = Object.values(formFields).reduce((acc, el) => {
      if (['min_items_limit', 'max_items_limit'].includes(el.name)) {
        acc[el.name] = parseFloat(el.value);
      } else if (el.value) {
        acc[el.name] = el.value;
      }
      return acc;
    }, {});

    // seperated to prevent updating sharable groups
    if (selectedCategoryID) {
      const selectedCategory = categories.find((v) => v.id === selectedCategoryID);
      const draftRequest = {
        id: selectedCategoryID,
        ...selectedCategory,
        ...formattedData,
        color: planColor,
        // status: status,
        location: location,
        // updated_by: userID,
      };
      updateCategory(draftRequest);
    } else {
      const draftRequest = {
        ...formattedData,
        color: planColor,
        // status: status,
        location: location,
        createdAt: dayjs().toISOString(),
        updatedAt: dayjs().toISOString(),
        // created_by: userID,
        // updated_by: userID,
        // sharable_groups: [userID],
      };
      createCategory(draftRequest);
    }

    enqueueSnackbar(
      selectedCategoryID ? 'Successfully updated existing category.' : 'Successfully added new category.',
      {
        variant: 'success',
      }
    );
    resetData();
  };

  useEffect(() => {
    if (!loading && selectedCategoryID !== '') {
      const draftCategory = categories.filter((v) => v.id === selectedCategoryID).find(() => true);
      setFormFields(
        produce(formFields, (draft) => {
          draft.name.value = draftCategory?.name || '';
          draft.description.value = draftCategory?.description || '';
        })
      );

      setLocation(draftCategory.location);
      setPlanColor(draftCategory.color || '#ffffff');
      setStatus(draftCategory.status_name || STATUS_OPTIONS[0].label);
    } else {
      resetData();
    }
  }, [selectedCategoryID]);

  return (
    <Stack alignItems={'center'}>
      <Stack spacing={2} sx={{ width: '100%' }}>
        <AddFormHeader formFields={formFields} setLocation={setLocation} handleInputChange={handleInputChange} />
        <StatusOptions value={status} onChange={handleStatus} />
        <ColorPicker value={planColor} handleChange={handleColorChange} label={'Associate color'} />
      </Stack>
      {location?.lat ? (
        <LocationPicker subtitle="Assign Location" location={location} onLocationChange={setLocation} editMode={true} />
      ) : null}
      <Button onClick={submit} variant="outlined" disabled={isDisabled()} sx={{ marginTop: '1rem' }}>
        {selectedCategoryID ? 'Edit Category' : 'Add Category'}
      </Button>
    </Stack>
  );
}
