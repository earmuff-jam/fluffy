import { NoteType } from '@features/notes/types';
import { useTour } from '@reactour/tour';
import DEFAULT_TOUR_STEPS, { DEFAULT_STEP_MAPPER } from '@utils/TourSteps';

/**
 * Takes array of notes and transforms them into objects categorized by the date and time
 *
 * Recently Edited - Up to the last week
 * Edited within last week - Up to the previous week
 * Edited couple of months ago - everything else
 *
 * Color Primary is used for Recently Edited
 * Color Secondary is used for Edited within last week
 * Color Default is used for Edit couple of month ago
 *
 */
export const categorizeNotes = (notes: Array<NoteType>): Array<NoteType> => {
  const currentTime = new Date().getTime();

  const categorizedNotes = notes.reduce((acc, item) => {
    const updatedTime = new Date(item.updated_at).getTime();
    const differenceInDays = Math.floor((currentTime - updatedTime) / (1000 * 3600 * 24));

    let category: string;
    let color: string;

    if (differenceInDays <= 7) {
      category = 'Recently Edited';
      color = 'primary';
    } else if (differenceInDays <= 14) {
      category = 'Edited within last week';
      color = 'secondary';
    } else {
      category = 'Edited couple of months ago';
      color = 'default';
    }

    if (!acc[category]) {
      acc[category] = {
        id: item.noteID,
        category: category,
        totalNotes: 0,
        color: color,
        details: [],
      };
    }

    acc[category].details.push({
      id: acc[category].details.length + 1,
      ...item,
    });

    acc[category].totalNotes++;
    return acc;
  }, {});

  return Object.values(categorizedNotes);
};

/**
 * Function used to pluralize the selected word. If the word does not exist, it will
 * ignore the word. Eg, ('Dog', 2) -> 2 dogs, ('', 2) -> 2
 */
export const pluralizeWord = (stringToEdit: string = '', size: number): string => {
  if (!stringToEdit) {
    return `${size}`;
  }
  if (size <= 1) {
    return `${size} ${stringToEdit}`;
  } else {
    return `${size} ${stringToEdit}s`;
  }
};

/**
 * capitalizeFirstLetter function
 *
 * used to capitalize the first letter of passed in string
 */
export const capitalizeFirstLetter = (value: string): string => {
  return value.charAt(0).toUpperCase() + value.slice(1);
};

// setTour function is used to setup tour in the application.
// helps users with the usage of the app.
export const setTour = (id: string, uri: string) => {
  const { setIsOpen, setCurrentStep, setSteps } = useTour();

  // let uri = location.pathname;
  if (id && uri.includes('/category/')) {
    uri = '/category/id';
  }
  if (id && uri.includes('/plan/')) {
    uri = '/plan/id';
  }

  const currentStep = DEFAULT_STEP_MAPPER[uri];
  const formattedSteps = DEFAULT_TOUR_STEPS.slice(currentStep.start, currentStep.end);
  setIsOpen(true);
  setCurrentStep(0);
  setSteps(formattedSteps);
};
