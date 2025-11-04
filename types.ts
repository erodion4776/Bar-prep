export enum Role {
  STUDENT = 'STUDENT',
  TEACHER = 'TEACHER',
}

export enum PlanType {
    ONE_SESSION = 'ONE_SESSION',
    CRASH_COURSE = 'CRASH_COURSE', // 1 month
    INTENSIVE = 'INTENSIVE',     // 3 months
    FULL = 'FULL',               // 6 months
}

export enum Subject {
    // MBE
    CIVIL_PROCEDURE = 'Civil Procedure',
    CONSTITUTIONAL_LAW = 'Constitutional Law',
    CONTRACTS = 'Contracts',
    CRIMINAL_LAW_PROCEDURE = 'Criminal Law & Procedure',
    EVIDENCE = 'Evidence',
    REAL_PROPERTY = 'Real Property',
    TORTS = 'Torts',
    // MEE/MPT
    BUSINESS_ASSOCIATIONS = 'Business Associations',
    FAMILY_LAW = 'Family Law',
    TRUSTS_ESTATES = 'Trusts & Estates',
    SECURED_TRANSACTIONS = 'Secured Transactions',
    CONFLICT_OF_LAWS = 'Conflict of Laws',
    // Other
    STATE_SPECIFIC = 'State-Specific Law',
    REVIEW_STRATEGY = 'Review & Strategy',
}

export enum LessonFormat {
    OUTLINE_LECTURE = 'Outline/Lecture',
    MBE_PRACTICE = 'MBE Practice',
    ESSAY_PRACTICE = 'Essay Practice (MEE)',
    MPT_PRACTICE = 'Performance Test (MPT)',
    VIDEO_EXPLANATION = 'Video Explanation',
}

export enum AssignmentType {
    SHORT_ANSWER = 'Short Answer Q&A',
    TIMED_QUIZ = 'Timed Quiz (MBE)',
    ESSAY = 'Essay (MEE)',
    DOCUMENT_UPLOAD = 'Document Upload (MPT)',
    REFLECTIVE_JOURNAL = 'Reflective Journal'
}


export interface Plan {
    id: PlanType;
    name: string;
    duration: number; // in days
    price: number;
    description: string;
    features?: string[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  plan?: PlanType;
}

export interface Lesson {
    id: string;
    title: string;
    subject: Subject;
    format: LessonFormat;
    content: string; // Could be markdown, html, a link to a video, or base64
    contentType: 'text' | 'video' | 'pdf';
    fileName?: string;
}

export interface Assignment {
    id: string;
    lessonId: string;
    title: string;
    subject: Subject;
    type: AssignmentType;
    description: string;
}

export interface TimetableEntry {
    day: number;
    lessonIds: string[];
    assignmentIds: string[];
}

export interface Submission {
    id: string;
    assignmentId: string;
    studentId: string;
    submittedAt: Date;
    content: string; // could be text or a file URL
    fileName?: string;
    status: 'submitted' | 'graded';
    feedback?: Feedback;
}

export interface Feedback {
    id: string;
    submissionId: string;
    teacherId: string;
    grade: string;
    comments: string;
    gradedAt: Date;
}