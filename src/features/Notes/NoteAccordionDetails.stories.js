import NoteAccordionDetails from '@features/Notes/NoteAccordionDetails';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export default {
  title: 'Note/NoteAccordionDetails',
  component: NoteAccordionDetails,
  tags: ['autodocs'],
};

const queryClient = new QueryClient();

const Template = (args) => (
  <QueryClientProvider client={queryClient}>
    <NoteAccordionDetails {...args} />
  </QueryClientProvider>
);

export const NoteAccordionDetailsDefault = Template.bind({});
export const NoteAccordionDetailsEmpty = Template.bind({});

NoteAccordionDetailsDefault.args = {
  details: [
    {
      noteID: '9be9dc52-7c8a-43da-b28e-ff17d88b6478',
      title: 'Buy kitty litter for four of my kittens',
      description: 'Do not buy the brand from walmart, buy from a generic well known place',
      status: 'draft',
      color: '#2a6dbc',
      location: {
        lat: 42.203217,
        lon: -72.625481,
      },
      createdAt: '2024-11-29T13:19:17.441061Z',
      createdBy: { id: '2024-11-29T13:19:16.748084Z', emailAddress: 'maryJane47@gmail.com' },
      updatedAt: '2024-11-29T13:19:17.441061Z',
      updatedBy: { id: '2024-11-29T13:19:16.748084Z', emailAddress: 'maryJane47@gmail.com' },
      collaborators: null,
    },
  ],
  setEditMode: () => {},
  setSelectedNoteID: () => {},
  setConfirmDelete: () => {},
  setDeleteID: () => {},
};

NoteAccordionDetailsEmpty.args = {
  details: [],
  setEditMode: () => {},
  setSelectedNoteID: () => {},
  setConfirmDelete: () => {},
  setDeleteID: () => {},
};
