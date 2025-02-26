import { SwapHorizRounded } from '@mui/icons-material';
import { Box, Checkbox, FormControlLabel, Stack, TextField, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider/LocalizationProvider';

export default function AddAssetFormItemDetails({
  formData,
  handleInputChange,
  handleCheckbox,
  returnDateTime,
  setReturnDateTime,
}) {
  return (
    <Box component="form" sx={{ maxWidth: 600, width: '100%' }}>
      <Stack spacing={2} useFlexGap>
        <TextField
          id="price"
          label="Item price"
          value={formData.price.value}
          onChange={handleInputChange}
          placeholder={formData.price.placeholder}
          fullWidth
          variant="outlined"
          size="small"
          error={Boolean(formData.price['errorMsg'].length)}
          helperText={formData.price['errorMsg']}
        />
        <Stack direction="row" useFlexGap spacing={2}>
          <TextField
            id="barcode"
            label="Item Barcode"
            value={formData.barcode.value}
            placeholder={formData.barcode.placeholder}
            onChange={handleInputChange}
            fullWidth
            variant="outlined"
            size="small"
            error={Boolean(formData.barcode['errorMsg'].length)}
            helperText={formData.barcode['errorMsg']}
          />
          <TextField
            id="sku"
            label="Item SKU"
            value={formData.sku.value}
            placeholder={formData.sku.placeholder}
            onChange={handleInputChange}
            fullWidth
            variant="outlined"
            size="small"
            error={Boolean(formData.sku['errorMsg'].length)}
            helperText={formData.sku['errorMsg']}
          />
        </Stack>

        <Stack direction="row" useFlexGap spacing={2}>
          <TextField
            id="boughtAt"
            label="Place of purchase"
            value={formData.boughtAt.value}
            placeholder={formData.boughtAt.placeholder}
            onChange={handleInputChange}
            fullWidth
            variant="outlined"
            size="small"
            error={Boolean(formData.boughtAt['errorMsg'].length)}
            helperText={formData.boughtAt['errorMsg']}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.isReturnable.value}
                onChange={(e) => handleCheckbox('isReturnable', e.target.checked)}
                color="primary"
              />
            }
            label={
              <Stack direction="row" alignItems="center" spacing={0.5}>
                <SwapHorizRounded color={formData.isReturnable.value ? 'primary' : 'secondary'} />
                <Typography variant="caption">Returnable</Typography>
              </Stack>
            }
          />
        </Stack>
        {formData.isReturnable.value ? (
          <Stack direction="row" useFlexGap spacing={2}>
            <TextField
              id="returnLocation"
              label="Item return location"
              value={formData.returnLocation.value}
              placeholder={formData.returnLocation.placeholder}
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
              size="small"
              error={Boolean(formData.returnLocation['errorMsg'].length)}
              helperText={formData.returnLocation['errorMsg']}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                disablePast
                id="returnDatetime"
                label="Return datetime"
                value={returnDateTime}
                onChange={setReturnDateTime}
                slotProps={{ textField: { size: 'small' } }}
              />
            </LocalizationProvider>
          </Stack>
        ) : null}
      </Stack>

      <Stack direction="row" useFlexGap spacing={2} sx={{ py: 2 }}>
        <TextField
          id="maxWeight"
          label="Max weight in kg"
          value={formData.maxWeight.value}
          placeholder={formData.maxWeight.placeholder}
          onChange={handleInputChange}
          fullWidth
          variant="outlined"
          size="small"
          error={Boolean(formData.maxWeight['errorMsg'].length)}
          helperText={formData.maxWeight['errorMsg']}
        />
        <TextField
          id="minWeight"
          label="Min weight in kg"
          value={formData.minWeight.value}
          placeholder={formData.minWeight.placeholder}
          onChange={handleInputChange}
          fullWidth
          variant="outlined"
          size="small"
          error={Boolean(formData.minWeight['errorMsg'].length)}
          helperText={formData.minWeight['errorMsg']}
        />
      </Stack>
      <Stack direction="row" useFlexGap spacing={2}>
        <TextField
          id="maxHeight"
          label={formData.maxHeight.label}
          value={formData.maxHeight.value}
          placeholder={formData.maxHeight.placeholder}
          onChange={handleInputChange}
          fullWidth
          variant="outlined"
          size="small"
          error={Boolean(formData.maxHeight['errorMsg'].length)}
          helperText={formData.maxHeight['errorMsg']}
        />
        <TextField
          id="minHeight"
          label={formData.minHeight.label}
          value={formData.minHeight.value}
          placeholder={formData.minHeight.placeholder}
          onChange={handleInputChange}
          fullWidth
          variant="outlined"
          size="small"
          error={Boolean(formData.minHeight['errorMsg'].length)}
          helperText={formData.minHeight['errorMsg']}
        />
      </Stack>
    </Box>
  );
}
