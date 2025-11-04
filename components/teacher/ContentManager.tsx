


import React, { useState } from 'react';
import { Card } from '../student/common/Card';
import { Button } from '../student/common/Button';
import { Lesson, Assignment } from '../../types';
import AddLessonModal from './AddLessonModal';
import AddAssignmentModal from './AddAssignmentModal';
import { useData } from '../../App';

const ContentManager: React.FC = () => {
    const { lessons, assignments, addLesson, updateLesson, addAssignment, updateAssignment, timetableIntensive, timetableFull } = useData();
    const [isLessonModalOpen, setIsLessonModalOpen] = useState(false);
    const [isAssignmentModalOpen, setIsAssignmentModalOpen] = useState(false);
    const [lessonToEdit, setLessonToEdit] = useState<Lesson | null>(null);
    const [assignmentToEdit, setAssignmentToEdit] = useState<{ assignment: Assignment; day: number } | null>(null);

    const handleSaveLesson = (lessonData: Omit<Lesson, 'id'> & { id?: string }) => {
        if (lessonData.id) {
            updateLesson(lessonData as Lesson);
        } else {
            addLesson(lessonData);
        }
        setIsLessonModalOpen(false);
    };

    const handleSaveAssignment = (assignmentData: Omit<Assignment, 'id'> & { id?: string }, day: number) => {
        if (assignmentData.id) {
            updateAssignment(assignmentData as Assignment, day);
        } else {
            addAssignment(assignmentData, day);
        }
        setIsAssignmentModalOpen(false);
        setAssignmentToEdit(null);
    };

    const handleAddNewLessonClick = () => {
        setLessonToEdit(null);
        setIsLessonModalOpen(true);
    };

    const handleEditLessonClick = (lesson: Lesson) => {
        setLessonToEdit(lesson);
        setIsLessonModalOpen(true);
    };
    
    const handleCloseLessonModal = () => {
        setIsLessonModalOpen(false);
        setLessonToEdit(null);
    };

    const handleAddNewAssignmentClick = () => {
        setAssignmentToEdit(null);
        setIsAssignmentModalOpen(true);
    };
    
    const handleEditAssignmentClick = (assignment: Assignment) => {
        const entry = timetableIntensive.find(e => e.assignmentIds.includes(assignment.id)) || timetableFull.find(e => e.assignmentIds.includes(assignment.id));
        const day = entry ? entry.day : 1; // Default to day 1 if not found in schedule
        setAssignmentToEdit({ assignment, day });
        setIsAssignmentModalOpen(true);
    };

    const handleCloseAssignmentModal = () => {
        setIsAssignmentModalOpen(false);
        setAssignmentToEdit(null);
    };

    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card title="Manage Lessons">
                    <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                        {lessons.map(lesson => (
                            <div key={lesson.id} className="p-3 bg-background rounded-md flex justify-between items-center">
                                <div>
                                    <p className="font-medium">{lesson.title}</p>
                                    <div className="flex items-center space-x-2 mt-1 text-xs">
                                        <span className="px-2 py-0.5 bg-primary/20 text-primary rounded-full">{lesson.subject}</span>
                                        <span className="px-2 py-0.5 bg-secondary/20 text-secondary rounded-full">{lesson.format}</span>
                                    </div>
                                </div>
                                <Button variant="secondary" className="text-sm py-1 px-2" onClick={() => handleEditLessonClick(lesson)}>Edit</Button>
                            </div>
                        ))}
                    </div>
                    <div className="mt-6">
                        <Button className="w-full" onClick={handleAddNewLessonClick}>Add New Lesson</Button>
                    </div>
                </Card>
                <Card title="Manage Assignments">
                    <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                        {assignments.map(assignment => (
                            <div key={assignment.id} className="p-3 bg-background rounded-md flex justify-between items-center">
                                 <div>
                                    <p className="font-medium">{assignment.title}</p>
                                    <div className="flex items-center space-x-2 mt-1 text-xs">
                                        <span className="px-2 py-0.5 bg-primary/20 text-primary rounded-full">{assignment.subject}</span>
                                        <span className="px-2 py-0.5 bg-secondary/20 text-secondary rounded-full">{assignment.type}</span>
                                    </div>
                                </div>
                                <Button variant="secondary" className="text-sm py-1 px-2" onClick={() => handleEditAssignmentClick(assignment)}>Edit</Button>
                            </div>
                        ))}
                    </div>
                    <div className="mt-6">
                        <Button className="w-full" onClick={handleAddNewAssignmentClick}>Add New Assignment</Button>
                    </div>
                </Card>
            </div>

            <AddLessonModal 
                isOpen={isLessonModalOpen}
                onClose={handleCloseLessonModal}
                onSave={handleSaveLesson}
                lessonToEdit={lessonToEdit}
            />

            <AddAssignmentModal 
                isOpen={isAssignmentModalOpen}
                onClose={handleCloseAssignmentModal}
                onSave={handleSaveAssignment}
                lessons={lessons}
                assignmentToEdit={assignmentToEdit?.assignment}
                initialDay={assignmentToEdit?.day}
            />
        </>
    );
}

export default ContentManager;
