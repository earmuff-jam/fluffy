import { Suspense, useEffect } from 'react';

import { Dialog } from '@mui/material';

import { router } from '@common/router';
import { TourProvider } from '@reactour/tour';
import { RouterProvider } from 'react-router-dom';
import DEFAULT_TOUR_STEPS from '@utils/tour/steps';

import AuthHeader from '@features/LandingPage/AuthHeader';
import AuthFooter from '@features/LandingPage/AuthFooter';

import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react';
import { useCreateProfile } from '@services/profileApi';

const ApplicationValidator = () => {
  const { user } = useAuthenticator();
  const { mutate: createProfile } = useCreateProfile();

  useEffect(() => {
    if (user) {
      createProfile(user); // 1st time create profile
    }
  }, [user]);

  if (!user) {
    return (
      <>
        <AuthHeader />
        <Authenticator />
        <AuthFooter />
      </>
    );
  }

  return (
    <TourProvider steps={DEFAULT_TOUR_STEPS}>
      <Suspense fallback={<Dialog title="Loading..." />}>
        <RouterProvider router={router} />
      </Suspense>
    </TourProvider>
  );
};

export default ApplicationValidator;
