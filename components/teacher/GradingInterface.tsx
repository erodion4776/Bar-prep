
import React, { useState, useMemo } from 'react';
import { Submission, User, Assignment, AssignmentType } from '../../types';
import { Card } from '../student/common/Card';
import { Button } from '../student/common/Button';
import { useData } from '../../App';

interface SubmissionDetailModalProps {
    submission: Submission;
    onClose: () => void;
    onSaveFeedback: (submissionId: string, grade: string, comments: string) => void;
}

const SubmissionDetailModal: React.FC<SubmissionDetailModalProps> = ({ submission, onClose, onSaveFeedback }) => {
    const { users, assignments } = useData();
    const student = users.find(u => u.id === submission.studentId);
    const assignment = assignments.find(a => a.id === submission.assignmentId);

    const [grade, setGrade] = useState(submission.feedback?.grade || '');
    const [comments, setComments] = useState(submission.feedback?.comments || '');

    const handleSave = () => {
        onSaveFeedback(submission.id, grade, comments);
        onClose();
    }
    
    if (!student || !assignment) {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <Card title="Error">
                    <p>Could not load submission details. The associated student or assignment may have been deleted.</p>
                    <div className="mt-4 text-right">
                        <Button onClick={onClose} variant="secondary">Close</Button>
                    </div>
                </Card>
            </div>
        )
    }

    const renderSubmissionContent = () => {
        if (assignment.type === AssignmentType.DOCUMENT_UPLOAD && submission.fileName) {
            return (
                 <div className="bg-background p-4 rounded-md">
                    <h5 className="font-semibold mb-2">Submission Content</h5>
                    <div className="flex items-center space-x-3">
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-on-surface-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <a href={submission.content} download={submission.fileName} className="text-primary hover:underline font-medium">{submission.fileName}</a>
                    </div>
                    <p className="text-on-surface-secondary whitespace-pre-wrap mt-2 text-sm italic">Click the link above to download the submitted file.</p>
                </div>
            )
        }
        
        return (
            <div className="bg-background p-4 rounded-md">
                <h5 className="font-semibold mb-2">Submission Content</h5>
                <p className="text-on-surface-secondary whitespace-pre-wrap">{submission.content}</p>
            </div>
        )
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <Card className="max-w-3xl w-full max-h-[90vh] flex flex-col" title={`Grading: ${assignment.title}`}>
                <div className="overflow-y-auto flex-grow p-6 space-y-6">
                    <div>
                        <h4 className="font-semibold">Student: {student.name}</h4>
                        <p className="text-sm text-on-surface-secondary">Submitted on: {new Date(submission.submittedAt).toLocaleString()}</p>
                        <p className="text-xs text-on-surface-secondary bg-surface px-2 py-0.5 rounded-full inline-block mt-1">{assignment.type}</p>
                    </div>
                    
                    {renderSubmissionContent()}
                    
                    <div className="space-y-4">
                        <div>
                             <label htmlFor="grade" className="block text-sm font-medium text-on-surface-secondary">Grade</label>
                             <input type="text" id="grade" value={grade} onChange={e => setGrade(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-surface border border-on-surface/20 rounded-md shadow-sm text-on-surface focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"/>
                        </div>
                        <div>
                             <label htmlFor="comments" className="block text-sm font-medium text-on-surface-secondary">Feedback / Comments</label>
                             <textarea id="comments" value={comments} onChange={e => setComments(e.target.value)} rows={5} className="mt-1 block w-full px-3 py-2 bg-surface border border-on-surface/20 rounded-md shadow-sm text-on-surface focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"></textarea>
                        </div>
                    </div>
                </div>
                <div className="p-4 border-t border-on-surface/10 flex justify-end space-x-2">
                    <Button onClick={onClose} variant="secondary">Cancel</Button>
                    <Button onClick={handleSave}>Save Feedback</Button>
                </div>
            </Card>
        </div>
    );
};


const GradingInterface: React.FC = () => {
    const { users, assignments, submissions, saveFeedback } = useData();
    const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
    const [filter, setFilter] = useState<'all' | 'pending' | 'graded'>('pending');

    const filteredSubmissions = useMemo(() => {
        if (filter === 'pending') {
            return submissions.filter(s => s.status === 'submitted');
        }
        if (filter === 'graded') {
            return submissions.filter(s => s.status === 'graded');
        }
        return submissions;
    }, [submissions, filter]);

    return (
        <Card title="Assignment Inbox">
             <div className="mb-4">
                <div className="flex space-x-1 p-1 bg-background rounded-lg max-w-xs">
                    {(['pending', 'graded', 'all'] as const).map(f => (
                         <button key={f} onClick={() => setFilter(f)} className={`w-full px-3 py-1 text-sm font-medium rounded-md capitalize transition-colors ${filter === f ? 'bg-primary text-background-contrast shadow' : 'text-on-surface-secondary hover:bg-surface'}`}>
                            {f}
                         </button>
                    ))}
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-on-surface/10">
                    <thead className="bg-surface">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-on-surface-secondary uppercase tracking-wider">Student</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-on-surface-secondary uppercase tracking-wider">Assignment</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-on-surface-secondary uppercase tracking-wider">Submitted</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-on-surface-secondary uppercase tracking-wider">Status</th>
                            <th className="relative px-6 py-3"><span className="sr-only">Grade</span></th>
                        </tr>
                    </thead>
                    <tbody className="bg-surface divide-y divide-on-surface/10">
                        {filteredSubmissions.map(submission => {
                            const student = users.find(u => u.id === submission.studentId);
                            const assignment = assignments.find(a => a.id === submission.assignmentId);
                            return (
                                <tr key={submission.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-on-surface">{student?.name || 'Unknown Student'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-on-surface-secondary">{assignment?.title || 'Unknown Assignment'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-on-surface-secondary">{new Date(submission.submittedAt).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${submission.status === 'graded' ? 'bg-green-500 text-white' : 'bg-yellow-500 text-background-contrast'}`}>
                                            {submission.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <Button onClick={() => setSelectedSubmission(submission)} variant="secondary" className="py-1 px-3 text-sm">
                                            {submission.status === 'graded' ? 'View' : 'Grade'}
                                        </Button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            {selectedSubmission && <SubmissionDetailModal submission={selectedSubmission} onClose={() => setSelectedSubmission(null)} onSaveFeedback={saveFeedback} />}
        </Card>
    );
};

export default GradingInterface;
