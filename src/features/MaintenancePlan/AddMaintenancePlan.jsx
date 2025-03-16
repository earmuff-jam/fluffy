import { useEffect, useState } from 'react';

import { produce } from 'immer';

import { Button, Stack } from '@mui/material';

import { enqueueSnackbar } from 'notistack';
import ColorPicker from '@utils/ColorPicker';
import LocationPicker from '@utils/LocationPicker';

import StatusOptions from '@features/FormComponents/StatusOptions';
import { STATUS_OPTIONS } from '@utils/constants';
import AddFormHeader from '@features/FormComponents/AddFormHeader';
import { ADD_MAINTENANCE_PLAN_FORM_FIELDS } from '@features/MaintenancePlan/constants';

import { useAuthenticator } from '@aws-amplify/ui-react';
import { useCreateMaintenancePlan, useUpdateMaintenancePlan } from '@services/maintenancePlanApi';

const AddMaintenancePlan = ({
  handleClose,
  maintenancePlan,
  selectedMaintenancePlanID,
  setSelectedMaintenancePlanID,
}) => {
  const { user } = useAuthenticator();
  const { mutate: createMaintenancePlan } = useCreateMaintenancePlan();
  const { mutate: updateMaintenancePlan } = useUpdateMaintenancePlan();

  const [location, setLocation] = useState({ lat: 0, lon: 0 });
  const [planColor, setPlanColor] = useState('#f7f7f7');
  const [status, setStatus] = useState(STATUS_OPTIONS[0].label);
  const [formData, setFormData] = useState(ADD_MAINTENANCE_PLAN_FORM_FIELDS);

  // const [planType, setPlanType] = useState(ITEM_TYPE_MAPPER['daily'].value);

  const handleColorChange = (el) => setPlanColor(el);
  const handleStatus = (e) => setStatus(e.target.value);

  // const handlePlanChange = (ev) => setPlanType(ev.target.value);

  const handleInputChange = (ev) => {
    const { id, value } = ev.target;
    const updatedFormData = { ...formData };
    let errorMsg = '';

    for (const validator of updatedFormData[id].validators) {
      if (validator.validate(value)) {
        errorMsg = validator.message;
        break;
      }
    }

    updatedFormData[id] = {
      ...updatedFormData[id],
      value,
      errorMsg,
    };
    setFormData(updatedFormData);
  };

  const resetData = () => {
    setSelectedMaintenancePlanID('');
    setFormData(ADD_MAINTENANCE_PLAN_FORM_FIELDS);
    setPlanColor('#f7f7f7');
    handleClose();
    setStatus(STATUS_OPTIONS[0].label);
    // setPlanType(ITEM_TYPE_MAPPER['daily'].value);
  };

  const isDisabled = () => {
    const containsErr = Object.values(formData).reduce((acc, el) => {
      if (el.errorMsg) {
        return true;
      }
      return acc;
    }, false);

    const requiredFormFields = Object.values(formData).filter((v) => v.required);
    const isRequiredFieldsEmpty = requiredFormFields.some((el) => {
      return el.value.trim() === '';
    });

    return containsErr || isRequiredFieldsEmpty;
  };

  const handleSubmit = () => {
    if (isDisabled() || status == null) {
      enqueueSnackbar('Cannot add new maintenance plan. Fill all required fields.', {
        variant: 'error',
      });
      return;
    }

    const formattedData = Object.values(formData).reduce((acc, el) => {
      if (['min_items_limit', 'max_items_limit'].includes(el.name)) {
        acc[el.name] = parseFloat(el.value);
      } else if (el.value) {
        acc[el.name] = el.value;
      }
      return acc;
    }, {});

    // seperated to prevent updating sharable groups
    if (selectedMaintenancePlanID) {
      const currentMaintenancePlan = maintenancePlan.find((v) => v.id === selectedMaintenancePlanID);
      const draftRequest = {
        id: selectedMaintenancePlanID,
        ...currentMaintenancePlan,
        ...formattedData,
        color: planColor,
        location: location,
        status: status,
        updatedMaintenancePlanIdRef: user.userId,
        // type: planType,
        // plan_type: ITEM_TYPE_MAPPER[planType].value,
        // plan_due: ITEM_TYPE_MAPPER[planType].since,
      };
      updateMaintenancePlan(draftRequest);
    } else {
      const draftRequest = {
        ...formattedData,
        color: planColor,
        location: location,
        status: status,
        createdMaintenancePlanIdRef: user.userId,
        updatedMaintenancePlanIdRef: user.userId,
        // type: planType,
        // plan_type: planType,
        // plan_due: ITEM_TYPE_MAPPER[planType].since,
      };
      createMaintenancePlan(draftRequest);
    }

    enqueueSnackbar(
      selectedMaintenancePlanID
        ? 'Successfully updated existing maintenance plan.'
        : 'Successfully added new maintenance plan.',
      {
        variant: 'success',
      }
    );
    resetData();
  };

  useEffect(() => {
    if (selectedMaintenancePlanID !== null) {
      const draftMaintenancePlan = maintenancePlan?.filter((v) => v.id === selectedMaintenancePlanID).find(() => true);
      setFormData(
        produce(formData, (draft) => {
          draft.name.value = draftMaintenancePlan?.name || '';
          draft.description.value = draftMaintenancePlan?.description || '';
        })
      );

      // const currentPlanType = Object.values(ITEM_TYPE_MAPPER).find((v) => v.value === draftMaintenancePlan?.plan_type);

      setLocation(draftMaintenancePlan?.location);
      setPlanColor(draftMaintenancePlan?.color || '#ffffff');
      setStatus(draftMaintenancePlan?.status || STATUS_OPTIONS[0].label);
      // setPlanType(currentPlanType?.value || Object.values(ITEM_TYPE_MAPPER)[0].value);
    } else {
      resetData();
    }
  }, [selectedMaintenancePlanID]);

  return (
    <Stack alignItems="center">
      <Stack spacing={2} sx={{ width: '100%' }}>
        <AddFormHeader formFields={formData} setLocation={setLocation} handleInputChange={handleInputChange} />
        {/* <AddTypeOptions value={planType} handleChange={handlePlanChange} /> */}
        <StatusOptions
          value={status}
          onChange={handleStatus}
          title="Overall status of assets"
          tooltipTitle="Overall status of assets within selected plan. Individual items may contain different status than selected one for the maintenance plan."
          showTooltip
        />
        <ColorPicker value={planColor} handleChange={handleColorChange} label={'Associate color'} />
      </Stack>
      {location?.lat ? (
        <LocationPicker subtitle="Assign Location" location={location} onLocationChange={setLocation} editMode={true} />
      ) : null}
      <Button onClick={handleSubmit} variant="outlined" disabled={isDisabled()} sx={{ marginTop: '1rem' }}>
        {selectedMaintenancePlanID ? 'Update Plan' : 'Add Plan'}
      </Button>
    </Stack>
  );
};

export default AddMaintenancePlan;
