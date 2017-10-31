import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Box } from  '../../lib/react-adm-lte/src';

import { SubmissionRow } from '../Submissions/SubmissionRow';

const { Header, Footer, Body } = Box;

const HomePageSubmissionsComponent = ({ submissions, loading }) => {
  return (
    !loading &&
      <div className="col-md-8">
        <Box primary>
          <Header border title="My Recent Requests"/>
          <Body>
            <div className="table-responsive">
              <table className="table table-hover datatable nosearch">
                <thead>
                    <tr>
                        <th>Item Requested</th>
                        <th>Details</th>
                        <th>Date Submitted</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                  {submissions.map(submission =>
                    <SubmissionRow key={submission.id} submission={submission}/>
                  )}
                </tbody>
              </table>
            </div>
          </Body>
          <Footer>
            <center>
              <Link to={'/requests'}>View All Requests</Link>
            </center>
          </Footer>
        </Box>
      </div>
  );
};

const mapStateToProps = state => ({
  loading: state.kinops.loading || state.submissions.loading,
  submissions: state.submissions.data,
});

export const HomePageSubmissions = connect(mapStateToProps)(HomePageSubmissionsComponent);
