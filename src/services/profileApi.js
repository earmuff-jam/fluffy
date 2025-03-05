import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { generateClient } from 'aws-amplify/data';

const client = generateClient();

/**
 * useCreateProfile ...
 *
 * creates a new user profile, if it does not exist.
 */
export const useCreateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile) => {
      if (!profile) throw new Error('Profile details is required for creation.');

      const { data } = await client.models.Profiles.list({
        filter: {
          emailAddress: {
            eq: profile.emailAddress,
          },
        },
      });

      if (data?.length > 0) {
        return data[0];
      }

      // new profile
      const { data: profileData, errors } = await client.models.Profiles.create(profile);

      if (errors) {
        throw new Error(`Failed to create new user profile`);
      }
      return profileData;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile', profile.id] });
    },
  });
};
