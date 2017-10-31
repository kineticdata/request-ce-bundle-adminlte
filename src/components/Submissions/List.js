import React from 'react';
import { Link } from 'react-router-dom';

import { NavTab } from '../../lib/react-adm-lte/src'
import { PageHeader } from '../Common/PageHeader';
import { SubmissionRow } from './SubmissionRow';

const {Tab, TabContent, TabPane} = NavTab;

export const List =
({
   submissions,
   counts,
   mode,
   match,
   hasNextPage,
   hasPreviousPage,
   handleNextPage,
   handlePreviousPage,
}) =>
  <div>
    <PageHeader
      title="My Requests"
      subTitle={mode}
      breadcrumbs={[{ title: 'My Requests', path: '/requests' }]}
    />
    <section className="content">
      <div className="nav-tabs-custom">
        <NavTab>
          <Tab active={mode === null}>
            <Link to={match.path}>
              All
            </Link>
          </Tab>
          <Tab active={mode === 'Open'}>
            <Link to={`${match.path}?mode=Open`}>
              Open{' '}
              <span className="badge">{counts.Submitted}</span>
            </Link>
          </Tab>
          <Tab active={mode === 'Closed'}>
            <Link to={`${match.path}?mode=Closed`}>
              Closed{' '}
              <span className="badge">{counts.Closed}</span>
            </Link>
          </Tab>
          <Tab active={mode === 'Draft'}>
            <Link to={`${match.path}?mode=Draft`}>
              Draft{' '}
              <span className="badge">{counts.Draft}</span>
            </Link>
          </Tab>
        </NavTab>
        <TabContent>
          <TabPane active>
            { submissions.length > 0 ? (
              <div>
                <table className="table table-hover datatable nosearch">
                  <thead>
                    <tr>
                      <th>Item Requested</th>
                      <th>Confirmation #</th>
                      <th>Relevant Dates</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      submissions.map(submission =>
                        <SubmissionRow
                          key={submission.id}
                          submission={submission}
                        />
                      )
                    }
                  </tbody>
                </table>
                <ul className="pagination pull-right">
                  {
                    hasPreviousPage &&
                    <li>
                      <a onClick={handlePreviousPage} >Previous Page</a>
                    </li>
                  }
                  {
                    hasNextPage &&
                    <li>
                      <a onClick={handleNextPage} >Next Page</a>
                    </li>
                  }
                </ul>
              </div>
            ):(
              <h5 className="text-center">No Submissions to Display</h5>
            )}
          </TabPane>
        </TabContent>
      </div>
    </section>
  </div>;
