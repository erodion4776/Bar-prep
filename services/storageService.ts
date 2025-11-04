import { Lesson, Assignment, Submission, TimetableEntry, User, Plan } from '../types';
import { MOCK_LESSONS, MOCK_ASSIGNMENTS, MOCK_SUBMISSIONS, MOCK_TIMETABLE_INTENSIVE, MOCK_TIMETABLE_FULL, MOCK_USERS, MOCK_PLANS, MOCK_TIMETABLE_CRASH } from '../data/mockData';

// This defines the structure of the entire application's data that we'll be storing.
export interface AppData {
    users: User[];
    plans: Plan[];
    lessons: Lesson[];
    assignments: Assignment[];
    submissions: Submission[];
    timetableCrash: TimetableEntry[];
    timetableIntensive: TimetableEntry[];
    timetableFull: TimetableEntry[];
}

// An interface defines the contract for our storage services.
// Any service, whether it's local storage or a remote API, must provide these methods.
interface IStorageService {
    getData(): Promise<AppData>;
    saveData(data: AppData): Promise<void>;
}

// --- Implementation 1: LocalStorage ---
// This service saves all data to the browser's local storage.
class LocalStorageService implements IStorageService {
    private readonly STORAGE_KEY = 'barPreppersConnectData';

    async getData(): Promise<AppData> {
        try {
            const storedValue = localStorage.getItem(this.STORAGE_KEY);
            if (storedValue) {
                const parsed = JSON.parse(storedValue);
                // Dates are stored as strings in JSON, so we need to convert them back to Date objects.
                const submissionsWithDates = parsed.submissions.map((sub: Submission) => ({
                    ...sub,
                    submittedAt: new Date(sub.submittedAt),
                    feedback: sub.feedback ? {
                        ...sub.feedback,
                        gradedAt: new Date(sub.feedback.gradedAt),
                    } : undefined,
                }));
                return { ...parsed, submissions: submissionsWithDates };
            }
        } catch (error) {
            console.error('Error reading from localStorage:', error);
            // If there's an error, we fall back to the initial mock data.
        }

        const mockData: AppData = {
            users: MOCK_USERS,
            plans: MOCK_PLANS,
            lessons: MOCK_LESSONS,
            assignments: MOCK_ASSIGNMENTS,
            submissions: MOCK_SUBMISSIONS,
            timetableCrash: MOCK_TIMETABLE_CRASH,
            timetableIntensive: MOCK_TIMETABLE_INTENSIVE,
            timetableFull: MOCK_TIMETABLE_FULL,
        };
        // Also save the mock data to local storage for the next load.
        await this.saveData(mockData);
        return mockData;
    }

    async saveData(data: AppData): Promise<void> {
        try {
            const serializableData = JSON.stringify(data);
            localStorage.setItem(this.STORAGE_KEY, serializableData);
        } catch (error) {
            console.error('Error saving to localStorage:', error);
            throw new Error('Could not save data.');
        }
    }
}

/*
// --- Implementation 2: API Service (Example) ---
// This is an example of how you would connect to a real backend.
// To use this, you would change the export at the bottom of the file.

const API_URL = 'https://api.jsonbin.io/v3/b/YOUR_BIN_ID';
// WARNING: Never expose secret keys in your frontend code in a real application!
const SECRET_KEY = 'YOUR_SECRET_KEY';

class ApiService implements IStorageService {
    async getData(): Promise<AppData> {
        const response = await fetch(`${API_URL}/latest`, {
            headers: {
                'X-Master-Key': SECRET_KEY
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch data from the server.');
        }
        const data = await response.json();
        // The data from jsonbin is nested under a `record` property.
        const appData = data.record;
        
        // Don't forget to parse dates here as well!
        const submissionsWithDates = appData.submissions.map((sub: Submission) => ({
             ...sub,
             submittedAt: new Date(sub.submittedAt),
             feedback: sub.feedback ? { ...sub.feedback, gradedAt: new Date(sub.feedback.gradedAt) } : undefined,
         }));
        return { ...appData, submissions: submissionsWithDates };
    }

    async saveData(data: AppData): Promise<void> {
        const response = await fetch(API_URL, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-Master-Key': SECRET_KEY
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw new Error('Failed to save data to the server.');
        }
    }
}
*/


// To switch to a real API, you would change this line to:
// export const storageService = new ApiService();
export const storageService = new LocalStorageService();
