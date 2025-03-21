import dayjs from 'dayjs';

import { generateClient } from 'aws-amplify/data';
import { getUrl, uploadData } from 'aws-amplify/storage';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const client = generateClient();

/**
 * useFetchUserProfiles ...
 *
 * retrieves a list of user profiles that are in the system
 * @returns
 */
export const useFetchUserProfiles = () => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const { data } = await client.models.Profiles.list();
      return data || [];
    },
  });
};

/**
 * useFetchUserProfileDetails ...
 *
 * retrieves the profile details with the valid userId
 */
export const useFetchUserProfileDetails = (userId) => {
  return useQuery({
    queryKey: ['profile', userId],
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
    queryKey: ['profileStats', userId],
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
 * useFetchUserRecentActivities ...
 *
 * retrieves the activities of the selected user. limited to 10 items
 * but can be configured to not have any limit
 */
export const useFetchUserRecentActivities = (userId, limitData = false) => {
  return useQuery({
    queryKey: ['recentActivity'],
    queryFn: async () => {
      if (!userId) return null;

      let recentActivityList = {
        categories: [],
        maintenancePlans: [],
        assets: [],
      };

      const { data: categories } = await client.models.Categories.list({
        filter: {
          createdCategoryIdRef: {
            eq: userId,
          },
        },
        selectionSet: [
          'id',
          'name',
          'description',
          'color',
          'status',
          'imageURL',
          'location.*',
          'createdAt',
          'createdCategoryIdRef',
          'createdBy.*',
          'updatedAt',
          'updatedCategoryIdRef',
          'updatedBy.*',
        ],
        limit: limitData ? 10 : null,
      });

      recentActivityList.categories = categories || [];

      const { data: maintenancePlans } = await client.models.MaintenancePlans.list({
        filter: { createdMaintenancePlanIdRef: { eq: userId } },
        selectionSet: [
          'id',
          'name',
          'description',
          'color',
          'status',
          'imageURL',
          'location.*',
          'createdAt',
          'createdMaintenancePlanIdRef',
          'createdBy.*',
          'updatedAt',
          'updatedMaintenancePlanIdRef',
          'updatedBy.*',
        ],
        limit: limitData ? 10 : null,
      });

      recentActivityList.maintenancePlans = maintenancePlans || [];

      const { data: assets } = await client.models.Assets.list({
        filter: { createdAssetIdRef: { eq: userId } },
        selectionSet: [
          'id',
          'name',
          'description',
          'price',
          'status',
          'barcode',
          'sku',
          'color',
          'imageURL',
          'quantity',
          'boughtAt',
          'isBookmarked',
          'isReturnable',
          'returnLocation',
          'returnDatetime',
          'returnNotes',
          'maxWeight',
          'minWeight',
          'maxHeight',
          'minHeight',
          'createdAt',
          'createdBy.*',
          'updatedAt',
          'updatedBy.*',
          'storageLocationId.*',
        ],
        limit: limitData ? 10 : null,
      });

      recentActivityList.assets = assets || [];

      return recentActivityList;
    },
    enabled: !!userId,
  });
};

/**
 * useFetchProfilePhoto ...
 *
 * retrieves user photo if it exists from s3 bucket
 *
 * @param {string} id - the uuid representation of the file
 */
export const useFetchProfilePhoto = (imagePathWithId) => {
  return useQuery({
    queryKey: ['profilePhoto'],
    queryFn: async () => {
      if (!imagePathWithId) {
        return null;
      }

      const file = await getUrl({
        path: imagePathWithId,
      });

      return file || null;
    },
    enabled: !!imagePathWithId,
  });
};

/**
 * useUploadProfilePhoto ...
 *
 * uploads the profile photo for the selected user. this fn
 * also updates the database with the imageURL property with the path
 * of the user image url
 *
 */
export const useUploadProfilePhoto = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, selectedImage, data }) => {
      if (!id || !selectedImage) {
        throw new Error('Required fields are missing for upload.');
      }

      const uploadResponse = uploadData({
        path: `photos/${id}`,
        data: selectedImage,
      });

      const result = await uploadResponse.result;
      await client.models.Profiles.update({
        ...data,
        imageURL: result?.path,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile', 'profilePhoto'] });
    },
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
        filter: { id: { eq: profile.sub } },
      });

      if (data?.length > 0) {
        return data[0];
      }

      const draftProfileData = {
        id: profile?.sub,
        username: '',
        emailAddress: profile?.email,
        firstName: '',
        lastName: '',
        phoneNumber: '',
        aboutMe: '',
        imageURL: '',
        appearance: false, // true for dark mode
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
