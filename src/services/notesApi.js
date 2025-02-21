import { createApi } from '@reduxjs/toolkit/query/react';
import { generateClient } from 'aws-amplify/data';

const client = generateClient();

const customBaseQuery = async () => {
  try {
    const { data, errors } = await client.models.Notes.list();

    if (errors) {
      throw new Error(errors);
    }

    return { data };
  } catch (error) {
    return { error: error.message };
  }
};

export const notesApi = createApi({
  reducerPath: 'notesApi',
  baseQuery: customBaseQuery,
  endpoints: (builder) => ({
    fetchNotes: builder.query({
      query: () => 'notes',
    }),
  }),
});

export const { useFetchNotesQuery } = notesApi;