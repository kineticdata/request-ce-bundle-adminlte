import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import { actions } from '../../redux/modules/submission';
import { Show } from './Show';

export const mapStateToProps = state => ({
  submission: state.submission.data,
});

export const mapDispatchToProps = {
  clearSubmission: actions.clearSubmission,
  fetchSubmission: actions.fetchSubmission,
  startPoller: actions.startSubmissionPoller,
  stopPoller: actions.stopSubmissionPoller,
};

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentWillMount() {
      this.props.fetchSubmission(this.props.match.params.submissionId);
      this.props.startPoller(this.props.match.params.submissionId);
    },
    componentWillUnmount() {
      this.props.clearSubmission();
      this.props.stopPoller();
    },
  }),
);

export const ShowContainer = enhance(Show);
