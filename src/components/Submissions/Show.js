import React from 'react';
import { bundle, CoreForm } from 'react-kinetic-core';
import { ActionListContainer } from './ActionListContainer';
import { ShowConfirmation } from './ShowConfirmation';
import { ActivityList } from './ActivityList';
import { TimeAgo } from '../Common/TimeAgo';
import * as constants from '../../constants';
import * as helpers from '../../helpers';

import { PageHeader } from '../Common/PageHeader';

const globals = import('../../globals');

const getBreadcrumbs = (submission, match) => {
  const result = [{ title: 'My Requests', path: '/requests' }];
  if (submission) {
    result.push({
      title: submission.form.name,
      path: `/requests/${match.params.submissionId}/activity`,
    });
  }
  if (match.params.mode === 'review') {
    result.push({ title: 'Review Request' });
  }
  if (match.params.mode === 'confirmation') {
    result.push({ title: 'Confirmation' });
  }
  return result;
};

const ProfileLink = ({ submitter }) =>
  <a href={`${bundle.spaceLocation()}?page=profile&username=${encodeURIComponent(submitter)}`}>
    { submitter === bundle.identity() ? 'you' : submitter }
  </a>;

const StatusItem = ({ submission }) =>
  <li>
    <em>Status:</em>
    &nbsp;
    <strong>{helpers.getStatus(submission)}</strong>
  </li>;

const DisplayDateItem = ({ submission }) =>
  !submission.submittedAt ? (
    <li>
      <em>Created:</em>
      &nbsp;
      <strong><TimeAgo timestamp={submission.createdAt} /></strong>
      &nbsp;
      <em>by</em>
      &nbsp;
      <strong><ProfileLink submitter={submission.createdBy} /></strong>
    </li>
  ) : (
    <li>
      <em>Submitted:</em>
      &nbsp;
      <strong><TimeAgo timestamp={submission.submittedAt} /></strong>
      &nbsp;
      <em>by</em>
      &nbsp;
      <strong><ProfileLink submitter={submission.submittedBy} /></strong>
    </li>
  );

const ServiceOwnerItem = ({ submission }) => {
  const serviceOwner = helpers.getConfig({
    submission,
    name: constants.ATTRIBUTE_SERVICE_OWNING_TEAM,
  });
  return (
    !!serviceOwner &&
    <li>
      <em>Service Owning Team:</em>
      &nbsp;
      <strong>{serviceOwner} Team</strong>
    </li>
  );
};

const EstCompletionItem = ({ submission }) => {
  const dueDate = helpers.getDueDate(submission, constants.ATTRIBUTE_SERVICE_DAYS_DUE);
  return (
    submission.coreState === constants.CORE_STATE_SUBMITTED &&
    !!dueDate &&
    <li>
      <em>Estimated Completion:</em>
      &nbsp;
      <strong><TimeAgo timestamp={dueDate} /></strong>
    </li>
  );
};

const CompletedInItem = ({ submission }) => {
  const duration = submission.coreState === constants.CORE_STATE_CLOSED &&
    helpers.getDurationInDays(submission.createdAt, submission.closedAt);
  return (
    (duration || duration === 0) &&
    <li>
      <em>Completed in:</em>
      &nbsp;
      <strong>{duration} {duration === 1 ? 'day' : 'days'}</strong>
    </li>
  );
};

export const Show = ({ submission, match }) =>
  submission &&
    <div>
      <PageHeader
        title={submission.label}
        subTitle={`(${submission.handle})`}
        breadcrumbs={getBreadcrumbs(submission, match)}
      />
      <div className="content">
        <div className="row">
          <div className="col-md-4 col-xs-12 ">
            {
              match.params.mode === 'confirmation' &&
              <ShowConfirmation />
            }
            <div className="row">
              <div className="col-xs-12">
                <ul className="list-unstyled">
                  <StatusItem submission={submission} />
                  <DisplayDateItem submission={submission} />
                  <ServiceOwnerItem submission={submission} />
                  <EstCompletionItem submission={submission} />
                  <CompletedInItem submission={submission} />
                </ul>
                <hr />
              </div>
            </div>
            <div className="row">
              <div className="col-xs-12">
                <ActionListContainer
                  submission={submission}
                  mode={match.params.mode}
                />
              </div>
            </div>
          </div>
          <div className="col-md-8 col-xs-12 3">
            {
              match.params.mode === 'review'
                ? <CoreForm submission={submission.id} review globals={globals} />
                : <ActivityList submission={submission} />
            }
          </div>
        </div>
      </div>
    </div>;
