


import React, { useState, useEffect } from 'react';
import { Card } from '../student/common/Card';
import { Button } from '../student/common/Button';
import { Lesson, Subject, LessonFormat } from '../../types';

interface AddLessonModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (lesson: Omit<Lesson, 'id'> & { id?: string }) => void;
    lessonToEdit?: Lesson | null;
}

const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });
};

const AddLessonModal: React.FC<AddLessonModalProps> = ({ isOpen, onClose, onSave, lessonToEdit }) => {
    const [title, setTitle] = useState('');
    const [subject, setSubject] = useState<Subject>(Subject.CONTRACTS);
    const [format, setFormat] = useState<LessonFormat>(LessonFormat.OUTLINE_LECTURE);
    const [contentType, setContentType] = useState<'text' | 'video' | 'pdf'>('text');
    const [content, setContent] = useState('');
    const [file, setFile] = useState<File | null>(null);

    useEffect(() => {
        if (isOpen) {
            if (lessonToEdit) {
                setTitle(lessonToEdit.title);
                setSubject(lessonToEdit.subject);
                setFormat(lessonToEdit.format);
                setContentType(lessonToEdit.contentType);
                setContent(lessonToEdit.content);
                setFile(null); // Reset file input; user must re-select to change file
            } else {
                // Reset form for "Add New"
                setTitle('');
                setSubject(Subject.CONTRACTS);
                setFormat(LessonFormat.OUTLINE_LECTURE);
                setContent('');
                setContentType('text');
                setFile(null);
            }
        }
    }, [isOpen, lessonToEdit]);

    const handleSave = async () => {
        if (!title) {
            alert('Please add a title.');
            return;
        }

        let finalContent = content;
        let finalFileName = lessonToEdit?.fileName;

        if (contentType === 'pdf') {
            if (file) { // New file selected, overrides everything
                try {
                    finalContent = await fileToBase64(file);
                    finalFileName = file.name;
                } catch (error) {
                    console.error("Error processing file:", error);
                    alert("Could not process file. Please try again.");
                    return;
                }
            } else if (!lessonToEdit || lessonToEdit.contentType !== 'pdf') {
                // This is a new PDF lesson, or user switched to PDF, but no file was chosen.
                alert('Please select a PDF file.');
                return;
            }
            // If we are here and file is null, it means we are editing an existing PDF and NOT changing the file.
            // `finalContent` and `finalFileName` are already correct from the initial state population.
        }
       
        if (contentType !== 'pdf' && !content) {
            alert('Please fill out the content field.');
            return;
        }

        const lessonData: Omit<Lesson, 'id'> & { id?: string } = {
            id: lessonToEdit?.id,
            title,
            subject,
            format,
            content: finalContent,
            contentType,
            fileName: contentType === 'pdf' ? finalFileName : undefined,
        };

        onSave(lessonData);
    };


    if (!isOpen) return null;

    const modalTitle = lessonToEdit ? 'Edit Lesson' : 'Add New Lesson';
    const saveButtonText = lessonToEdit ? 'Update Lesson' : 'Save Lesson';

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <Card className="max-w-xl w-full" title={modalTitle}>
                <div className="space-y-4">
                    <div>
                        <label htmlFor="lessonTitle" className="block text-sm font-medium text-on-surface-secondary">Lesson Title</label>
                        <input type="text" id="lessonTitle" value={title} onChange={e => setTitle(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-surface border border-on-surface/20 rounded-md shadow-sm text-on-surface focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="lessonSubject" className="block text-sm font-medium text-on-surface-secondary">Subject</label>
                            <select id="lessonSubject" value={subject} onChange={e => setSubject(e.target.value as Subject)} className="mt-1 block w-full px-3 py-2 bg-surface border border-on-surface/20 rounded-md shadow-sm text-on-surface focus:outline-none focus:ring-primary focus:border-primary sm:text-sm">
                                {Object.values(Subject).map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="lessonFormat" className="block text-sm font-medium text-on-surface-secondary">Format</label>
                            <select id="lessonFormat" value={format} onChange={e => setFormat(e.target.value as LessonFormat)} className="mt-1 block w-full px-3 py-2 bg-surface border border-on-surface/20 rounded-md shadow-sm text-on-surface focus:outline-none focus:ring-primary focus:border-primary sm:text-sm">
                                {Object.values(LessonFormat).map(f => <option key={f} value={f}>{f}</option>)}
                            </select>
                        </div>
                    </div>
                    
                    <div>
                        <label htmlFor="lessonContentType" className="block text-sm font-medium text-on-surface-secondary">Content Type</label>
                        <select id="lessonContentType" value={contentType} onChange={e => {
                            setContentType(e.target.value as 'text' | 'video' | 'pdf');
                            setContent('');
                            setFile(null);
                        }} className="mt-1 block w-full px-3 py-2 bg-surface border border-on-surface/20 rounded-md shadow-sm text-on-surface focus:outline-none focus:ring-primary focus:border-primary sm:text-sm">
                            <option value="text">Text / Markdown</option>
                            <option value="video">Video URL</option>
                            <option value="pdf">PDF Upload</option>
                        </select>
                    </div>

                    {contentType === 'text' && (
                        <div>
                            <label htmlFor="lessonContent" className="block text-sm font-medium text-on-surface-secondary">Content</label>
                            <textarea id="lessonContent" value={content} onChange={e => setContent(e.target.value)} rows={4} className="mt-1 block w-full px-3 py-2 bg-surface border border-on-surface/20 rounded-md shadow-sm text-on-surface focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" placeholder="Markdown, text, etc."></textarea>
                        </div>
                    )}
                    {contentType === 'video' && (
                        <div>
                            <label htmlFor="lessonContent" className="block text-sm font-medium text-on-surface-secondary">Video URL</label>
                            <input type="text" id="lessonContent" value={content} onChange={e => setContent(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-surface border border-on-surface/20 rounded-md shadow-sm text-on-surface focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" placeholder="https://www.youtube.com/embed/..." />
                        </div>
                    )}
                    {contentType === 'pdf' && (
                        <div>
                            <label className="block text-sm font-medium text-on-surface-secondary">PDF File</label>
                            {lessonToEdit && lessonToEdit.contentType === 'pdf' && !file && (
                                <p className="text-xs text-on-surface-secondary mt-1 mb-2">Current file: {lessonToEdit.fileName}. Upload a new file below to replace it.</p>
                            )}
                            <input type="file" id="lessonFile" onChange={e => setFile(e.target.files ? e.target.files[0] : null)} accept=".pdf" className="mt-1 block w-full text-sm text-on-surface-secondary file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-background-contrast hover:file:bg-primary/90" />
                            {file && <p className="mt-2 text-sm text-on-surface-secondary">Selected: {file.name}</p>}
                        </div>
                    )}
                </div>
                <div className="p-4 mt-4 -m-6 bg-background rounded-b-lg flex justify-end space-x-2">
                    <Button onClick={onClose} variant="secondary">Cancel</Button>
                    <Button onClick={handleSave}>{saveButtonText}</Button>
                </div>
            </Card>
        </div>
    );
};

export default AddLessonModal;
