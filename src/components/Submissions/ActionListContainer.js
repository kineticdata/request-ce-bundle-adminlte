import { connect } from 'react-redux';
import { compose, withHandlers } from 'recompose';
import { actions } from '../../redux/modules/submission';
import { actions as modalFormActions } from '../../redux/modules/modalForm';
import * as constants from '../../constants';
import { ActionList } from './ActionList';

export const mapStateToProps = () => ({});

export const mapDispatchToProps = {
  cloneSubmission: actions.cloneSubmission,
  deleteSubmission: actions.deleteSubmission,
  openForm: modalFormActions.openForm,
};

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers({
    addComment: props => () => {
      const formConfig = Object.assign(
        {values: {'Related Submission Id': props.submission.id}}, constants.COMMENT_FORM_CONFIG
      );
      props.openForm(formConfig);
    },
    requestToCancel: props => () => {
      const formConfig = Object.assign(
        {values: {'Related Submission Id': props.submission.id}}, constants.CANCEL_FORM_CONFIG
      );
      props.openForm(formConfig);
    },
    feedback: props => () => {
      const formConfig = Object.assign(
        {values:{ 'Referring Id': props.submission.id }},constants.FEEDBACK_FORM_CONFIG
      );
      props.openForm(formConfig);
    },
    cloneAsDraft: props => () => props.cloneSubmission(props.submission.id),
    cancel: props => () => props.deleteSubmission(props.submission.id),
  }),
);

export const ActionListContainer = enhance(ActionList);
