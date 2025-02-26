import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { generateClient } from 'aws-amplify/data';

const client = generateClient();

export const useStorageLocations = () => {
  return useQuery({
    queryKey: ['storageLocations'],
    queryFn: async () => {
      const response = await client.models.StorageLocations.list();
      return response.data || [];
    },
  });
};

export const useStorageLocationById = (id) => {
  return useQuery({
    queryKey: ['storageLocation', id],
    queryFn: async () => {
      const response = await client.models.StorageLocations.get({ id });
      return response.data || [];
    },
    enabled: !!id,
  });
};

export const useCreateStorageLocation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (storageLocation) => {
      if (!storageLocation) throw new Error('Storage Location is required for creation.');
      const { data, errors } = await client.models.StorageLocations.create(storageLocation);
      if (errors) throw new Error(errors);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['storageLocations'] });
    },
  });
};

export const useUpdateStorageLocation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (storageLocation) => {
      if (!storageLocation) throw new Error('StorageLocation details is required for update');
      const { data, errors } = await client.models.StorageLocations.update(storageLocation);
      if (errors) throw new Error(errors);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['storageLocations'] });
    },
  });
};

export const useRemoveStorageLocation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => {
      if (!id) throw new Error('StorageLocation ID is required for deletion.');
      const { data, errors } = await client.models.StorageLocations.delete({ id });
      if (errors) throw new Error(errors);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['storageLocations'] });
    },
  });
};
