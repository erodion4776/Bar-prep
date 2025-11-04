

import React, { useState } from 'react';
import { TimetableEntry, Lesson, Assignment, AssignmentType, Submission } from '../../types';
import { Card } from './common/Card';
import { Button } from './common/Button';
import { useAuth, useData } from '../../App';

interface DayDetailModalProps {
    day: number;
    entry: TimetableEntry | undefined;
    onClose: () => void;
}

interface AssignmentCardProps {
    assignment: Assignment;
}

const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });
};


const AssignmentCard: React.FC<AssignmentCardProps> = ({ assignment }) => {
    const { user } = useAuth();
    const { submissions, addSubmission } = useData();
    const [textSubmission, setTextSubmission] = useState('');
    const [file, setFile] = useState<File | null>(null);

    if (!user) return null;

    const submission = submissions.find(s => s.assignmentId === assignment.id && s.studentId === user.id);

    const handleSubmitText = () => {
        if (!textSubmission.trim()) {
            alert('Please enter your submission.');
            return;
        }
        addSubmission({
            assignmentId: assignment.id,
            studentId: user.id,
            content: textSubmission,
        });
        setTextSubmission('');
    };

    const handleSubmitFile = async () => {
        if (!file) {
            alert('Please select a file.');
            return;
        }
        try {
            const fileContent = await fileToBase64(file);
            addSubmission({
                assignmentId: assignment.id,
                studentId: user.id,
                content: fileContent,
                fileName: file.name,
            });
            setFile(null);
        } catch (error) {
            console.error("Error processing file:", error);
            alert("Could not process file. Please try again.");
        }
    };


    const renderSubmissionForm = () => {
        if (submission) return null; // Don't show form if already submitted

        switch (assignment.type) {
            case AssignmentType.ESSAY:
            case AssignmentType.SHORT_ANSWER:
            case AssignmentType.REFLECTIVE_JOURNAL:
                return (
                    <div className="mt-4">
                        <textarea 
                            rows={5}
                            className="w-full p-2 bg-surface border border-on-surface/20 rounded-md text-on-surface focus:ring-primary focus:border-primary"
                            placeholder="Type your response here..."
                            value={textSubmission}
                            onChange={(e) => setTextSubmission(e.target.value)}
                        />
                        <Button className="mt-2 text-sm py-1" onClick={handleSubmitText}>Submit</Button>
                    </div>
                );
            case AssignmentType.DOCUMENT_UPLOAD:
                return (
                    <div className="mt-4">
                        <label htmlFor={`file-upload-${assignment.id}`} className="cursor-pointer inline-flex items-center px-3 py-2 border border-on-surface/20 shadow-sm text-sm leading-4 font-medium rounded-md text-on-surface bg-surface hover:bg-on-surface/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                            </svg>
                            Upload Assignment File
                        </label>
                         <input 
                            id={`file-upload-${assignment.id}`} 
                            name={`file-upload-${assignment.id}`} 
                            type="file" 
                            className="sr-only" 
                            onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
                            accept=".pdf,.doc,.docx,.rtf"
                        />
                        <div className="mt-2 space-y-2">
                            {file && <p className="text-sm text-on-surface-secondary">Selected file: <span className="font-medium">{file.name}</span></p>}
                            <Button className="text-sm py-1" disabled={!file} onClick={handleSubmitFile}>Submit</Button>
                        </div>
                    </div>
                );
            case AssignmentType.TIMED_QUIZ:
                 return (
                    <div className="mt-4">
                        <p className="text-sm text-on-surface-secondary">{assignment.description}</p>
                        <Button className="mt-2 text-sm py-1" onClick={() => {
                            addSubmission({
                                assignmentId: assignment.id,
                                studentId: user.id,
                                content: 'Quiz successfully completed and submitted.',
                            });
                        }}>Start Quiz</Button>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <li className="p-3 bg-primary/10 rounded-md">
            <div className="flex justify-between items-start">
                <div>
                    <p className="font-semibold">{assignment.title}</p>
                    <p className="text-xs text-on-surface-secondary bg-surface px-2 py-0.5 rounded-full inline-block mt-1">{assignment.type}</p>
                </div>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full whitespace-nowrap ${submission ? 'bg-green-500 text-white' : 'bg-yellow-500 text-background-contrast'}`}>
                    {submission ? (submission.status === 'graded' ? 'Graded' : 'Submitted') : 'Pending'}
                </span>
            </div>
             {submission?.feedback && (
                <div className="mt-3 pt-3 border-t border-primary/20 text-sm">
                    <p><strong>Grade:</strong> {submission.feedback.grade}</p>
                    <p><strong>Feedback:</strong> {submission.feedback.comments}</p>
                </div>
            )}
            {submission && !submission.feedback && submission.status === 'submitted' && (
                 <div className="mt-3 pt-3 border-t border-primary/20 text-sm">
                    <p className="text-on-surface-secondary italic">Your submission is awaiting feedback.</p>
                </div>
            )}
            {renderSubmissionForm()}
        </li>
    );
};


const DayDetailModal: React.FC<DayDetailModalProps> = ({ day, entry, onClose }) => {
    const { user } = useAuth();
    const { lessons: allLessons, assignments: allAssignments } = useData();
    if (!user) return null;

    const lessons = (entry?.lessonIds ?? []).map(id => allLessons.find(l => l.id === id)).filter(Boolean) as Lesson[];
    const assignments = (entry?.assignmentIds ?? []).map(id => allAssignments.find(a => a.id === id)).filter(Boolean) as Assignment[];
    
    const renderLessonContent = (lesson: Lesson) => {
        switch (lesson.contentType) {
            case 'video':
                return (
                    <div className="aspect-video">
                        <iframe 
                            src={lesson.content}
                            className="w-full h-full rounded-lg"
                            title={lesson.title}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                );
            case 'pdf':
                if (lesson.content.startsWith('data:')) {
                     return (
                        <div className="flex items-center space-x-3 p-3 bg-background rounded-md">
                             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <a href={lesson.content} download={lesson.fileName || 'document.pdf'} className="text-primary hover:underline font-medium break-all">
                                {lesson.fileName || 'Download PDF'}
                            </a>
                        </div>
                     );
                }
                return <p className="text-sm text-on-surface-secondary italic">{lesson.content}</p>;
            case 'text':
            default:
                return <p className="text-sm text-on-surface-secondary whitespace-pre-wrap">{lesson.content}</p>;
        }
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <Card className="max-w-2xl w-full max-h-[90vh] flex flex-col" title={`Day ${day}`}>
                <div className="overflow-y-auto flex-grow p-6 space-y-6">
                    <div>
                        <h4 className="text-lg font-semibold mb-2 text-primary">Lessons</h4>
                        {lessons.length > 0 ? (
                            <ul className="space-y-3">
                                {lessons.map(lesson => (
                                    <li key={lesson.id} className="p-3 bg-background rounded-md">
                                        <p className="font-medium">{lesson.title}</p>
                                        <div className="flex items-center space-x-2 mt-1 text-xs">
                                            <span className="px-2 py-0.5 bg-primary/20 text-primary rounded-full">{lesson.subject}</span>
                                            <span className="px-2 py-0.5 bg-secondary/20 text-secondary rounded-full">{lesson.format}</span>
                                        </div>
                                         <div className="mt-3 pt-3 border-t border-on-surface/10">
                                            {renderLessonContent(lesson)}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : <p className="text-on-surface-secondary">No lessons for today.</p>}
                    </div>
                     <div>
                        <h4 className="text-lg font-semibold mb-2 text-secondary">Assignments</h4>
                        {assignments.length > 0 ? (
                            <ul className="space-y-3">
                                {assignments.map(assignment => <AssignmentCard key={assignment.id} assignment={assignment} />)}
                            </ul>
                        ) : <p className="text-on-surface-secondary">No assignments for today.</p>}
                    </div>
                </div>
                <div className="p-4 border-t border-on-surface/10 text-right">
                    <Button onClick={onClose} variant="secondary">Close</Button>
                </div>
            </Card>
        </div>
    );
};

interface DailyScheduleViewProps {
    timetable: TimetableEntry[];
    planDuration: number;
}

const DailyScheduleView: React.FC<DailyScheduleViewProps> = ({ timetable, planDuration }) => {
    const [selectedDay, setSelectedDay] = useState<number | null>(null);

    const handleDayClick = (day: number) => {
        setSelectedDay(day);
    };

    const handleCloseModal = () => {
        setSelectedDay(null);
    };
    
    const selectedEntry = timetable.find(entry => entry.day === selectedDay);

    return (
        <Card title="Your Daily Schedule">
            <div className="grid grid-cols-5 sm:grid-cols-7 md:grid-cols-10 gap-2">
                {Array.from({ length: planDuration }, (_, i) => i + 1).map(day => {
                    const entry = timetable.find(e => e.day === day);
                    const hasContent = entry && (entry.lessonIds.length > 0 || entry.assignmentIds.length > 0);
                    const isCompleted = day < 14; // Mock completed days

                    return (
                        <button
                            key={day}
                            onClick={() => handleDayClick(day)}
                            className={`h-12 w-12 flex items-center justify-center rounded-full font-semibold transition-transform transform hover:scale-110
                                ${hasContent ? 'bg-primary text-background-contrast' : 'bg-surface text-on-surface-secondary'}
                                ${isCompleted ? 'opacity-50' : ''}`}
                        >
                            {day}
                        </button>
                    );
                })}
            </div>
            {selectedDay !== null && <DayDetailModal day={selectedDay} entry={selectedEntry} onClose={handleCloseModal} />}
        </Card>
    );
};

export default DailyScheduleView;
