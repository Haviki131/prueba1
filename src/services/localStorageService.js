export const getNotes = async () => {
    const saved = localStorage.getItem('hk-notes');
    return saved ? JSON.parse(saved) : [];
};

export const addNote = async (note) => {
    const notes = await getNotes();
    const newNotes = [...notes, note];
    localStorage.setItem('hk-notes', JSON.stringify(newNotes));
    return newNotes;
};

export const deleteNote = async (id) => {
    const notes = await getNotes();
    const newNotes = notes.filter(n => n.id !== id);
    localStorage.setItem('hk-notes', JSON.stringify(newNotes));
    return newNotes;
};
