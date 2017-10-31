import React from 'react';
import { bundle } from 'react-kinetic-core';
import * as helpers from '../../helpers';
import * as constants from '../../constants';
import { TimeAgo } from '../Common/TimeAgo';

const blank = string => !string || string.length === 0;

const RequestedByListItem = ({ submission }) =>
  !blank(submission.values[constants.REQUESTED_BY_FIELD]) &&
  submission.values[constants.REQUESTED_BY_FIELD] !== bundle.identity() &&
  <li>
    <em>Requested For</em>
    &nbsp;
    <strong>
      {
        !blank(submission.values[constants.REQUESTED_BY_DISPLAY_NAME_FIELD])
          ? submission.values[constants.REQUESTED_BY_DISPLAY_NAME_FIELD]
          : submission.values[constants.REQUESTED_BY_FIELD]
      }
    </strong>
  </li>;

const RequestedForListItem = ({ submission }) =>
  !blank(submission.values[constants.REQUESTED_FOR_FIELD]) &&
  submission.values[constants.REQUESTED_FOR_FIELD] !== bundle.identity() &&
  <li>
    <em>Requested For</em>
    &nbsp;
    <strong>
      {
        !blank(submission.values[constants.REQUESTED_FOR_DISPLAY_NAME_FIELD])
          ? submission.values[constants.REQUESTED_FOR_DISPLAY_NAME_FIELD]
          : submission.values[constants.REQUESTED_FOR_FIELD]
      }
    </strong>
  </li>;

const ConfirmationNumListItem = ({ submission }) =>
  <li>
    <em>Confirmation #:</em>
    &nbsp;
    <strong>{submission.handle}</strong>
  </li>;

const DisplayDateListItem = ({ submission }) =>
  submission.coreState === constants.CORE_STATE_DRAFT ? (
    <li>
      <em>Created:</em>
      &nbsp;
      <strong><TimeAgo timestamp={submission.createdAt} /></strong>
    </li>
  ) : (
    <li>
      <em>Submitted:</em>
      &nbsp;
      <strong><TimeAgo timestamp={submission.submittedAt} /></strong>
    </li>
  );

const EstCompletionListItem = ({ submission }) => {
  const dueDate = helpers.getDueDate(submission, constants.ATTRIBUTE_SERVICE_DAYS_DUE);
  return (
    submission.coreState === constants.CORE_STATE_SUBMITTED &&
    <li>
      <em>Est. Completion:</em>
      &nbsp;
      <strong><TimeAgo timestamp={dueDate} /></strong>
    </li>
  );
};

const ClosedDateListItem = ({ submission }) =>
  submission.coreState === constants.CORE_STATE_CLOSED &&
  <li>
    <em>Closed:</em>
    &nbsp;
    <strong><TimeAgo timestamp={submission.closedAt} /></strong>
  </li>;

export const DetailList = ({ submission, abbreviated }) =>
  <ul className="list-inline meta">
    {!abbreviated && <RequestedForListItem submission={submission} />}
    {!abbreviated && <RequestedByListItem submission={submission} />}
    <ConfirmationNumListItem submission={submission} />
    <DisplayDateListItem submission={submission} />
    <EstCompletionListItem submission={submission} />
    <ClosedDateListItem submission={submission} />
  </ul>;
