import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { generateClient } from 'aws-amplify/data';
import dayjs from 'dayjs';

const client = generateClient();

/**
 * useFetchUserProfileDetails ...
 *
 * retrieves the profile details with the valid userId
 */
export const useFetchUserProfileDetails = (userId) => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      if (!userId) return null;

      const { data } = await client.models.Profiles.list({
        filter: { id: { eq: userId } },
      });

      return data?.length > 0 ? data[0] : null;
    },
    enabled: !!userId,
  });
};

/**
 * useFetchUserProfileStats ...
 *
 * retrieves the profile details with the valid userId
 */
export const useFetchUserProfileStats = (userId) => {
  return useQuery({
    queryKey: ['profileStats'],
    queryFn: async () => {
      if (!userId) return null;

      let totalStats = {
        totalCategories: 0,
        totalMaintenancePlans: 0,
        totalAssets: 0,
      };

      const { data: categories } = await client.models.Categories.list({
        filter: { createdCategoryIdRef: { eq: userId } },
        selectionSet: ['id'],
      });

      totalStats.totalCategories = categories.length || 0;

      const { data: maintenancePlans } = await client.models.MaintenancePlans.list({
        filter: { createdMaintenancePlanIdRef: { eq: userId } },
        selectionSet: ['id'],
      });

      totalStats.totalMaintenancePlans = maintenancePlans.length || 0;

      const { data: assets } = await client.models.Assets.list({
        filter: { createdAssetIdRef: { eq: userId } },
        selectionSet: ['id'],
      });

      totalStats.totalAssets = assets.length || 0;

      return totalStats;
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
        filter: { id: { eq: profile.userId } },
      });

      if (data?.length > 0) {
        return data[0];
      }

      const draftProfileData = {
        id: profile.userId,
        username: '',
        emailAddress: profile.signInDetails.loginId,
        firstName: '',
        lastName: '',
        phoneNumber: '',
        aboutMe: '',
        imageURL: '',
        appearance: false, // true for dark mode
        isGridView: false, // true to view assets in grid view mode
        onlineStatus: true, // always true
        lastOnlineLocationPoint: { lat: 0, lon: 0 },
        createdAt: dayjs().toISOString(),
        updatedAt: dayjs().toISOString(),
      };

      const { data: profileData, errors } = await client.models.Profiles.create(draftProfileData);

      if (errors) {
        throw new Error('Failed to create new user profile');
      }

      return profileData;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });
};

/**
 * useUpdateProfile ...
 *
 * updates the profile with passed in params
 */
export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile) => {
      if (!profile) throw new Error('Profile details are required for update');
      const { data, errors } = await client.models.Profiles.update(profile);

      if (errors) throw new Error(errors);

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });
};
