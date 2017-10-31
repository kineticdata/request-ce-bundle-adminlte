import React from 'react';
import { connect } from 'react-redux';
import { parse } from 'query-string';
import { Link } from 'react-router-dom';

import { PageHeader } from '../Common/PageHeader';
import { FormCardLarge } from '../Forms/FormCard';

const matches = (form, term) =>
  form.name.toLowerCase().includes(term.toLowerCase()) ||
  (form.description && form.description.toLowerCase().includes(term.toLowerCase()));

  export const SearchResultsComponent = ({ query, forms }) =>
    <div>
      <PageHeader
        title={`Search${query ? ' results for:' : ''}`}
        subTitle={query}
        breadcrumbs={[{ title: 'Search' }]}
      />
      <div className="content">
        {
          forms.size > 0 ? (
            forms.map(form => <FormCardLarge form={form} key={form.slug} />)
          ) :(
            <div className="alert alert-warning">
              <h4>Woops!</h4>
              <p>
                No Results Found for <strong>{query}</strong>
                <span className="pull-right" >
                  <Link to="/categories">
                    <span>Try Browsing Categories</span>
                    &nbsp;
                    <span className="fa fa-caret-right" />
                  </Link>
                </span>
              </p>
            </div>
          )
        }
      </div>
    </div>;


const mapStateToProps = (state, props) => {
  const query = parse(props.location.search).q;
  return {
    query,
    forms: state.forms.data.filter(form => matches(form, query)),
  };
};

export const SearchResults = connect(mapStateToProps)(SearchResultsComponent);
