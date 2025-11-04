

import React from 'react';
import { useAuth, useData } from '../App';
import { Plan, PlanType } from '../types';
import { Button } from './student/common/Button';
import { Card } from './student/common/Card';

const PlanCard: React.FC<{ plan: Plan; onSelect: () => void }> = ({ plan, onSelect }) => (
    <Card className="flex flex-col border-2 border-transparent hover:border-primary transition-all duration-300">
        <div className="p-6">
            <h3 className="text-2xl font-bold text-primary">{plan.name}</h3>
            <p className="mt-1 text-on-surface-secondary font-semibold">{plan.duration} Days</p>
            <p className="mt-4 text-4xl font-extrabold text-on-surface">${plan.price}</p>
            <p className="mt-4 text-on-surface-secondary h-12">{plan.description}</p>
        </div>
        <div className="p-6 flex-grow flex flex-col">
             <ul className="space-y-3 text-on-surface-secondary">
                {plan.features?.map((feature, index) => (
                    <li key={index} className="flex items-start">
                        <svg className="flex-shrink-0 h-6 w-6 text-secondary mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{feature}</span>
                    </li>
                ))}
            </ul>
        </div>
        <div className="p-6 bg-background rounded-b-lg mt-auto">
            <Button onClick={onSelect} className="w-full">Learn More</Button>
        </div>
    </Card>
);

const InfoCard: React.FC<{ title: string; children: React.ReactNode, buttonText: string, buttonHref?: string }> = ({title, children, buttonText, buttonHref}) => (
    <Card className="bg-primary text-background">
        <h3 className="text-2xl font-bold">{title}</h3>
        <div className="mt-4 space-y-2 text-background/80">{children}</div>
        <div className="mt-6">
            <Button variant="secondary" className="bg-background-contrast text-primary hover:bg-background-contrast/90" onClick={() => buttonHref && window.open(buttonHref, '_blank')}>
                {buttonText}
            </Button>
        </div>
    </Card>
);


const PlanSelection: React.FC = () => {
    const { showPlanDetails } = useAuth();
    const { plans } = useData();

    const mentorshipPlans = plans.filter(p => p.id !== PlanType.ONE_SESSION);
    const oneSessionPlan = plans.find(p => p.id === PlanType.ONE_SESSION);
    
    return (
        <div className="space-y-16">
            <div className="text-center">
                <h2 className="text-4xl font-bold tracking-tight text-on-surface sm:text-5xl">Your Personal Study Buddy to Bar Exam Success</h2>
                <p className="mt-4 text-xl text-on-surface-secondary max-w-3xl mx-auto">A complete mentorship ecosystem for bar exam candidates, combining structure, support, and accountability.</p>
            </div>

            {/* Mentorship Plans */}
            <div id="mentorship">
                <h3 className="text-3xl font-bold text-center mb-2">🧱 1️⃣ Personalized Mentorship & Study Plans</h3>
                <p className="text-center text-on-surface-secondary mb-10">Our Mission: "Personalized 1-on-1 bar prep mentorship with daily schedules, assignments, progress tracking, and feedback — all in one guided system designed to make you bar-ready and confident."</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {mentorshipPlans.map(plan => (
                        <PlanCard key={plan.id} plan={plan} onSelect={() => showPlanDetails(plan.id as PlanType)} />
                    ))}
                </div>
                 <div className="mt-8 text-center">
                    {oneSessionPlan && (
                        <Card className="max-w-md mx-auto">
                            <h4 className="font-bold text-xl">{oneSessionPlan.name}</h4>
                            <p className="mt-2">{oneSessionPlan.description}</p>
                            <p className="text-3xl font-bold my-2">${oneSessionPlan.price}</p>
                            <Button variant="secondary" onClick={() => showPlanDetails(oneSessionPlan.id)}>Learn More</Button>
                        </Card>
                    )}
                </div>
            </div>

            {/* Free Resources & Community */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <InfoCard title="Free Mini Courses & Resources" buttonText="Explore Free Guides">
                    <p><strong>“1-Month to the Bar Exam” Strategy Guide:</strong> Action-packed daily guide to help you prepare efficiently.</p>
                    <p><strong>Monthly Webinars & Workshops:</strong> Focused live sessions on essay writing, time management, and mindset.</p>
                </InfoCard>
                 <InfoCard title="Join the Community" buttonText="Join on Skool.com" buttonHref="#">
                    <p><strong>Where Motivation Meets Accountability.</strong> Get weekly tips, mindset coaching, rule recall challenges, and support from peers.</p>
                    <p className="font-bold mt-2">Starting from $19.99/month.</p>
                </InfoCard>
            </div>
        </div>
    );
}

export default PlanSelection;
