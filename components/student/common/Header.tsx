

import React from 'react';
import { useAuth, useTheme } from '../../../App';
import { Button } from './Button';

const ThemeToggleButton: React.FC = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-on-surface-secondary hover:bg-on-surface/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:ring-offset-surface"
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
            {theme === 'light' ? (
                // Moon Icon
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
            ) : (
                // Sun Icon
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
            )}
        </button>
    );
};

export const Header: React.FC = () => {
    const { user, logout, showLogin, showHome, showAbout, showLegal } = useAuth();

    const Logo = () => (
        <div className="flex items-center space-x-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h10a2 2 0 002-2v-1a2 2 0 012-2h1.945M7.7 9.3l.03-.02a1 1 0 011.238-1.25l.02.03-2.5 4.5a1 1 0 01-1.24 1.25l-.03-.02-2.5-4.5a1 1 0 011.25-1.24l.02.03L7.5 8.5l.2-.2zM16.3 9.3l.03-.02a1 1 0 011.238-1.25l.02.03-2.5 4.5a1 1 0 01-1.24 1.25l-.03-.02-2.5-4.5a1 1 0 011.25-1.24l.02.03L16.5 8.5l.2-.2zM12 21V10" />
            </svg>
            <h1 className="text-2xl font-bold text-primary">Bar Preppers Connect</h1>
        </div>
    );


    return (
        <header className="bg-surface shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
                <button onClick={showHome} aria-label="Go to Home Page">
                    <Logo />
                </button>
                
                <div className="flex items-center space-x-4">
                    {!user ? (
                        <>
                            <nav className="hidden md:flex items-center space-x-6">
                                <button onClick={showHome} className="font-medium text-on-surface hover:text-primary transition-colors">Home</button>
                                <button onClick={showAbout} className="font-medium text-on-surface hover:text-primary transition-colors">About</button>
                                <button onClick={showLegal} className="font-medium text-on-surface hover:text-primary transition-colors">Legal Services</button>
                            </nav>
                            <div className="flex items-center space-x-2">
                                <ThemeToggleButton />
                                <Button onClick={showLogin} variant="secondary">Login</Button>
                                <Button onClick={showLogin} variant="primary">Get Started</Button>
                            </div>
                        </>
                    ) : (
                        <>
                            <span className="hidden sm:block text-on-surface-secondary">Welcome, {user.name}</span>
                             <ThemeToggleButton />
                            <Button onClick={logout} variant="secondary">Logout</Button>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};