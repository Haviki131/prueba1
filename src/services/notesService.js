// This is the interface that our app uses.
// Currently it defaults to LocalStorageService, but can be switched to FirebaseService.

import * as LocalStorageService from './localStorageService';
import * as FirebaseService from './firebaseService';

// Change this to true when you have configured Firebase
const USE_REMOTE = true;

const Service = USE_REMOTE ? FirebaseService : LocalStorageService;

export const getNotes = async () => {
    return await Service.getNotes();
};

export const addNote = async (note) => {
    return await Service.addNote(note);
};

export const deleteNote = async (id) => {
    return await Service.deleteNote(id);
};
