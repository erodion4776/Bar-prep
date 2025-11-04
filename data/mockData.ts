import { User, Role, Plan, PlanType, Lesson, Assignment, TimetableEntry, Submission, Subject, LessonFormat, AssignmentType } from '../types';

export const MOCK_USERS: User[] = [
  { id: 'user-1', name: 'Alice Candidate', email: 'student@example.com', role: Role.STUDENT },
  { id: 'user-2', name: 'Cynthia Azor', email: 'teacher@example.com', role: Role.TEACHER },
  { id: 'user-3', name: 'Charlie Candidate', email: 'student2@example.com', role: Role.STUDENT, plan: PlanType.INTENSIVE },
];

const mentorshipFeatures = [
    'Daily study schedules (1, 3, & 6-month options)',
    'Upload & submit essays, MCQs, and MPTs on a schedule',
    'Receive marked PDF feedback & personalized improvements',
    'Receive recorded video explanations for selected essays',
    'Track your completion percentage and progress',
    'Book 1-on-1 sessions directly through Calendly',
    'Chat privately for guidance and assignment clarification',
    'Weekly motivation & rule memorization drills',
    'Optional live group study sessions & recall games',
];

export const MOCK_PLANS: Plan[] = [
    { 
        id: PlanType.ONE_SESSION, 
        name: 'One Session Overview', 
        duration: 1, 
        price: 100, 
        description: 'A one-time review of your bar exam plan and study roadmap (no feedback).',
        features: ['1-hour strategy call', 'Roadmap review', 'Q&A Session']
    },
    { 
        id: PlanType.CRASH_COURSE, 
        name: 'Crash Course', 
        duration: 30, 
        price: 1000, 
        description: 'For last-minute preppers needing an intense, structured final month.',
        features: mentorshipFeatures,
    },
    { 
        id: PlanType.INTENSIVE, 
        name: 'Intensive Plan', 
        duration: 90, 
        price: 1800, 
        description: 'A personalized 3-month plan with weekly feedback and strategy calls.',
        features: mentorshipFeatures,
    },
    { 
        id: PlanType.FULL, 
        name: 'Full Mentorship', 
        duration: 180, 
        price: 2900, 
        description: 'The complete 6-month mentorship experience for ultimate accountability.',
        features: mentorshipFeatures,
    },
];

export const MOCK_LESSONS: Lesson[] = [
    // Contracts
    { id: 'l-c1', subject: Subject.CONTRACTS, title: 'Formation of Contracts', format: LessonFormat.OUTLINE_LECTURE, contentType: 'video', content: 'https://picsum.photos/seed/lc1/800/450' },
    { id: 'l-c2', subject: Subject.CONTRACTS, title: 'Consideration Doctrine', format: LessonFormat.OUTLINE_LECTURE, contentType: 'pdf', content: 'consideration.pdf' },
    { id: 'l-c3', subject: Subject.CONTRACTS, title: 'MBE Practice: Contracts Set 1', format: LessonFormat.MBE_PRACTICE, contentType: 'text', content: '25 multiple-choice questions on contract formation and consideration.' },
    
    // Torts
    { id: 'l-t1', subject: Subject.TORTS, title: 'Introduction to Negligence', format: LessonFormat.OUTLINE_LECTURE, contentType: 'video', content: 'https://picsum.photos/seed/lt1/800/450' },
    { id: 'l-t2', subject: Subject.TORTS, title: 'Intentional Torts', format: LessonFormat.OUTLINE_LECTURE, contentType: 'text', content: 'A deep dive into assault, battery, and false imprisonment.' },
    { id: 'l-t3', subject: Subject.TORTS, title: 'MEE Essay Practice: Negligence', format: LessonFormat.ESSAY_PRACTICE, contentType: 'text', content: 'Analyze a fact pattern involving multiple parties and potential negligence claims.' },
    
    // Review
    { id: 'l-r1', subject: Subject.REVIEW_STRATEGY, title: 'Effective Study Schedules', format: LessonFormat.OUTLINE_LECTURE, contentType: 'video', content: 'https://picsum.photos/seed/lr1/800/450' },
    
    // MPT
    { id: 'l-mpt1', subject: Subject.BUSINESS_ASSOCIATIONS, title: 'MPT: Franklin v. Baxter', format: LessonFormat.MPT_PRACTICE, contentType: 'pdf', content: 'mpt_task_memo.pdf' },
    { id: 'l-v1', subject: Subject.TORTS, title: 'Video Explanation for Negligence Essay', format: LessonFormat.VIDEO_EXPLANATION, contentType: 'video', content: 'https://picsum.photos/seed/lv1/800/450' },

];

