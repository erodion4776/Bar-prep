


import React, { useState, useEffect } from 'react';
import { Card } from '../student/common/Card';
import { Button } from '../student/common/Button';
import { Assignment, Lesson, Subject, AssignmentType } from '../../types';

interface AddAssignmentModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (assignment: Omit<Assignment, 'id'> & { id?: string }, day: number) => void;
    lessons: Lesson[];
    assignmentToEdit?: Assignment | null;
    initialDay?: number;
}

const AddAssignmentModal: React.FC<AddAssignmentModalProps> = ({ isOpen, onClose, onSave, lessons, assignmentToEdit, initialDay }) => {
    const [title, setTitle] = useState('');
    const [lessonId, setLessonId] = useState('');
    const [subject, setSubject] = useState<Subject>(Subject.CONTRACTS);
    const [type, setType] = useState<AssignmentType>(AssignmentType.ESSAY);
    const [description, setDescription] = useState('');
    const [day, setDay] = useState(1);

    useEffect(() => {
        if (isOpen) {
            if (assignmentToEdit) {
                // Populate form for editing
                setTitle(assignmentToEdit.title);
                setLessonId(assignmentToEdit.lessonId);
                setSubject(assignmentToEdit.subject);
                setType(assignmentToEdit.type);
                setDescription(assignmentToEdit.description);
                setDay(initialDay || 1);
            } else {
                // Reset form for adding
                const firstLesson = lessons[0];
                if (firstLesson) {
                    setLessonId(firstLesson.id);
                } else {
                    setLessonId('');
                }
                setTitle('');
                setType(AssignmentType.ESSAY);
                setDescription('');
                setDay(1);
            }
        }
    }, [isOpen, assignmentToEdit, initialDay, lessons]);

    useEffect(() => {
        const selectedLesson = lessons.find(l => l.id === lessonId);
        if (selectedLesson) {
            setSubject(selectedLesson.subject);
        }
    }, [lessonId, lessons]);

    const handleSave = () => {
        if (!title || !lessonId || !description) {
            alert('Please fill out all fields.');
            return;
        }
        onSave({
            id: assignmentToEdit?.id,
            title,
            lessonId,
            subject,
            type,
            description,
        }, day);
    };
    
    if (!isOpen) return null;

    const modalTitle = assignmentToEdit ? 'Edit Assignment' : 'Add New Assignment';
    const saveButtonText = assignmentToEdit ? 'Update Assignment' : 'Save Assignment';

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <Card className="max-w-xl w-full" title={modalTitle}>
                <div className="space-y-4">
                    <div>
                        <label htmlFor="assignmentTitle" className="block text-sm font-medium text-on-surface-secondary">Assignment Title</label>
                        <input type="text" id="assignmentTitle" value={title} onChange={e => setTitle(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-surface border border-on-surface/20 rounded-md shadow-sm text-on-surface focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                         <div>
                            <label htmlFor="linkedLesson" className="block text-sm font-medium text-on-surface-secondary">Linked Lesson</label>
                            <select id="linkedLesson" value={lessonId} onChange={e => setLessonId(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-surface border border-on-surface/20 rounded-md shadow-sm text-on-surface focus:outline-none focus:ring-primary focus:border-primary sm:text-sm">
                                <option value="" disabled>Select a lesson</option>
                                {lessons.map(l => <option key={l.id} value={l.id}>{l.title}</option>)}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="dayNumber" className="block text-sm font-medium text-on-surface-secondary">Day Number</label>
                            <input type="number" id="dayNumber" value={day} onChange={e => setDay(parseInt(e.target.value, 10) || 1)} min="1" className="mt-1 block w-full px-3 py-2 bg-surface border border-on-surface/20 rounded-md shadow-sm text-on-surface focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
                        </div>
                    </div>


                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="assignmentSubject" className="block text-sm font-medium text-on-surface-secondary">Subject (auto-syncs)</label>
                            <select id="assignmentSubject" value={subject} onChange={e => setSubject(e.target.value as Subject)} className="mt-1 block w-full px-3 py-2 bg-surface opacity-70 cursor-not-allowed border border-on-surface/20 rounded-md shadow-sm text-on-surface focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" disabled>
                                {Object.values(Subject).map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="assignmentType" className="block text-sm font-medium text-on-surface-secondary">Type</label>
                            <select id="assignmentType" value={type} onChange={e => setType(e.target.value as AssignmentType)} className="mt-1 block w-full px-3 py-2 bg-surface border border-on-surface/20 rounded-md shadow-sm text-on-surface focus:outline-none focus:ring-primary focus:border-primary sm:text-sm">
                                {Object.values(AssignmentType).map(t => <option key={t} value={t}>{t}</option>)}
                            </select>
                        </div>
                    </div>
                     <div>
                        <label htmlFor="assignmentDescription" className="block text-sm font-medium text-on-surface-secondary">Description</label>
                        <textarea id="assignmentDescription" value={description} onChange={e => setDescription(e.target.value)} rows={4} className="mt-1 block w-full px-3 py-2 bg-surface border border-on-surface/20 rounded-md shadow-sm text-on-surface focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" placeholder="Instructions for the student..."></textarea>
                    </div>
                </div>
                 <div className="p-4 mt-4 -m-6 bg-background rounded-b-lg flex justify-end space-x-2">
                    <Button onClick={onClose} variant="secondary">Cancel</Button>
                    <Button onClick={handleSave}>{saveButtonText}</Button>
                </div>
            </Card>
        </div>
    );
};

export default AddAssignmentModal;
