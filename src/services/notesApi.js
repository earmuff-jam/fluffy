import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { generateClient } from 'aws-amplify/data';

const client = generateClient();

export const useFetchNotes = () => {
  return useQuery({
    queryKey: ['notes'],
    queryFn: async () => {
      const response = await client.models.Notes.list();
      return response.data || [];
    },
  });
};

export const useCreateNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (note) => {
      if (!note) throw new Error('Note details is required for creation.');
      const { data, errors } = await client.models.Notes.create(note);
      if (errors) throw new Error(errors);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });
};

export const useUpdateNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (note) => {
      if (!note) throw new Error('Note details is required for update');
      const { data, errors } = await client.models.Notes.update(note);

      if (errors) throw new Error(errors);

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });
};

export const useRemoveNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => {
      if (!id) throw new Error('Note ID is required for deletion.');
      const { data, errors } = await client.models.Notes.delete({ id });
      if (errors) throw new Error(errors);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });
};
