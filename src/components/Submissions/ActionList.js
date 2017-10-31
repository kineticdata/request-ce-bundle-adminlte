import React from 'react';
import { Link } from 'react-router-dom';
import { ButtonToolbar, Button } from 'react-bootstrap';

const ActivityDetailsLink = submission =>
  submission.coreState !== 'Draft' &&
    <Link to={`/requests/${submission.id}/activity`}>
      <Button bsStyle="info">Activity Details</Button>
    </Link>;

const ContinueLink = submission =>
  submission.coreState === 'Draft' &&
    <Link to={`/requests/${submission.id}`}>
      <Button bsStyle="btn btn-tertiary">Continue</Button>
    </Link>;

const AddCommentLink = (submission, handleClick, mode) =>
  submission.coreState === 'Submitted' &&
    <Button block bsStyle="success" onClick={handleClick}>
      Add Comment
    </Button>;

const CloneAsDraftLink = (submission, handleClick, mode) =>
  <Button block bsStyle="warning" onClick={handleClick}>
    Clone as Draft
  </Button>;

const RequestToCancelLink = (submission, handleClick, mode) =>
  submission.coreState === 'Submitted' &&
    <Button block bsStyle="danger" onClick={handleClick}>
      Request to Cancel
    </Button>;

const FeedbackLink = (submission, handleClick, mode) =>
  submission.coreState === 'Closed' &&
    <Button block bsStyle="primary" onClick={handleClick}>
      Feedback
    </Button>;

const CancelLink = (submission, handleClick, mode) =>
  submission.coreState === 'Draft' &&
    <Button block bsStyle="danger" onClick={handleClick}>
      Cancel
    </Button>;

const ReviewRequestLink = (submission, mode) =>
  submission.coreState !== 'Draft' &&
    <Link className="btn btn-info btn-block" to={`/requests/${submission.id}/review`}>
      Review Request
    </Link>;

export const ActionList =
  ({
     submission,
     addComment,
     cloneAsDraft,
     requestToCancel,
     feedback,
     cancel,
     mode,
  }) =>

    <div>
      <ButtonToolbar>
        { (!mode || mode === 'review') && ActivityDetailsLink(submission) }
        { ContinueLink(submission) }
        { AddCommentLink(submission, addComment, mode) }
        { CloneAsDraftLink(submission, cloneAsDraft, mode) }
        { RequestToCancelLink(submission, requestToCancel, mode) }
        { FeedbackLink(submission, feedback, mode) }
        { CancelLink(submission, cancel, mode) }
        { mode !== 'review' && ReviewRequestLink(submission, mode) }
      </ButtonToolbar>
    </div>;
