import React from 'react';
import { useAuth } from '../../App';
import { PlanType, TimetableEntry } from '../../types';
import { Card } from './common/Card';
import DailyScheduleView from './DailyScheduleView';
import { useData } from '../../App';

const StudentDashboard: React.FC = () => {
  const { user } = useAuth();
  const { timetableCrash, timetableIntensive, timetableFull, plans } = useData();

  if (!user || !user.plan) {
    return <div>Loading user data...</div>;
  }

  const plan = plans.find(p => p.id === user.plan);

  let timetable: TimetableEntry[] = [];
  switch (user.plan) {
    case PlanType.CRASH_COURSE:
      timetable = timetableCrash;
      break;
    case PlanType.INTENSIVE:
      timetable = timetableIntensive;
      break;
    case PlanType.FULL:
      timetable = timetableFull;
      break;
  }
  
  const currentDay = 14; // Mock current day
  const nextAction = timetable.find(t => t.day >= currentDay);

  if (!plan) {
    return <div>Error: Plan not found.</div>;
  }

  return (
    <div className="space-y-8">
      <Card>
        <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
                <h2 className="text-3xl font-bold text-on-surface">Welcome back, {user.name}!</h2>
                <p className="mt-1 text-on-surface-secondary">You are on the <span className="font-semibold text-primary">{plan?.name}</span>.</p>
            </div>
            <div className="mt-4 md:mt-0 text-center md:text-right">
                <p className="text-lg font-medium text-on-surface">Next Up: Day {nextAction?.day}</p>
                <p className="text-on-surface-secondary">Keep up the great work!</p>
            </div>
        </div>
      </Card>
      
      <DailyScheduleView timetable={timetable} planDuration={plan.duration} />
    </div>
  );
};

export default StudentDashboard;