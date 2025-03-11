import { Suspense, useEffect } from 'react';

import { router } from '@common/router';
import { TourProvider } from '@reactour/tour';
import { RouterProvider } from 'react-router-dom';

import DEFAULT_TOUR_STEPS from '@utils/steps';
import Header from '@features/LandingPage/Header';
import Footer from '@features/LandingPage/Footer';

import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react';
import { useCreateProfile } from '@services/profileApi';
import EmailSection from '@features/LandingPage/EmailSection';
import Pricing from '@features/LandingPage/Pricing';
import Loading from '@common/Loading';

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
        <Pricing />
        <Footer />
      </>
    );
  }

  return (
    <TourProvider steps={DEFAULT_TOUR_STEPS}>
      <Suspense fallback={<Loading />}>
        <RouterProvider router={router} />
      </Suspense>
    </TourProvider>
  );
};

export default ApplicationValidator;
