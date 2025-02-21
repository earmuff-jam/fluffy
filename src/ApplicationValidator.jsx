import { Suspense } from 'react';
import { TourProvider } from '@reactour/tour';
import { RouterProvider } from 'react-router-dom';
import { Dialog } from '@mui/material';
import { router } from '@common/router';
import DEFAULT_TOUR_STEPS from '@utils/tour/steps';

const ApplicationValidator = () => {
  return (
    <TourProvider steps={DEFAULT_TOUR_STEPS}>
      <Suspense fallback={<Dialog title="Loading..." />}>
        <RouterProvider router={router} />
      </Suspense>
    </TourProvider>
  );
};

export default ApplicationValidator;
