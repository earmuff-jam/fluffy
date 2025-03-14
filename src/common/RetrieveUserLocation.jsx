import { LocationOnRounded } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';
import CryptoJS from 'crypto-js';

// TODO: CHANGE THIS
// DO NOT PUSH TO PRODUCTION
const ks = 'this-si-no-bueno-hidden-khabar';

const RetrieveUserLocation = ({ setLocation }) => {
  const handleLocation = async () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const foundCoordinates = { lat: position.coords.latitude || 0, lon: position.coords.longitude || 0 };
      const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(foundCoordinates), ks).toString();
      localStorage.setItem('client_location', ciphertext);
      return setLocation(foundCoordinates);
    });
  };

  return (
    <Tooltip title="Assign approximate location">
      <IconButton onClick={handleLocation} disableRipple={true} size="small">
        <LocationOnRounded fontSize="small" color="primary" />
      </IconButton>
    </Tooltip>
  );
};

export default RetrieveUserLocation;
