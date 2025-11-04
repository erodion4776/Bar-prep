
import React, { useState, createContext, useContext, useMemo, useEffect } from 'react';
import { User, Role, PlanType, Lesson, Assignment, Submission, TimetableEntry, Plan } from './types';
import LoginPage from './components/LoginPage';
import StudentDashboard from './components/student/StudentDashboard';
import TeacherDashboard from './components/teacher/TeacherDashboard';
import PlanSelection from './components/PlanSelection';
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import LegalPage from './components/LegalPage'; // Import the new Legal Page
import PaymentPage from './components/PaymentPage';
import PlanDetailsPage from './components/PlanDetailsPage';
import { Header } from './components/student/common/Header';
import { storageService, AppData } from './services/storageService';

// --- THEME CONTEXT ---
type Theme = 'light' | 'dark';

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [theme, setTheme] = useState<Theme>(() => {
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme) {
            return storedTheme as Theme;
        }
        // If no theme is stored, use the system preference.
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    });

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove('light', 'dark');
        root.classList.add(theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    const value = { theme, toggleTheme };

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}


// --- FOOTER COMPONENT ---
const SocialIcon: React.FC<{ href: string, children: React.ReactNode }> = ({ href, children }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-on-surface-secondary hover:text-primary">
        {children}
    </a>
);

