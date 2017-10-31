import React from 'react';
import moment from 'moment';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { TimeAgo } from '../../Common/TimeAgo';
import { TIME_FORMAT } from '../../../constants';

export const StartNode = ({ label, timestamp }) =>
  <li className="time-label">
    <OverlayTrigger
      placement="right"
      overlay={<Tooltip id={timestamp}>{moment(timestamp).format(TIME_FORMAT)}</Tooltip>}
    >
      <span className="bg-red">
        {label}: <TimeAgo tooltip={false} timestamp={timestamp} />
      </span>
    </OverlayTrigger>
  </li>;
