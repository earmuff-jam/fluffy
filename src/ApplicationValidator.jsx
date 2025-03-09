import { Suspense, useEffect } from 'react';

import { TourProvider } from '@reactour/tour';
import { RouterProvider } from 'react-router-dom';

import { Dialog } from '@mui/material';
import { router } from '@common/router';
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
      // create user profile if the user profile does not exist
      // uses data from default authenticator to build profile details
      createProfile(user);
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
