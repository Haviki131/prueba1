import React, { useState, useEffect } from 'react';
import { Plus, Check, Trash2, Star, Heart } from 'lucide-react';
import sticker from '../assets/images/sticker.png';

const CATEGORIES = [
    { id: 'studies', label: 'Estudios', color: '#E1F5FE', icon: '📚' },
    { id: 'dates', label: 'Citas', color: '#FCE4EC', icon: '💑' },
    { id: 'selfcare', label: 'Self Care', color: '#E8F5E9', icon: '💅' },
    { id: 'other', label: 'Otros', color: '#FFF3E0', icon: '🎀' }
];

const Agenda = () => {
    const [tasks, setTasks] = useState(() => {
        try {
            const saved = localStorage.getItem('hk-tasks');
            const parsed = saved ? JSON.parse(saved) : [];
            return Array.isArray(parsed) ? parsed : [];
        } catch (e) {
            console.error("Error loading tasks:", e);
            return [];
        }
    });
    const [newTask, setNewTask] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('other');

    useEffect(() => {
        localStorage.setItem('hk-tasks', JSON.stringify(tasks));
    }, [tasks]);

    const addTask = (e) => {
        e.preventDefault();
        if (!newTask.trim()) return;
        setTasks([...tasks, {
            id: Date.now(),
            text: newTask,
            completed: false,
            category: selectedCategory,
            createdAt: new Date().toISOString()
        }]);
        setNewTask('');
    };

    const toggleTask = (id) => {
        setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter(t => t.id !== id));
    };

    const completionRate = tasks.length > 0
        ? Math.round((tasks.filter(t => t.completed).length / tasks.length) * 100)
        : 0;

    return (
        <div style={{ paddingBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                <h1 style={{ color: 'var(--hk-pink-hot)', margin: 0 }}>Mi Agenda</h1>
                <img src={sticker} alt="Hello Kitty" style={{ width: '120px', height: '120px', objectFit: 'contain', mixBlendMode: 'multiply' }} />
            </div>

            {/* Progress Bar */}
            <div style={{ marginBottom: '25px', backgroundColor: 'white', padding: '15px', borderRadius: 'var(--hk-radius)', boxShadow: 'var(--hk-shadow)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px', fontSize: '0.9rem', color: 'var(--hk-text)' }}>
                    <span>Progreso Diario</span>
                    <span style={{ fontWeight: 'bold', color: 'var(--hk-pink-hot)' }}>{completionRate}%</span>
                </div>
                <div style={{ width: '100%', height: '10px', backgroundColor: 'var(--hk-pink-light)', borderRadius: '5px', overflow: 'hidden' }}>
                    <div style={{
                        width: `${completionRate}%`,
                        height: '100%',
                        backgroundColor: 'var(--hk-pink-hot)',
                        transition: 'width 0.5s ease'
                    }} />
                </div>
                <p style={{ fontSize: '0.8rem', marginTop: '5px', color: '#888', textAlign: 'center' }}>
                    {completionRate === 100 ? '¡Increíble! Eres la mejor 🌟' : '¡Tú puedes con todo! 💪'}
                </p>
            </div>

            <form onSubmit={addTask} style={{ marginBottom: '25px' }}>
                <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                    <input
                        type="text"
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                        placeholder="Nueva tarea..."
                        style={{
                            flex: 1,
                            padding: '12px',
                            borderRadius: 'var(--hk-radius)',
                            border: '2px solid var(--hk-pink-medium)',
                            fontSize: '1rem'
                        }}
                    />
                    <button type="submit" style={{
                        backgroundColor: 'var(--hk-pink-hot)',
                        color: 'white',
                        borderRadius: '50%',
                        width: '50px',
                        height: '50px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: 'var(--hk-shadow)'
                    }}>
                        <Plus />
                    </button>
                </div>

                {/* Category Selector */}
                <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '5px' }}>
                    {CATEGORIES.map(cat => (
                        <button
                            key={cat.id}
                            type="button"
                            onClick={() => setSelectedCategory(cat.id)}
                            style={{
                                padding: '5px 12px',
                                borderRadius: '15px',
                                backgroundColor: selectedCategory === cat.id ? 'var(--hk-pink-hot)' : 'white',
                                color: selectedCategory === cat.id ? 'white' : 'var(--hk-text)',
                                border: '1px solid var(--hk-pink-light)',
                                fontSize: '0.85rem',
                                whiteSpace: 'nowrap',
                                transition: 'all 0.2s'
                            }}
                        >
                            {cat.icon} {cat.label}
                        </button>
                    ))}
                </div>
            </form>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {tasks.map(task => {
                    const category = CATEGORIES.find(c => c.id === task.category) || CATEGORIES[3];
                    return (
                        <div key={task.id} style={{
                            backgroundColor: 'var(--hk-white)',
                            padding: '15px',
                            borderRadius: 'var(--hk-radius)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
                            opacity: task.completed ? 0.7 : 1,
                            borderLeft: `5px solid ${category.color.replace('light', 'hot')}` // Hacky color adjustment or just use pink
                        }}>
                            <button
                                onClick={() => toggleTask(task.id)}
                                style={{
                                    width: '24px',
                                    height: '24px',
                                    borderRadius: '50%',
                                    border: `2px solid ${task.completed ? 'var(--hk-pink-hot)' : 'var(--hk-pink-medium)'}`,
                                    backgroundColor: task.completed ? 'var(--hk-pink-hot)' : 'transparent',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'white'
                                }}
                            >
                                {task.completed && <Check size={14} />}
                            </button>

                            <div style={{ flex: 1 }}>
                                <span style={{
                                    display: 'block',
                                    textDecoration: task.completed ? 'line-through' : 'none',
                                    color: task.completed ? '#999' : 'var(--hk-text)'
                                }}>
                                    {task.text}
                                </span>
                                <span style={{ fontSize: '0.75rem', color: '#999', backgroundColor: category.color, padding: '2px 6px', borderRadius: '4px' }}>
                                    {category.icon} {category.label}
                                </span>
                            </div>

                            <button onClick={() => deleteTask(task.id)} style={{ color: '#ff9999' }}>
                                <Trash2 size={18} />
                            </button>
                        </div>
                    );
                })}
                {tasks.length === 0 && (
                    <div style={{ textAlign: 'center', marginTop: '40px', opacity: 0.6 }}>
                        <Heart size={40} color="var(--hk-pink-medium)" />
                        <p style={{ color: '#999', marginTop: '10px' }}>
                            No hay tareas pendientes.<br />¡A disfrutar del día! 🎀
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Agenda;