export const MOCK_ASSIGNMENTS: Assignment[] = [
    { id: 'a-c1', lessonId: 'l-c3', subject: Subject.CONTRACTS, title: 'Submit MBE Answers: Contracts Set 1', type: AssignmentType.TIMED_QUIZ, description: 'Complete the 25-question quiz under timed conditions (45 minutes).' },
    { id: 'a-t1', lessonId: 'l-t3', subject: Subject.TORTS, title: 'Submit MEE Essay: Negligence', type: AssignmentType.ESSAY, description: 'Write a full MEE-style essay based on the provided fact pattern.' },
    { id: 'a-mpt1', lessonId: 'l-mpt1', subject: Subject.BUSINESS_ASSOCIATIONS, title: 'Submit MPT: Franklin v. Baxter', type: AssignmentType.DOCUMENT_UPLOAD, description: 'Draft a persuasive brief based on the case file and library, and upload as a PDF.' },
    { id: 'a-r1', lessonId: 'l-r1', subject: Subject.REVIEW_STRATEGY, title: 'My Weekly Study Plan', type: AssignmentType.REFLECTIVE_JOURNAL, description: 'Submit a short journal entry outlining your study plan for the upcoming week.' },

];

// Timetable for Crash Course (1 Month)
export const MOCK_TIMETABLE_CRASH: TimetableEntry[] = [
    { day: 1, lessonIds: ['l-r1'], assignmentIds: ['a-r1'] },
    { day: 3, lessonIds: ['l-c1', 'l-c2'], assignmentIds: [] },
    { day: 5, lessonIds: ['l-c3'], assignmentIds: ['a-c1'] },
    { day: 10, lessonIds: ['l-t1', 'l-t2'], assignmentIds: [] },
    { day: 12, lessonIds: ['l-t3'], assignmentIds: ['a-t1'] },
    { day: 25, lessonIds: ['l-mpt1'], assignmentIds: ['a-mpt1'] },
];

// Timetable for Intensive Plan (3 Months) - High-Yield & Intensive
export const MOCK_TIMETABLE_INTENSIVE: TimetableEntry[] = [
    { day: 1, lessonIds: ['l-c1', 'l-c2'], assignmentIds: [] },
    { day: 2, lessonIds: ['l-c3'], assignmentIds: ['a-c1'] },
    { day: 14, lessonIds: ['l-t1', 'l-t2'], assignmentIds: [] },
    { day: 15, lessonIds: ['l-t3'], assignmentIds: ['a-t1'] },
    { day: 16, lessonIds: ['l-v1'], assignmentIds: []},
    { day: 45, lessonIds: ['l-mpt1'], assignmentIds: ['a-mpt1'] },
];

// Timetable for Full Mentorship (6 Months) - Foundational & Deep Dive
export const MOCK_TIMETABLE_FULL: TimetableEntry[] = [
    { day: 1, lessonIds: ['l-r1'], assignmentIds: ['a-r1'] },
    { day: 7, lessonIds: ['l-c1'], assignmentIds: [] },
    { day: 9, lessonIds: ['l-c2'], assignmentIds: [] },
    { day: 14, lessonIds: ['l-c3'], assignmentIds: ['a-c1'] },
    { day: 30, lessonIds: ['l-t1'], assignmentIds: [] },
    { day: 32, lessonIds: ['l-t2'], assignmentIds: [] },
    { day: 35, lessonIds: ['l-t3'], assignmentIds: ['a-t1'] },
    { day: 37, lessonIds: ['l-v1'], assignmentIds: []},
    { day: 90, lessonIds: ['l-mpt1'], assignmentIds: ['a-mpt1'] },
];


export const MOCK_SUBMISSIONS: Submission[] = [
    { 
        id: 's-1', 
        assignmentId: 'a-t1', 
        studentId: 'user-1', 
        submittedAt: new Date('2023-10-26T10:00:00Z'), 
        content: 'Here is my essay on negligence. I spotted the issues of duty, breach, causation, and damages...', 
        status: 'graded',
        feedback: {
            id: 'f-1',
            submissionId: 's-1',
            teacherId: 'user-2',
            grade: 'B+',
            comments: 'Good issue spotting. Work on structuring your analysis with IRAC more clearly for each point.',
            gradedAt: new Date('2023-10-27T14:00:00Z'),
        }
    },
    { 
        id: 's-2', 
        assignmentId: 'a-c1', 
        studentId: 'user-3', 
        submittedAt: new Date('2023-11-15T12:30:00Z'), 
        content: 'Completed the quiz. Score: 20/25', 
        status: 'submitted' 
    },
    { 
        id: 's-3', 
        assignmentId: 'a-mpt1', 
        studentId: 'user-3', 
        submittedAt: new Date('2023-11-20T09:00:00Z'), 
        content: 'Attached is my persuasive brief for the MPT.', 
        fileName: 'MPT_Franklin_Brief_CS.pdf',
        status: 'submitted' 
    },
];