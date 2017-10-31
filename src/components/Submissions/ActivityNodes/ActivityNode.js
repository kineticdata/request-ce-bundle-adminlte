import React from 'react';
import { Approval } from './ActivityNodeTypes/Approval';
import { Default } from './ActivityNodeTypes/Default';
import { Task } from './ActivityNodeTypes/Task';
import { SubmissionSubmitted } from './ActivityNodeTypes/SubmissionSubmitted';
import { SubmissionCompleted } from './ActivityNodeTypes/SubmissionCompleted';

// Helper to get the correct header component given the activity type.
export const getActivityType = activityType => {
  switch (activityType) {
    case 'Approval': return Approval;
    case 'Submission Completed': return SubmissionCompleted;
    case 'Submission Submitted': return SubmissionSubmitted;
    case 'Task': return Task;
    default: return Default;
  }
};

export const ActivityNode = props => {
  const ActivityType = getActivityType(props.activity.type);
  return (
    <li className="activity-node">
      <ActivityType.Icon {...props}/>
      <div className="timeline-item">
        <ActivityType.Time {...props}/>
        <ActivityType.Header {...props}/>
        <ActivityType.Body {...props}/>
      </div>
    </li>
  );
};
