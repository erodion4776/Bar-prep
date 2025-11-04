


import React from 'react';
import { Card } from './student/common/Card';
import { Button } from './student/common/Button';
import { useAuth } from '../App';

const FeatureIcon: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-secondary text-background-contrast mx-auto mb-4">
        {children}
    </div>
);

const AboutPage: React.FC = () => {
    const { showLogin } = useAuth();
    
    return (
        <div className="space-y-20 pb-16">
            {/* Hero Section */}
            <section className="text-center">
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-primary">About Bar Preppers Connect</h1>
                <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto text-on-surface-secondary">
                    Your dedicated partner in navigating the complexities of the bar exam.
                </p>
            </section>

            {/* Meet the Founder Section */}
            <section className="container mx-auto px-4">
                <Card className="overflow-visible">
                    <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
                        <div className="lg:w-1/3 flex-shrink-0">
                            <img 
                                src="https://picsum.photos/seed/cynthia/400/400" 
                                alt="Attorney Cynthia Azor" 
                                className="rounded-full shadow-2xl w-64 h-64 lg:w-80 lg:h-80 object-cover mx-auto -mt-24 lg:mt-0 border-4 border-surface"
                            />
                        </div>
                        <div className="lg:w-2/3 text-center lg:text-left">
                            <h2 className="text-3xl font-bold text-on-surface">Meet Our Founder, Cynthia Azor, Esq.</h2>
                            <p className="mt-4 text-on-surface-secondary">
                                Cynthia is a licensed attorney who successfully navigated the bar exam as a foreign-trained lawyer. Her firsthand experience with the unique challenges faced by international candidates fueled her passion for creating a supportive and structured mentorship program. 
                            </p>
                            <p className="mt-4 text-on-surface-secondary">
                                She understands that the bar exam is more than just a test of legal knowledge; it's a test of endurance, strategy, and mindset. With Bar Preppers Connect, Cynthia has built the resource she wishes she had, combining expert legal guidance with the critical elements of accountability and personalized support to empower every candidate to succeed.
                            </p>
                        </div>
                    </div>
                </Card>
            </section>

            {/* Our Philosophy Section */}
            <section className="container mx-auto px-4 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-on-surface mb-12">Our Guiding Philosophy</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="p-6">
                         <FeatureIcon>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                        </FeatureIcon>
                        <h3 className="text-xl font-bold text-on-surface mb-2">Personalized Mentorship</h3>
                        <p className="text-on-surface-secondary">We believe in a tailored approach. Your journey is unique, and your study plan should be too. We adapt to your learning style, schedule, and specific needs.</p>
                    </div>
                    <div className="p-6">
                        <FeatureIcon>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>
                        </FeatureIcon>
                        <h3 className="text-xl font-bold text-on-surface mb-2">Structured Accountability</h3>
                        <p className="text-on-surface-secondary">Success is built on consistency. Our structured timetables, regular check-ins, and direct feedback system ensure you stay on track and build momentum.</p>
                    </div>
                     <div className="p-6">
                        <FeatureIcon>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                        </FeatureIcon>
                        <h3 className="text-xl font-bold text-on-surface mb-2">Holistic Support</h3>
                        <p className="text-on-surface-secondary">We go beyond the black-letter law. Our program integrates mindset coaching, time management strategies, and wellness tips to support you as a whole person.</p>
                    </div>
                </div>
            </section>

            {/* Call to Action Section */}
            <section className="container mx-auto px-4">
                <Card className="bg-primary text-background">
                    <h2 className="text-3xl md:text-4xl font-bold">Ready to Start Your Journey?</h2>
                    <p className="mt-4 text-lg text-background/80 max-w-2xl mx-auto">
                        Stop studying alone and start building the confidence and skills you need to pass the bar. Explore our plans and find the right fit for you.
                    </p>
                     <div className="mt-8">
                        <Button variant="secondary" className="bg-background-contrast text-primary hover:bg-background-contrast/90 text-lg px-8 py-3" onClick={showLogin}>
                            View Mentorship Plans
                        </Button>
                    </div>
                </Card>
            </section>
        </div>
    );
}

export default AboutPage;
