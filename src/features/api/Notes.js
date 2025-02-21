// Notes Api File
import { generateClient } from 'aws-amplify/data';

const client = generateClient();

export const fetchNotes = async () => {
  const { data, errors } = await client.models.Notes.list();
  return { data, errors };
};

export const createNote = async (note) => {
  const { data, errors } = await client.models.Notes.create(note);
  return { data, errors };
};
