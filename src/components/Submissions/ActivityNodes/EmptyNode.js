import React from 'react';

export const EmptyNode = () =>
  <li className="activity-node">
    <i className="fa fa-pencil"/>
    <div className="timeline-item">
      <span className="time" />
      <h3 className="timeline-header">No Activity Yet...</h3>
      <div className="timeline-body">
        <i className="fa fa-refresh fa-spin fa-3x fa-fw"></i>
      </div>
    </div>
  </li>;
