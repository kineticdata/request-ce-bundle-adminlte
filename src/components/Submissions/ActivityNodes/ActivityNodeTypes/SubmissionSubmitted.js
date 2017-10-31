import React from 'react';
import { TimeAgo } from '../../../Common/TimeAgo';
import { activityData } from '../../ActivityList';

export const Icon = () => {
  return (
    <i className="fa fa-handshake-o bg-green"/>
  );
};

// Time for this node type
const Time = ({ activity }) => {
  return (
    <span className="time">
      <i className="fa fa-clock-o" />
      {' '}Task Status:{' '}
      <span className="task-status">Complete</span>
    </span>
  );
};

const Header = ({ activity }) =>
  <h3 className="timeline-header">{activity.label}</h3>;

const Body = ({ activity, submission }) => {
  const data = activityData(activity);
  return (
    <div className="timeline-body">
      <div className="row">
        <div className="col-sm-4">
          <dl>
            <dt>Submitted:</dt>
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

export const SubmissionSubmitted = {
  Icon: Icon,
  Time: Time,
  Header: Header,
  Body: Body,
}
