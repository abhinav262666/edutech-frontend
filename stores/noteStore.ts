import { create } from 'zustand';
import { Note } from '@/types';

interface NoteState {
  currentNote: Note | null;
  isEditing: boolean;
  isSaving: boolean;
  lastSaved: Date | null;

  setCurrentNote: (note: Note | null) => void;
  setEditing: (editing: boolean) => void;
  setSaving: (saving: boolean) => void;
  updateNoteContent: (content: string) => void;
  markSaved: () => void;
}

export const useNoteStore = create<NoteState>((set) => ({
  currentNote: null,
  isEditing: false,
  isSaving: false,
  lastSaved: null,

  setCurrentNote: (note) => set({ currentNote: note }),

  setEditing: (editing) => set({ isEditing: editing }),

  setSaving: (saving) => set({ isSaving: saving }),

  updateNoteContent: (content) =>
    set((state) => ({
      currentNote: state.currentNote
        ? { ...state.currentNote, content }
        : null,
    })),

  markSaved: () => set({ lastSaved: new Date(), isSaving: false }),
}));
