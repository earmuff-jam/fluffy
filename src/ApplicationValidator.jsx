import { useEffect } from 'react';

import { router } from '@utils/router';
import { TourProvider } from '@reactour/tour';
import { RouterProvider } from 'react-router-dom';

import DEFAULT_TOUR_STEPS from '@utils/steps';
import Header from '@features/LandingPage/Header';
import Footer from '@features/LandingPage/Footer';
// import Pricing from '@features/LandingPage/Pricing';
import EmailSection from '@features/LandingPage/EmailSection';

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
        <Header />
        <Authenticator />
        <EmailSection />
        {/* https://github.com/earmuff-jam/fluffy/issues/6 
        pending until stripe payment is configured
        <Pricing /> */}
        <Footer />
      </>
    );
  }

  return (
    <TourProvider steps={DEFAULT_TOUR_STEPS}>
      <RouterProvider router={router} />
    </TourProvider>
  );
};

export default ApplicationValidator;
