import React from 'react';
import { connect } from 'react-redux';
import { compose, withHandlers } from 'recompose';
import * as constants from '../../constants';
import { actions } from '../../redux/modules/modalForm';

export const ShowConfirmation = ({ handleOpenFeedback }) =>
  <div>
    <div className="row">
      <div className="col-sm-12"><h4>Thank you for your submission.</h4></div>
    </div>
    <div className="row">
      <div className="col-sm-12">
        <p>
          With&nbsp;
          <a onClick={handleOpenFeedback} role="button" tabIndex={0}>
            Feedback
          </a>
          &nbsp;we are able to continuously improve.
        </p>
      </div>
    </div>
    <hr />
  </div>;

const enhance = compose(
  connect(null, { openForm: actions.openForm }),
  withHandlers({
    handleOpenFeedback: props => () => props.openForm(constants.FEEDBACK_FORM_CONFIG),
  }),
);

export const ShowConfirmationContainer = enhance(ShowConfirmation);
