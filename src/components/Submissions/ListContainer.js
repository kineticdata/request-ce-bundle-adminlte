import { connect } from 'react-redux';
import { compose, lifecycle, withHandlers, withProps } from 'recompose';
import { parse } from 'query-string';
import { List } from './List';
import * as constants from '../../constants';
import { actions as submissionsActions } from '../../redux/modules/submissions';
import { actions as submissionCountsActions } from '../../redux/modules/submissionCounts';

const mapStateToProps = state => ({
  submissions: state.submissions.data,
  hasNextPage: !!state.submissions.next,
  hasPreviousPage: !state.submissions.previous.isEmpty(),
  counts: state.submissionCounts.data,
});

const mapDispatchToProps = {
  fetchSubmissions: submissionsActions.fetchSubmissions,
  fetchNextPage: submissionsActions.fetchNextPage,
  fetchPreviousPage: submissionsActions.fetchPreviousPage,
  fetchSubmissionCounts: submissionCountsActions.fetchSubmissionCounts,
};

const parseModeParameter = location => {
  const params = parse(location.search);
  return (params.mode && params.mode.length > 0)
    ? params.mode
    : null;
};

// converts the user-friendly mode parameter into the appropriate coreState value
const translateMode = mode =>
  mode === 'Open' ? constants.CORE_STATE_SUBMITTED : mode;

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withProps(props => ({
    mode: parseModeParameter(props.location),
    coreState: translateMode(parseModeParameter(props.location)),
  })),
  withHandlers({
    handleNextPage: props => () => props.fetchNextPage(props.coreState),
    handlePreviousPage: props => () => props.fetchPreviousPage(props.coreState),
  }),
  lifecycle({
    componentWillMount() {
      // this.props.fetchSubmissions(translateMode(this.props.mode));
      this.props.fetchSubmissionCounts();
    },
    componentWillUpdate(nextProps) {
      if (this.props.mode !== nextProps.mode) {
        this.props.fetchSubmissions(translateMode(nextProps.mode));
      }
    },
  }),
);

export const ListContainer = enhance(List);
