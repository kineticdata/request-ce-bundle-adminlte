import React from 'react';
import { TimeAgo } from '../../../Common/TimeAgo';
import { activityData } from '../../ActivityList';

// Helper for getting the right icon based on status
const getIcon = data => {
  switch (data.Status) {
    case 'Completed':
      return 'fa-check-circle-o bg-green';
    case 'In Progress':
      return 'fa fa-wrench bg-yellow';
    default:
      return 'fa fa-pencil-square-o bg-yellow';
  }
};

// Icon for this node type
const Icon = ({ activity }) => {
  const data = activityData(activity);
  return (
    <i className={`${getIcon(data)}`}/>
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
const Body = ({ activity }) => {
  const data = activityData(activity);
  return (
    <div className="timeline-body">
      <div className="row">
        <div className="col-sm-4">
          <dl>
            <dt>Created:</dt>
            <dd><TimeAgo timestamp={activity.createdAt} /></dd>
            <dt>Updated: </dt>
            <dd><TimeAgo timestamp={activity.updatedAt} /></dd>
          {
            (data['Assigned Team'] || data['Assigned Individual']) &&
              <span>
                <dt>Assignee:</dt>
                <dd>
                  {
                    data['Assigned Team'] && data['Assigned Individual']
                      ? `${data['Assigned Team']} > ${data['Assigned Individual']}`
                      : data['Assigned Team'] || data['Assigned Individual']
                  }
                </dd>
              </span>
          }
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

export const Task = {
  Icon: Icon,
  Time: Time,
  Header: Header,
  Body: Body,
}
