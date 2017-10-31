import React from 'react';
import { Link } from 'react-router-dom';
import { TimeAgo } from '../Common/TimeAgo';

import * as helpers from '../../helpers';
import * as constants from '../../constants';

const getFormIcon = form =>
  helpers.getAttributeValue(form, constants.ATTRIBUTE_ICON, constants.DEFAULT_FORM_ICON);

const DisplayDateListItem = ({ submission }) =>
  submission.coreState === constants.CORE_STATE_DRAFT ? (
    <dl className="dl-horizontal">
      <dt>Created:{' '}</dt>
      <dd><TimeAgo timestamp={submission.createdAt} /></dd>
    </dl>
  ) : (
    <dl className="dl-horizontal">
      <dt>Submitted:{' '}</dt>
      <dd><TimeAgo timestamp={submission.submittedAt} /></dd>
    </dl>
  );

const EstCompletionListItem = ({ submission }) => {
  const dueDate = helpers.getDueDate(submission, constants.ATTRIBUTE_SERVICE_DAYS_DUE);
  return (
    submission.coreState === constants.CORE_STATE_SUBMITTED &&
    <dl>
      <dt>Est. Completion:{' '}</dt>
      <dd><TimeAgo timestamp={dueDate} /></dd>
    </dl>
  );
};

const ClosedDateListItem = ({ submission }) =>
  submission.coreState === constants.CORE_STATE_CLOSED &&
  <dl>
    <dt>Closed:{' '}</dt>
    <dd><TimeAgo timestamp={submission.closedAt} /></dd>
  </dl>;

export const SubmissionRow = ({ submission }) =>
  <tr className="submission-row">
    <td>
      <h5>
        <i className={`fa fa-fw ${getFormIcon(submission.form)}`} />
        { submission.form.name }
        { submission.label !== submission.form.name &&
          <small>{` (${submission.label })`}</small>
        }
      </h5>
    </td>
    <td>
      { submission.coreState === 'Draft' ? (
        <Link to={`/requests/${submission.id}`}>{submission.handle}</Link>
      ):(
        <Link to={`/requests/${submission.id}/activity`}>{submission.handle}</Link>
      )}
    </td>
    <td>
      <DisplayDateListItem submission={submission} />
      <EstCompletionListItem submission={submission} />
      <ClosedDateListItem submission={submission} />
    </td>
    <td>
      <span className={`label ${helpers.getStatusClass(submission)}`}>
        {helpers.getStatus(submission)}
      </span>
    </td>
  </tr>;
