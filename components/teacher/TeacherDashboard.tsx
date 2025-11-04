

import React, { useState } from 'react';
import { Card } from '../student/common/Card';
import GradingInterface from './GradingInterface';
import ContentManager from './ContentManager';

type TeacherView = 'grading' | 'content';

const TeacherDashboard: React.FC = () => {
  const [view, setView] = useState<TeacherView>('grading');

  const renderView = () => {
    switch (view) {
      case 'grading':
        return <GradingInterface />;
      case 'content':
        return <ContentManager />;
      default:
        return <GradingInterface />;
    }
  };

  const TabButton = ({
    label,
    targetView,
    icon,
  }: {
    label: string;
    targetView: TeacherView;
    // FIX: Replaced JSX.Element with React.ReactElement to resolve 'Cannot find namespace JSX' error.
    icon: React.ReactElement;
  }) => (
    <button
      onClick={() => setView(targetView)}
      className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
        view === targetView
          ? 'bg-primary text-background-contrast'
          : 'text-on-surface-secondary hover:bg-surface'
      }`}
    >
        {icon}
        <span>{label}</span>
    </button>
  );

  return (
    <div className="space-y-8">
      <Card>
        <div className="flex flex-col md:flex-row justify-between items-center">
          <h2 className="text-3xl font-bold text-on-surface">Mentor Dashboard</h2>
          <div className="flex space-x-2 mt-4 md:mt-0 p-1 bg-background rounded-lg">
            <TabButton label="Grading" targetView="grading" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M13.586 3.586a2 2 0 112.828 2.828l-7.93 7.93-3.536.354.354-3.536 7.93-7.93z" /><path d="M16 12.5a.5.5 0 01.5.5v1a.5.5 0 01-.5.5H4a.5.5 0 01-.5-.5v-7a.5.5 0 01.5-.5h1a.5.5 0 010 1H4.5v6H16v-.5a.5.5 0 01.5-.5z" /></svg>} />
            <TabButton label="Content" targetView="content" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" /><path fillRule="evenodd" d="M4 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" /></svg>} />
          </div>
        </div>
      </Card>
      
      {renderView()}
    </div>
  );
};

export default TeacherDashboard;