const Footer: React.FC = () => {
    const { showHome, showAbout, showLegal } = useAuth();
    return (
        <footer className="bg-surface border-t border-on-surface/10">
            <div className="container mx-auto px-4 md:px-8 py-8">
                <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
                    <div className="text-center md:text-left">
                        <h3 className="text-xl font-bold text-primary">Bar Preppers Connect</h3>
                        <p className="text-sm text-on-surface-secondary mt-1">by Attorney Cynthia Azor</p>
                    </div>
                    <div className="flex space-x-6 text-sm sm:text-base">
                        <button onClick={showHome} className="text-on-surface hover:text-primary transition-colors">Home</button>
                        <button onClick={showAbout} className="text-on-surface hover:text-primary transition-colors">About</button>
                        <button onClick={showLegal} className="text-on-surface hover:text-primary transition-colors">Legal Services</button>
                    </div>
                    <div className="flex space-x-6">
                         <SocialIcon href="https://x.com">
                            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                         </SocialIcon>
                         <SocialIcon href="https://linkedin.com">
                            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                            </svg>
                         </SocialIcon>
                    </div>
                </div>
                <div className="mt-8 text-center text-sm text-on-surface-secondary border-t border-on-surface/10 pt-6">
                    <p>&copy; {new Date().getFullYear()} Bar Preppers Connect. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
};

// --- AUTH CONTEXT ---
interface AuthContextType {
  user: User | null;
  login: (email: string) => void;
  register: (name: string, email: string) => Promise<void>;
  logout: () => void;
  selectPlan: (plan: PlanType) => void;
  isLoginPageActive: boolean;
  showLogin: () => void;
  showHome: () => void;
  showAbout: () => void;
  showLegal: () => void;
  currentPage: 'home' | 'about' | 'legal' | 'payment';
  goToPayment: (planId: PlanType) => void;
  completePurchase: () => void;
  planForPurchase: Plan | null;
  showPlanSelection: () => void;
  showPlanDetails: (planId: PlanType) => void;
  viewingPlanId: PlanType | null;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// --- DATA CONTEXT & PROVIDER ---
interface DataContextType extends Omit<AppData, 'timetableA' | 'timetableB'> {
  loading: boolean;
  error: string | null;
  timetableCrash: TimetableEntry[];
  timetableIntensive: TimetableEntry[];
  timetableFull: TimetableEntry[];
  addLesson: (newLesson: Omit<Lesson, 'id'>) => Promise<void>;
  updateLesson: (updatedLesson: Lesson) => Promise<void>;
  addAssignment: (newAssignment: Omit<Assignment, 'id'>, day: number) => Promise<void>;
  updateAssignment: (updatedAssignment: Assignment, day: number) => Promise<void>;
  saveFeedback: (submissionId: string, grade: string, comments: string) => Promise<void>;
  addSubmission: (newSubmission: Omit<Submission, 'id' | 'submittedAt' | 'status' | 'feedback'>) => Promise<void>;
  addUser: (name: string, email: string) => Promise<User | null>;
}

const DataContext = createContext<DataContextType | null>(null);

export const useData = () => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
}

const LoadingSpinner: React.FC = () => (
    <div className="flex justify-center items-center h-64">
        <svg className="animate-spin -ml-1 mr-3 h-10 w-10 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
    </div>
);


const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [data, setData] = useState<AppData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadData = async () => {
        try {
            setLoading(true);
            const loadedData = await storageService.getData();
            setData(loadedData);
        } catch (err) {
            setError('Failed to load data.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const saveData = async (updatedData: AppData) => {
        try {
            await storageService.saveData(updatedData);
            setData(updatedData);
        } catch (err) {
            setError('Failed to save data.');
            console.error(err);
        }
    };

    const addLesson = async (newLesson: Omit<Lesson, 'id'>) => {
        if (!data) return;
        const lessonWithId: Lesson = { ...newLesson, id: `l-${Date.now()}` };
        const updatedData = { ...data, lessons: [...data.lessons, lessonWithId] };
        await saveData(updatedData);
    };

    const updateLesson = async (updatedLesson: Lesson) => {
        if (!data) return;
        const updatedData = {
            ...data,
            lessons: data.lessons.map(l => (l.id === updatedLesson.id ? updatedLesson : l)),
        };
        await saveData(updatedData);
    };

    const addAssignment = async (newAssignment: Omit<Assignment, 'id'>, day: number) => {
        if (!data) return;
        const assignmentWithId: Assignment = { ...newAssignment, id: `a-${Date.now()}` };
        
        const updateTimetable = (timetable: TimetableEntry[]) => {
            const dayEntry = timetable.find(e => e.day === day);
            if (dayEntry) {
                dayEntry.assignmentIds.push(assignmentWithId.id);
            } else {
                timetable.push({ day, lessonIds: [], assignmentIds: [assignmentWithId.id] });
                timetable.sort((a,b) => a.day - b.day);
            }
            return [...timetable];
        };

        const updatedData = { 
            ...data, 
            assignments: [...data.assignments, assignmentWithId],
            timetableIntensive: updateTimetable(data.timetableIntensive),
            timetableFull: updateTimetable(data.timetableFull),
        };
        await saveData(updatedData);
    };
    
     const updateAssignment = async (updatedAssignment: Assignment, day: number) => {
        if (!data) return;

        const updateTimetable = (timetable: TimetableEntry[]) => {
            // Remove from old day
            timetable.forEach(entry => {
                entry.assignmentIds = entry.assignmentIds.filter(id => id !== updatedAssignment.id);
            });
            // Add to new day
            const dayEntry = timetable.find(e => e.day === day);
            if (dayEntry) {
                dayEntry.assignmentIds.push(updatedAssignment.id);
            } else {
                timetable.push({ day, lessonIds: [], assignmentIds: [updatedAssignment.id]});
                 timetable.sort((a,b) => a.day - b.day);
            }
            return timetable.filter(e => e.assignmentIds.length > 0 || e.lessonIds.length > 0);
        };
        
        const updatedData = {
            ...data,
            assignments: data.assignments.map(a => a.id === updatedAssignment.id ? updatedAssignment : a),
            timetableIntensive: updateTimetable([...data.timetableIntensive]),
            timetableFull: updateTimetable([...data.timetableFull]),
        };
        await saveData(updatedData);
    };

    const saveFeedback = async (submissionId: string, grade: string, comments: string) => {
        if (!data) return;
        const updatedSubmissions = data.submissions.map(s => {
            if (s.id === submissionId) {
                return {
                    ...s,
                    status: 'graded' as 'graded',
                    feedback: {
                        id: `f-${Date.now()}`,
                        submissionId: s.id,
                        teacherId: 'user-2', // Mock teacher ID
                        grade,
                        comments,
                        gradedAt: new Date(),
                    }
                };
            }
            return s;
        });
        await saveData({ ...data, submissions: updatedSubmissions });
    };

    const addSubmission = async (newSubmission: Omit<Submission, 'id' | 'submittedAt' | 'status' | 'feedback'>) => {
        if (!data) return;
        const submissionWithId: Submission = { 
            ...newSubmission, 
            id: `s-${Date.now()}`,
            submittedAt: new Date(),
            status: 'submitted',
        };
        const updatedData = { ...data, submissions: [...data.submissions, submissionWithId] };
        await saveData(updatedData);
    };
    
    const addUser = async (name: string, email: string): Promise<User | null> => {
        if (!data) return null;
        if (data.users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
            return null; // User already exists
        }
        const newUser: User = {
            id: `user-${Date.now()}`,
            name,
            email,
            role: Role.STUDENT,
        };
        const updatedData = { ...data, users: [...data.users, newUser] };
        await saveData(updatedData);
        return newUser;
    };


    const value = useMemo(() => {
        if (!data) return null;
        return {
            loading,
            error,
            ...data,
            addLesson,
            updateLesson,
            addAssignment,
            updateAssignment,
            saveFeedback,
            addSubmission,
            addUser,
        };
    }, [data, loading, error]);

    if (loading) return <LoadingSpinner />;
    if (error || !value) return <div className="text-center text-red-500">{error || 'Something went wrong.'}</div>;

    return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(() => {
        const storedUser = sessionStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });
    
    const [currentPage, setCurrentPage] = useState<'home' | 'about' | 'legal' | 'payment'>('home');
    const [planForPurchaseId, setPlanForPurchaseId] = useState<PlanType | null>(null);
    const [isLoginPageActive, setIsLoginPageActive] = useState(false);
    const [viewingPlanId, setViewingPlanId] = useState<PlanType | null>(null);


    const { users, plans, addUser } = useData();
    const planForPurchase = plans.find(p => p.id === planForPurchaseId) || null;

    useEffect(() => {
        if (user) {
            sessionStorage.setItem('user', JSON.stringify(user));
        } else {
            sessionStorage.removeItem('user');
        }
    }, [user]);
    
    const register = async (name: string, email: string) => {
        const newUser = await addUser(name, email);
        if (newUser) {
            login(email); // This will set the user and handle redirects
        } else {
            alert('An account with this email already exists. Please login.');
        }
    };

    const login = (email: string) => {
        const foundUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
        if (foundUser) {
            setUser(foundUser);
            setIsLoginPageActive(false);
            setViewingPlanId(null); 
            if (!foundUser.plan && foundUser.role === Role.STUDENT) {
                // If student has no plan, they are in the process of signing up.
                // If they had a plan selected for purchase, go to payment.
                // Otherwise, the default is to show plan selection.
                if (planForPurchaseId) {
                    setCurrentPage('payment');
                }
            }
        } else {
            alert('User not found. Please use a demo account email.');
        }
    };
    
    const goToPayment = (planId: PlanType) => {
        setPlanForPurchaseId(planId);
        setViewingPlanId(null);
        if (user) {
            setCurrentPage('payment');
        } else {
             setIsLoginPageActive(true);
        }
    };
    
    const completePurchase = () => {
        if (!user || !planForPurchase) return;
        const updatedUser = { ...user, plan: planForPurchase.id };
        setUser(updatedUser);
        setPlanForPurchaseId(null);
        // After purchase, go to the dashboard
    };

    const logout = () => {
        setUser(null);
        setCurrentPage('home');
        setPlanForPurchaseId(null);
        setIsLoginPageActive(false);
        setViewingPlanId(null);
    };

    const selectPlan = (plan: PlanType) => {
        if (user) {
            setUser({ ...user, plan });
        }
    };
    
    const showPlanDetails = (planId: PlanType) => {
        setViewingPlanId(planId);
        setCurrentPage('home');
        setIsLoginPageActive(false);
    };

    const showLogin = () => {
        if (!user) {
            setIsLoginPageActive(true);
        }
    };

    const showHome = () => {
        setCurrentPage('home');
        setIsLoginPageActive(false);
        setViewingPlanId(null);
    }
    const showAbout = () => {
        setCurrentPage('about');
        setIsLoginPageActive(false);
        setViewingPlanId(null);
    }
    const showLegal = () => {
        setCurrentPage('legal');
        setIsLoginPageActive(false);
        setViewingPlanId(null);
    }
    
    const showPlanSelection = () => {
        setViewingPlanId(null);
        if (user && !user.plan) {
           setCurrentPage('home'); // Reset to a state where plan selection is shown
        }
    };

    const value = {
        user,
        login,
        register,
        logout,
        selectPlan,
        isLoginPageActive,
        showLogin,
        showHome,
        showAbout,
        showLegal,
        currentPage,
        goToPayment,
        completePurchase,
        planForPurchase,
        showPlanSelection,
        viewingPlanId,
        showPlanDetails,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const AppContent: React.FC = () => {
    const { user, isLoginPageActive, currentPage, viewingPlanId } = useAuth();
    
    const shouldShowHeader = !(currentPage === 'home' && !user && !viewingPlanId);

    const renderContent = () => {
        if (viewingPlanId) {
            return <PlanDetailsPage />;
        }
        if (isLoginPageActive) {
            return <LoginPage />;
        }
        if (currentPage === 'payment') {
            return <PaymentPage />;
        }
        
        // Logged-in user routing
        if (user) {
            // These pages are accessible to logged-in users
            if (currentPage === 'about') return <AboutPage />;
            if (currentPage === 'legal') return <LegalPage />;

            // "Home" for a logged-in user is their dashboard
            if (user.role === Role.TEACHER) {
                return <TeacherDashboard />;
            }
            if (user.plan) {
                return <StudentDashboard />;
            }
            // Logged-in student with no plan sees the plan selection
            return <PlanSelection />;
        }
        
        // Logged-out user routing
        switch (currentPage) {
            case 'about':
                return <AboutPage />;
            case 'legal':
                return <LegalPage />;
            case 'home':
            default:
                return <HomePage />;
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-background text-on-surface">
            {shouldShowHeader && <Header />}
            <main className={`flex-grow ${shouldShowHeader ? 'container mx-auto px-4 md:px-8 py-8' : ''}`}>
                 {renderContent()}
            </main>
            <Footer />
        </div>
    );
};


const App: React.FC = () => (
    <ThemeProvider>
        <DataProvider>
            <AuthProvider>
                <AppContent />
            </AuthProvider>
        </DataProvider>
    </ThemeProvider>
);

export default App;
