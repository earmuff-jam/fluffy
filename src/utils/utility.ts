import { NoteType } from "@features/notes/types";

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
    const differenceInDays = Math.floor(
      (currentTime - updatedTime) / (1000 * 3600 * 24)
    );

    let category: string;
    let color: string;

    if (differenceInDays <= 7) {
      category = "Recently Edited";
      color = "primary";
    } else if (differenceInDays <= 14) {
      category = "Edited within last week";
      color = "secondary";
    } else {
      category = "Edited couple of months ago";
      color = "default";
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
