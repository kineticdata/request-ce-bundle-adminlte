import React from 'react';
import moment from 'moment';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { TimeAgo } from '../../Common/TimeAgo';
import { TIME_FORMAT } from '../../../constants';

export const EndNode = ({ timestamp }) =>
  <li className="time-label">
    <OverlayTrigger
      placement="right"
      overlay={<Tooltip>{moment(timestamp).format(TIME_FORMAT)}</Tooltip>}
    >
      <span className="bg-red">
        Finished: <TimeAgo tooltip={false} timestamp={timestamp} />
      </span>
    </OverlayTrigger>
  </li>;
