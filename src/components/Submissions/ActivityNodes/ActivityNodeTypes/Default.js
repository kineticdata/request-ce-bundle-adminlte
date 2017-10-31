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
      return 'fa fa-pencil-square-o bg-';
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
export const Header = ({ activity }) =>
  <h3 className="timeline-header">{activity.label}</h3>

// Helper for Activity Data
const ActivityDataItem = ({ label, value }) =>
  <dl>
    {label !== 'STRING' && <dt className={'title'}>{label}</dt>}
    <dd>{value}</dd>
  </dl>;

// Body for this node type
export const Body = ({ activity }) => {
  const data = activityData(activity);
  return (
    <div className="timeline-body">
      <div className="row">
        <div className="col-sm-4">
          <dl>
            <dt>Created:</dt>
            <dd><TimeAgo timestamp={activity.createdAt} /></dd>
            <dt>Updated:</dt>
            <dd><TimeAgo timestamp={activity.updatedAt} /></dd>
          </dl>
        </div>
        <div className="col-sm-8">
          {
            Object.keys(data)
              // map to a list of objects with label, value, and key properties
              .map(key => ({ key, label: key, value: data[key] }))
              // filter out keys with falsey values
              .filter(({ value }) => value)
              .map(props => <ActivityDataItem {...props} />)
          }
        </div>
      </div>
    </div>
  );
};

export const Default = {
  Icon: Icon,
  Time: Time,
  Header: Header,
  Body: Body,
}
