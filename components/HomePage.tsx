
import React, { useState } from 'react';
import { useAuth, useData } from '../App';
import { Button } from './student/common/Button';
import { Card } from './student/common/Card';
import { Plan, PlanType } from '../types';

const Feature: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
    <div className="flex items-start space-x-4 p-4">
        <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-lg bg-primary text-background-contrast">
            {icon}
        </div>
        <div>
            <h3 className="text-xl font-bold text-on-surface">{title}</h3>
            <p className="mt-1 text-on-surface-secondary">{children}</p>
        </div>
    </div>
);

const StepCard: React.FC<{ icon: React.ReactNode; title: string; step: string; children: React.ReactNode }> = ({ icon, title, step, children }) => (
    <Card className="text-center p-8 h-full">
        <div className="relative inline-block">
             <div className="flex items-center justify-center h-24 w-24 rounded-full bg-primary/10 text-primary mx-auto mb-6">
                {icon}
            </div>
            <span className="absolute -top-1 -right-1 flex items-center justify-center h-10 w-10 rounded-full bg-secondary text-background-contrast font-bold text-base ring-4 ring-surface">{step}</span>
        </div>
        <h3 className="text-xl font-bold text-on-surface mb-2">{title}</h3>
        <p className="text-on-surface-secondary">{children}</p>
    </Card>
);


const PlanCard: React.FC<{ plan: Plan; onSelect: () => void; isFeatured?: boolean }> = ({ plan, onSelect, isFeatured }) => (
    <Card className={`flex flex-col h-full ${isFeatured ? 'border-2 border-secondary transform lg:scale-105 shadow-2xl' : 'border border-on-surface/10'}`}>
        {isFeatured && <div className="bg-secondary text-center py-2 text-sm text-background-contrast font-bold uppercase tracking-wider">Most Popular</div>}
        <div className="p-8 text-center">
            <h3 className="text-2xl font-bold text-primary">{plan.name}</h3>
            <p className="mt-2 text-on-surface-secondary font-semibold">{plan.duration} Days</p>
            <p className="mt-4 text-5xl font-extrabold text-on-surface">${plan.price}</p>
            <p className="mt-2 text-sm text-on-surface-secondary">One-time payment</p>
        </div>
        <div className="p-8 pt-0 flex-grow">
             <ul className="space-y-4">
                {plan.features?.map((feature, index) => (
                    <li key={index} className="flex items-start">
                        <svg className="flex-shrink-0 h-6 w-6 text-green-500 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-on-surface-secondary">{feature}</span>
                    </li>
                ))}
            </ul>
        </div>
        <div className="p-8 pt-4 mt-auto">
            <Button onClick={onSelect} className="w-full text-lg py-3" variant={isFeatured ? 'primary' : 'secondary'}>Learn More</Button>
        </div>
    </Card>
);


