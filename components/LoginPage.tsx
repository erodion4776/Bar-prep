
import React, { useState } from 'react';
import { useAuth, useData } from '../App';
import { Button } from './student/common/Button';
import { Card } from './student/common/Card';
import { Role } from '../types';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const { login, register } = useAuth();
  const { users } = useData();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isRegistering) {
        if (email && name) {
            register(name, email);
        }
    } else {
        if (email) {
            login(email);
        }
    }
  };
  
  const quickLogin = (userEmail: string | undefined) => {
      if (userEmail) {
        setEmail(userEmail);
        login(userEmail);
      } else {
        alert('Demo user account not found in the current data.');
      }
  }
  
  const toggleMode = () => {
      setIsRegistering(!isRegistering);
      setEmail('');
      setName('');
  }

  const studentUser = users.find(u => u.role === Role.STUDENT);
  const teacherUser = users.find(u => u.role === Role.TEACHER);

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-100px)]">
      <Card className="max-w-md w-full" title={isRegistering ? "Create Your Account" : "Login to Your Account"}>
        <form onSubmit={handleSubmit} className="space-y-6">
          {isRegistering && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-on-surface-secondary">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 bg-surface border border-on-surface/20 rounded-md shadow-sm text-on-surface placeholder-on-surface-secondary focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                  placeholder="Alex Candidate"
                  required
                />
              </div>
          )}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-on-surface-secondary">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-surface border border-on-surface/20 rounded-md shadow-sm text-on-surface placeholder-on-surface-secondary focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              placeholder="you@example.com"
              required
            />
          </div>
          <Button type="submit" className="w-full">
            {isRegistering ? 'Register' : 'Login'}
          </Button>
        </form>
        
        <div className="mt-6 text-center">
            <button onClick={toggleMode} className="text-sm text-primary hover:underline">
                {isRegistering ? "Already have an account? Login" : "Don't have an account? Sign Up"}
            </button>
        </div>

        {!isRegistering && (
             <div className="mt-6">
                <p className="text-center text-sm text-on-surface-secondary">Or use a demo account:</p>
                <div className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <Button onClick={() => quickLogin(studentUser?.email)} variant="secondary" disabled={!studentUser}>Login as Candidate</Button>
                    <Button onClick={() => quickLogin(teacherUser?.email)} variant="secondary" disabled={!teacherUser}>Login as Mentor</Button>
                </div>
            </div>
        )}
      </Card>
    </div>
  );
};

export default LoginPage;
