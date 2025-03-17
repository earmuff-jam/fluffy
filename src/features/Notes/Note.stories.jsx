import Note from './Note';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export default {
  title: 'Note/Note',
  component: Note,
  tags: ['autodocs'],
};

const queryClient = new QueryClient();

const Template = (args) => (
  <QueryClientProvider client={queryClient}>
    <Note {...args} />
  </QueryClientProvider>
);

export const NoteDefault = Template.bind({});
export const NoteNoLocation = Template.bind({});
export const NoteEmpty = Template.bind({});
export const NoteLoading = Template.bind({});

NoteDefault.args = {
  notes: [
    {
      noteID: '9be9dc52-7c8a-43da-b28e-ff17d88b6478',
      title: 'Buy kitty litter for four of my kittens',
      description: 'Do not buy the brand from walmart, buy from a generic well known place',
      name: 'draft',
      color: '#2a6dbc',
      location: {
        lat: 42.203217,
        lon: -72.625481,
      },
      createdAt: '2024-11-29T13:19:16.748084Z',
      createdBy: { id: 'fa956520-fc6c-4783-acc6-4ba743fae9dc', emailAddress: 'john_doe47@gmail.com' },
      updatedAt: '2024-11-29T13:19:16.748084Z',
      updatedBy: { id: 'fa956520-fc6c-4783-acc6-4ba743fae9dc', emailAddress: 'john_doe47@gmail.com' },
      sharable_groups: null,
    },
  ],
  loading: false,
  setEditMode: () => {},
  setSelectedNoteID: () => {},
};

NoteNoLocation.args = {
  notes: [
    {
      noteID: '9be9dc52-7c8a-43da-b28e-ff17d88b6478',
      title: 'Buy kitty litter for four of my kittens',
      description: 'Do not buy the brand from walmart, buy from a generic well known place',
      name: 'draft',
      color: '#2a6dbc',
      location: {},
      createdAt: '2024-11-29T13:19:16.748084Z',
      createdBy: { id: 'fa956520-fc6c-4783-acc6-4ba743fae9dc', emailAddress: 'john_doe47@gmail.com' },
      updatedAt: '2024-11-29T13:19:16.748084Z',
      updatedBy: { id: 'fa956520-fc6c-4783-acc6-4ba743fae9dc', emailAddress: 'john_doe47@gmail.com' },
      sharable_groups: null,
    },
  ],
  loading: false,
  setEditMode: () => {},
  setSelectedNoteID: () => {},
};

NoteEmpty.args = {
  notes: [],
  loading: false,
  setEditMode: () => {},
  setSelectedNoteID: () => {},
};

NoteLoading.args = {
  notes: [],
  loading: true,
  setEditMode: () => {},
  setSelectedNoteID: () => {},
};
