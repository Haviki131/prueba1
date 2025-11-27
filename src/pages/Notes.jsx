import React, { useState, useEffect } from 'react';
import { Plus, X } from 'lucide-react';
import { getNotes, addNote, deleteNote } from '../services/notesService';
import heart from '../assets/images/heart.png';

const Notes = () => {
    const [notes, setNotes] = useState([]);
    const [isAdding, setIsAdding] = useState(false);
    const [newNoteText, setNewNoteText] = useState('');

    useEffect(() => {
        loadNotes();
    }, []);

    const loadNotes = async () => {
        const loadedNotes = await getNotes();
        if (loadedNotes.length === 0) {
            // Default notes if empty
            setNotes([
                { id: 1, text: "Te quiero mucho ❤️", color: "#FFEFF3" },
                { id: 2, text: "Eres lo mejor que me ha pasado", color: "#FFFDE7" }
            ]);
        } else {
            setNotes(loadedNotes);
        }
    };

    const handleAddNote = async () => {
        if (!newNoteText.trim()) return;
        const colors = ["#FFEFF3", "#FFFDE7", "#E0F7FA", "#F3E5F5"];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];

        const newNote = {
            id: Date.now(),
            text: newNoteText,
            color: randomColor
        };

        await addNote(newNote);
        await loadNotes(); // Reload to ensure sync
        setNewNoteText('');
        setIsAdding(false);
    };

    const handleDeleteNote = async (id) => {
        await deleteNote(id);
        await loadNotes();
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <h1 style={{ color: 'var(--hk-pink-hot)', margin: 0 }}>Notas de Amor</h1>
                    <img src={heart} alt="Heart" style={{ width: '60px', mixBlendMode: 'multiply' }} />
                </div>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
                gap: '15px'
            }}>
                {notes.map(note => (
                    <div key={note.id} style={{
                        backgroundColor: note.color,
                        padding: '20px',
                        borderRadius: 'var(--hk-radius)',
                        boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
                        position: 'relative',
                        minHeight: '150px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center',
                        animation: 'float 6s ease-in-out infinite'
                    }}>
                        <p style={{ fontFamily: 'cursive', fontSize: '1.1rem', color: '#555' }}>
                            {note.text}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Notes;
