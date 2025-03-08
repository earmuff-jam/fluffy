import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { generateClient } from 'aws-amplify/data';

const client = generateClient();

export const useFetchUserProfileDetails = (userId) => {
  return useQuery({
    queryKey: ['profile', userId],
    queryFn: async () => {
      if (!userId) return null;

      const { data } = await client.models.Profiles.list({
        filter: { username: { eq: userId } },
      });

      return data?.length > 0 ? data[0] : null;
    },
    enabled: !!userId,
  });
};

/**
 * useCreateProfile ...
 *
 * creates a new user profile, if it does not exist.
 */
export const useCreateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile) => {
      if (!profile) throw new Error('Profile details are required for creation.');

      const { data } = await client.models.Profiles.list({
        filter: { username: { eq: profile.userId } },
      });

      if (data?.length > 0) {
        return data[0];
      }

      const draftProfileData = {
        id: profile.userId,
        username: profile.userId,
        emailAddress: profile.signInDetails.loginId,
        firstName: '',
        lastName: '',
        avatar_url: '',
        phoneNumber: '',
        aboutMe: '',
        imageURL: '',
        appearance: false, // true for dark mode
        isGridView: false, // true to view assets in grid view mode
        onlineStatus: true, // always true
        lastOnlineLocationPoint: { lat: 0, lon: 0 },
      };

      const { data: profileData, errors } = await client.models.Profiles.create(draftProfileData);

      if (errors) {
        throw new Error('Failed to create new user profile');
      }

      return profileData;
    },
    onSuccess: (createdProfile) => {
      queryClient.invalidateQueries({ queryKey: ['profile', createdProfile.id] });
    },
  });
};
