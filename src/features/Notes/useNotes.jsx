import { useState, useEffect } from 'react';
import { createNote, fetchNotes } from '../api/Notes';

export const useFetchNotes = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    const loadNotes = async () => {
      try {
        const { data, errors } = await fetchNotes();
        if (errors) {
          setErrors(errors);
        } else {
          setNotes(data);
        }
      } catch (error) {
        setErrors(error);
      } finally {
        setLoading(false);
      }
    };

    loadNotes();
  }, []);

  return { notes, loading, errors };
};

export const useCreateNote = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    const createNote = async () => {
      try {
        const { data, errors } = await createNote();
        if (errors) {
          setErrors(errors);
        } else {
          setNote(data);
        }
      } catch (error) {
        setErrors(error);
      } finally {
        setLoading(false);
      }
    };

    createNote();
  }, []);

  return { note, loading, errors };
};
