


import React from 'react';
import { Card } from './student/common/Card';
import { Button } from './student/common/Button';
import { useAuth } from '../App';

const ServiceCard: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
    <Card className="text-center p-6 h-full flex flex-col items-center transform hover:-translate-y-2 transition-transform duration-300">
        <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary text-background-contrast mb-4">
            {icon}
        </div>
        <h3 className="text-xl font-bold text-on-surface mb-2">{title}</h3>
        <p className="text-on-surface-secondary flex-grow">{children}</p>
    </Card>
);


const LegalPage: React.FC = () => {
    const { showLogin } = useAuth();
    
    return (
        <div className="space-y-20 pb-16">
            {/* Hero Section */}
            <section className="text-center">
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-primary">Legal Services</h1>
                <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto text-on-surface-secondary">
                    Expert legal guidance focused on U.S. immigration law for professionals, students, and families.
                </p>
            </section>

            {/* Introduction Section */}
            <section className="container mx-auto px-4">
                <Card>
                    <div className="text-center lg:text-left">
                        <h2 className="text-3xl font-bold text-on-surface">Your Trusted Immigration Partner</h2>
                        <p className="mt-4 text-on-surface-secondary">
                            Navigating the U.S. immigration system can be complex and overwhelming. At the Law Office of Cynthia Azor, we provide clear, strategic, and compassionate legal counsel to help you achieve your personal and professional goals. 
                        </p>
                        <p className="mt-4 text-on-surface-secondary">
                            Whether you are a student transitioning to a work visa, an employer sponsoring talent, or a family seeking to reunite, we are dedicated to providing personalized solutions for your unique circumstances.
                        </p>
                    </div>
                </Card>
            </section>

            {/* Services Offered Section */}
            <section className="container mx-auto px-4 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-on-surface mb-12">Our Practice Areas</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <ServiceCard title="Student & Graduate Visas" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>}>
                        Guidance on F-1 status, OPT/STEM OPT, and navigating the transition to work visas like the H-1B.
                    </ServiceCard>
                    <ServiceCard title="Family-Based Immigration" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>}>
                        Helping families unite through marriage-based green cards, fiancé(e) visas, and petitions for relatives.
                    </ServiceCard>
                    <ServiceCard title="Employment-Based Visas" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>}>
                        Assisting employers and employees with PERM labor certifications, EB-2, EB-3, and other work-based visas.
                    </ServiceCard>
                    <ServiceCard title="Citizenship & Naturalization" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" /></svg>}>
                        Guiding lawful permanent residents through the final step of their immigration journey to become U.S. citizens.
                    </ServiceCard>
                </div>
            </section>

            {/* Consultation CTA Section */}
            <section className="container mx-auto px-4">
                <Card className="bg-primary text-background">
                    <h2 className="text-3xl md:text-4xl font-bold">Book a Consultation</h2>
                    <p className="mt-4 text-lg text-background/80 max-w-2xl mx-auto">
                        Take the first step towards resolving your immigration matter. Schedule a confidential consultation with Attorney Azor to discuss your case and explore your options.
                    </p>
                     <div className="mt-8">
                        <Button variant="secondary" className="bg-background-contrast text-primary hover:bg-background-contrast/90 text-lg px-8 py-3" onClick={showLogin}>
                            Schedule Now
                        </Button>
                    </div>
                </Card>
            </section>
            
            {/* Disclaimer */}
            <section className="container mx-auto px-4 text-center">
                <p className="text-xs text-on-surface-secondary max-w-2xl mx-auto">
                    Disclaimer: The information provided on this website is for general informational purposes only and does not constitute legal advice. No attorney-client relationship is formed by viewing this website or contacting the firm. Please consult with an attorney for advice on your individual situation.
                </p>
            </section>

        </div>
    );
}

export default LegalPage;
