import React from 'react';
import { useAuth, useData } from '../App';
import { Card } from './student/common/Card';
import { Button } from './student/common/Button';

const featureDetails: { [key: string]: string } = {
    'Daily study schedules (1, 3, & 6-month options)': 'Receive a detailed, day-by-day plan tailored to your exam timeline, ensuring you cover all necessary subjects methodically and efficiently.',
    'Upload & submit essays, MCQs, and MPTs on a schedule': 'Our integrated platform allows you to easily submit your practice work according to your schedule, keeping you accountable and organized.',
    'Receive marked PDF feedback & personalized improvements': 'Get in-depth, actionable feedback on your submissions. We highlight your strengths and provide clear guidance on areas for improvement.',
    'Receive recorded video explanations for selected essays': 'Understand complex concepts with personalized video walkthroughs of your essays, breaking down the analysis and structure.',
    'Track your completion percentage and progress': "Visualize your journey with a dynamic progress tracker that shows you exactly how much you've accomplished and what's next.",
    'Book 1-on-1 sessions directly through Calendly': 'Schedule private mentorship sessions with Attorney Azor at your convenience to discuss strategy, review difficult topics, or get mindset coaching.',
    'Chat privately for guidance and assignment clarification': 'Have a question? Get timely support and clarification on assignments or concepts through a direct, private chat channel.',
    'Weekly motivation & rule memorization drills': 'Stay sharp and motivated with weekly emails containing key rule statements to memorize and encouragement to keep your momentum strong.',
    'Optional live group study sessions & recall games': 'Engage with fellow candidates in optional group sessions and fun, interactive games designed to reinforce your knowledge and build community.',
    '1-hour strategy call': "A focused, intensive session with Attorney Azor to diagnose your current study plan and identify key areas for immediate improvement.",
    'Roadmap review': "We'll analyze your existing study materials and schedule to create a high-level, strategic roadmap for the remainder of your prep time.",
    'Q&A Session': "Your opportunity to ask pressing questions about bar prep strategy, study techniques, or specific challenges you're facing.",
};


const PlanDetailsPage: React.FC = () => {
    const { viewingPlanId, showPlanSelection, goToPayment } = useAuth();
    const { plans } = useData();

    if (!viewingPlanId) return null;

    const plan = plans.find(p => p.id === viewingPlanId);
    if (!plan) return <p>Plan not found.</p>;

    return (
        <div className="space-y-8">
            <button onClick={showPlanSelection} className="flex items-center text-on-surface-secondary hover:text-primary transition-colors">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Back to All Plans
            </button>

            {/* Header */}
            <Card>
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-center md:text-left">
                        <h1 className="text-4xl font-extrabold text-primary">{plan.name}</h1>
                        <p className="mt-2 text-xl text-on-surface-secondary">{plan.description}</p>
                    </div>
                    <div className="text-center flex-shrink-0">
                        <p className="text-5xl font-bold text-on-surface">${plan.price}</p>
                        <Button onClick={() => goToPayment(plan.id)} className="mt-4 w-full">Register Now</Button>
                    </div>
                </div>
            </Card>

            {/* Expanded Features */}
             <Card title="What's Included in Your Mentorship">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {plan.features?.map((feature, index) => (
                        <div key={index} className="flex items-start p-4 bg-background rounded-lg transition-shadow hover:shadow-md">
                             <svg className="flex-shrink-0 h-8 w-8 text-secondary mr-4 mt-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <div>
                                <h4 className="font-bold text-on-surface">{feature}</h4>
                                <p className="text-sm text-on-surface-secondary mt-1">{featureDetails[feature] || 'More details coming soon.'}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>

        </div>
    );
};

export default PlanDetailsPage;