const FAQItem: React.FC<{ title: string; open: boolean; setOpen: () => void; children: React.ReactNode }> = ({ title, open, setOpen, children }) => (
    <div className="border-b border-on-surface/10">
        <button onClick={setOpen} className="w-full flex justify-between items-center text-left py-6">
            <h4 className="text-lg font-semibold text-on-surface pr-4">{title}</h4>
             <div className="flex-shrink-0 ml-4 flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
                <svg className={`w-5 h-5 text-primary transform transition-transform duration-300 ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </div>
        </button>
        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="pb-6 pr-12 text-on-surface-secondary">
                {children}
            </div>
        </div>
    </div>
);

const HomePage: React.FC = () => {
    const { showLogin, showPlanDetails } = useAuth();
    const { plans } = useData();
    const [openFAQ, setOpenFAQ] = useState<number | null>(0);

    const scrollTo = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    const mentorshipPlans = plans.filter(p => p.id !== PlanType.ONE_SESSION);
    const faqs = [
        {
            q: 'Who is this program for?',
            a: 'Bar Preppers Connect is designed for all bar exam candidates, but we have special expertise in assisting foreign-trained lawyers and re-takers who need a more structured, supportive, and accountable approach.'
        },
        {
            q: 'How is this different from other bar prep courses?',
            a: 'While traditional courses provide materials, we provide mentorship. Our focus is on personalized study plans, one-on-one feedback on assignments, accountability check-ins, and mindset coaching to address the whole student, not just their legal knowledge.'
        },
        {
            q: 'What if my state isn\'t listed in the subjects?',
            a: 'Our core curriculum focuses on the Uniform Bar Exam (UBE) subjects. However, our mentorship is adaptable. We can integrate your state-specific materials into your personalized study plan and provide strategic guidance on how to approach them.'
        },
        {
            q: 'Can I purchase a plan later?',
            a: 'Absolutely! You can start by exploring our free resources or joining our community. When you\'re ready for dedicated mentorship, you can choose the plan that best fits your timeline and needs.'
        }
    ];

    return (
        <div className="bg-background text-on-surface">
            {/* Hero Section */}
            <section className="relative bg-cover bg-center py-32 md:py-48 px-4">
                <div className="absolute inset-0 bg-black opacity-40"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent"></div>
                <div className="relative container mx-auto text-center z-10">
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-surface">Unlock Your Bar Exam Success</h1>
                    <p className="mt-6 text-lg md:text-xl max-w-3xl mx-auto text-on-surface/80 dark:text-on-surface/90">
                        Personalized mentorship, proven strategies, and a supportive community to guide you every step of the way.
                    </p>
                    <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
                        <Button onClick={() => scrollTo('plans')} variant="primary" className="text-lg px-8 py-4">Explore Plans</Button>
                        <Button onClick={showLogin} variant="secondary" className="text-lg px-8 py-4 bg-surface/20 border-surface/30 text-surface hover:bg-surface/30">Member Login</Button>
                    </div>
                </div>
            </section>

            {/* Social Proof / Stats Bar */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="bg-surface rounded-xl shadow-lg flex flex-wrap justify-around text-center divide-y md:divide-y-0 md:divide-x divide-on-surface/10">
                        <div className="p-6 w-1/2 md:w-auto md:flex-1">
                            <p className="text-4xl font-bold text-primary">90%+</p>
                            <p className="mt-1 text-sm text-on-surface-secondary uppercase tracking-wider">First-Time Pass Rate</p>
                        </div>
                        <div className="p-6 w-1/2 md:w-auto md:flex-1">
                            <p className="text-4xl font-bold text-primary">1-on-1</p>
                            <p className="mt-1 text-sm text-on-surface-secondary uppercase tracking-wider">Personalized Mentorship</p>
                        </div>
                        <div className="p-6 w-1/2 md:w-auto md:flex-1">
                            <p className="text-4xl font-bold text-primary">100+</p>
                            <p className="mt-1 text-sm text-on-surface-secondary uppercase tracking-wider">Students Guided</p>
                        </div>
                        <div className="p-6 w-1/2 md:w-auto md:flex-1">
                            <p className="text-4xl font-bold text-primary">Expert</p>
                            <p className="mt-1 text-sm text-on-surface-secondary uppercase tracking-wider">MBE, MEE & MPT Guidance</p>
                        </div>
                    </div>
                </div>
            </section>

             {/* Why Choose Us Section */}
            <section className="py-20 px-4 container mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-on-surface">The Bar Preppers Advantage</h2>
                    <p className="mt-4 text-lg text-on-surface-secondary max-w-3xl mx-auto">We're more than a course; we're your personal team for bar exam success.</p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    <Feature title="Expert Mentorship" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 14l9-5-9-5-9 5 9 5z" /><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-5.998 12.078 12.078 0 01.665-6.479L12 14z" /><path strokeLinecap="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-5.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222 4 2.222V20M1 12v7a2 2 0 002 2h18a2 2 0 002-2v-7" /></svg>}>
                        Guidance from Attorney Cynthia Azor who has been in your shoes, especially as a foreign-trained lawyer.
                    </Feature>
                    <Feature title="Structured Accountability" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>}>
                        A clear, daily study plan with assignments and feedback to keep you on track and motivated.
                    </Feature>
                    <Feature title="Holistic Support" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>}>
                        We address mindset, time management, and well-being to support you as a whole person, not just a test-taker.
                    </Feature>
                </div>
            </section>
            
            {/* How It Works Section */}
            <section className="bg-surface py-20 px-4">
                <div className="container mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-on-surface">Your Path to Passing the Bar</h2>
                        <p className="mt-4 text-lg text-on-surface-secondary max-w-3xl mx-auto">A simple, effective, three-step process to build your confidence and competence.</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        <StepCard step="1" title="Choose Your Plan" icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}>
                            Select the mentorship plan that aligns with your study timeline—from a 1-month crash course to a 6-month deep dive.
                        </StepCard>
                        <StepCard step="2" title="Follow Your Schedule" icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0h18M-4.5 12h22.5" /></svg>}>
                            Log in daily to access your lessons, complete your assignments, and submit your work directly through the platform.
                        </StepCard>
                        <StepCard step="3" title="Receive Feedback & Grow" icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 100 15 7.5 7.5 0 000-15zM21 21l-5.197-5.197" /></svg>}>
                            Get personalized, actionable feedback on your work, track your progress, and watch your skills improve week by week.
                        </StepCard>
                    </div>
                </div>
            </section>

            {/* Plans Section */}
            <section id="plans" className="py-20 px-4 container mx-auto">
                 <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-on-surface">Mentorship Plans</h2>
                    <p className="mt-4 text-lg text-on-surface-secondary max-w-3xl mx-auto">Find the perfect level of support for your bar exam journey. All plans include our core mentorship features.</p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                    {mentorshipPlans.map(plan => (
                        <PlanCard key={plan.id} plan={plan} onSelect={() => showPlanDetails(plan.id as PlanType)} isFeatured={plan.id === PlanType.INTENSIVE} />
                    ))}
                </div>
            </section>

            {/* FAQ Section */}
            <section className="bg-surface py-20 px-4">
                <div className="container mx-auto max-w-4xl">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl md:text-5xl font-bold text-on-surface">Frequently Asked Questions</h2>
                    </div>
                    <Card>
                        {faqs.map((faq, index) => (
                            <FAQItem key={index} title={faq.q} open={openFAQ === index} setOpen={() => setOpenFAQ(openFAQ === index ? null : index)}>
                                <p>{faq.a}</p>
                            </FAQItem>
                        ))}
                    </Card>
                </div>
            </section>

            {/* Become a Member CTA */}
             <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="bg-secondary rounded-2xl p-12 text-center shadow-xl relative overflow-hidden">
                        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-white/10 rounded-full"></div>
                        <div className="absolute -top-20 -right-20 w-60 h-60 bg-white/10 rounded-full"></div>
                        <div className="relative">
                            <h2 className="text-3xl md:text-4xl font-bold text-white">
                                Ready to Pass the Bar Exam?
                            </h2>
                            <p className="mt-4 text-lg max-w-2xl mx-auto text-white/90">
                                Stop studying alone. Start building the confidence, skills, and accountability you need to succeed. Your journey to "Esq." starts here.
                            </p>
                            <div className="mt-8">
                                <Button
                                    onClick={() => scrollTo('plans')}
                                    variant="secondary"
                                    className="text-lg px-10 py-4 bg-background-contrast text-secondary hover:bg-background-contrast/90 transform hover:scale-105 transition-transform"
                                >
                                    Become a Member
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
