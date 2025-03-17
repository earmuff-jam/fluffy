import NoteAccordionSummary from './NoteAccordionSummary';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export default {
  title: 'Note/NoteAccordionSummary',
  component: NoteAccordionSummary,
  tags: ['autodocs'],
};

const queryClient = new QueryClient();

const Template = (args) => (
  <QueryClientProvider client={queryClient}>
    <NoteAccordionSummary {...args} />
  </QueryClientProvider>
);

export const NoteAccordionSummaryDefault = Template.bind({});
export const NoteAccordionSummaryLastWeekCategory = Template.bind({});
export const NoteAccordionSummaryLastMonthAndBeyondCategory = Template.bind({});

NoteAccordionSummaryDefault.args = {
  title: 'Recently Edited',
  totalNotes: 1,
  color: 'primary',
};

NoteAccordionSummaryLastWeekCategory.args = {
  title: 'Edited within last week',
  totalNotes: 20,
  color: 'secondary',
};

NoteAccordionSummaryLastMonthAndBeyondCategory.args = {
  title: 'Edited couple of months ago',
  totalNotes: 122,
  color: 'default',
};
