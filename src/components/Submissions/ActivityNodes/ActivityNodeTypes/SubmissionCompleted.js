import React from 'react';
import { TimeAgo } from '../../../Common/TimeAgo';
import { activityData } from '../../ActivityList';

// Icon for this node type
const Icon = () => {
  return (
    <i className="fa fa-flag-checkered bg-green"/>
  );
};

// Time for this node type
const Time = ({ activity }) => {
  const data = activityData(activity);
  return (
    data.Status ? (
      <span className="time">
        <i className="fa fa-clock-o" />
        {' '}Task Status:{' '}
        <span className="task-status">{data.Status}</span>
      </span>
    ) : (<span/>)
  );
};

// Header for this node type
const Header = ({ activity }) => {
  return (
    <h3 className="timeline-header">{activity.label}</h3>
  );
};

// Body for this node type
const Body = ({ activity, submission }) => {
  const data = activityData(activity);
  return (
    <div className="timeline-body">
      <div className="row">
        <div className="col-sm-4">
          <dl>
            <dt>Closed:</dt>
            <dd><TimeAgo timestamp={activity.createdAt} /></dd>
          </dl>
        </div>
        {
          data.Comments &&
          <div className="col-xs-8">
            <dl>
              <dt>Comments:</dt>
              <dd>{data.Comments}</dd>
            </dl>
          </div>
        }
      </div>
    </div>
  );
};

export const SubmissionCompleted = {
  Icon: Icon,
  Time: Time,
  Header: Header,
  Body: Body,
}
