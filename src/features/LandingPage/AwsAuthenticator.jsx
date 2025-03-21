import { useEffect, useState } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import { useCreateProfile } from '@services/profileApi';

import { fetchUserAttributes } from 'aws-amplify/auth';
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react';

export default function AwsAuthenticator() {
  const location = useLocation();
  const navigate = useNavigate();
  const { mutateAsync: createProfile } = useCreateProfile();
  const { authStatus } = useAuthenticator((context) => [context.authStatus]);

  const [isInitialized, setIsInitialized] = useState(false);

  const createOrUpdateProfileDetails = async () => {

    try {
      const userAttributes = await fetchUserAttributes();
      const initUser = await createProfile(userAttributes);

      if (!initUser) {
        navigate('/', { replace: true });
        return false;
      }

      const navigateTo = location?.state?.from?.pathname || '/assets/overview';
      navigate(navigateTo, { replace: true });
      return true;
    } catch (error) {
      return false;
    }
  };

  useEffect(() => {
    const initializeUser = async () => {
      if (authStatus === 'authenticated' && !isInitialized) {
        setIsInitialized(true);
        const success = await createOrUpdateProfileDetails();
        if (!success) setIsInitialized(false);
      } else if (authStatus === 'unauthenticated') {
        setIsInitialized(false);
      }
    };

    if (authStatus !== 'configuring') {
      initializeUser();
    }
  }, [authStatus]);

  return <Authenticator variation="modal" />;
}
