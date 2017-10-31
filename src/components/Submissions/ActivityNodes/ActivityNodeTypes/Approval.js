import React from 'react';
import { TimeAgo } from '../../../Common/TimeAgo';
import { activityData } from '../../ActivityList';

// Helper for getting the right icon based on status
const getIcon = data => {
  switch (data.Status) {
    case 'Approved':
      return 'fa-thumbs-o-up';
    case 'Denied':
      return 'fa-thumbs-o-down';
    default:
      return 'fa-pencil-square-o';
  }
};

// Icon for this node type
export const Icon = ({ activity }) => {
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
                <dt>Approver:</dt>
                <dd>
                  {
                    data['Assigned Team'] && data['Assigned Individual']
                      ? `${data['Assigned Team']} > ${data['Assigned Individual']}`
                      : data['Assigned Team'] || data['Assigned Individual']
                  }
                </dd>
              </span>
          }
          {
            data.Status !== 'In Progress' && data.Decision &&
            <span>
              <dt className="title">Decision:</dt>
              <dd>{data.Decision}</dd>
            </span>
          }
          {
            data.Status === 'Denied' && data['Denial Reason'] &&
            <span>
              <dt className="title">Denial Reason:</dt>
              <dd>{data['Denial Reason']}</dd>
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

export const Approval = {
  Icon: Icon,
  Time: Time,
  Header: Header,
  Body: Body,
}
