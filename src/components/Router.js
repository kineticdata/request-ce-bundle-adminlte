import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { compose, lifecycle } from 'recompose';

import { actions as categoriesActions } from '../redux/modules/categories';
import { actions as formsActions } from '../redux/modules/forms';
import { actions as submissionsActions } from '../redux/modules/submissions';

import { Loading } from './Common/Loading';
import { Kapp } from './Kapp/Kapp';
import { CategoryList } from './Kapp/CategoryList';
import { Category } from './Kapp/Category';
import { SearchResults } from './Kapp/SearchResults';
import { FormContainer } from './Forms/FormContainer';
import { ListContainer } from './Submissions/ListContainer';
import { ShowContainer } from './Submissions/ShowContainer';
import { Settings } from './Settings/Settings';

const RouterComponent = ({ loading }) => {
  if (loading) {
    return <Loading text="App is loading ..." />;
  }
  return (
    <Switch>
      <Route exact path="/categories" component={CategoryList} />
      <Route exact path="/categories/:categorySlug" component={Category} />
      <Route path="/categories/:categorySlug/:formSlug" component={FormContainer} />
      <Route path="/forms/:formSlug" component={FormContainer} />
      <Route exact path="/search" component={SearchResults} />
      <Route exact path="/requests" component={ListContainer} />
      <Route exact path="/requests/:submissionId" component={FormContainer} />
      <Route exact path="/requests/:submissionId/:mode" component={ShowContainer} />
      <Route exact path="/settings" component={Settings} />
      <Route component={Kapp} />
    </Switch>
  );
};

const mapStateToProps = state => ({
  loading: state.kinops.loading || state.categories.loading || state.forms.loading || state.submissions.loading,
});

const mapDispatchToProps = {
  fetchCategories: categoriesActions.fetchCategories,
  fetchForms: formsActions.fetchForms,
  fetchSubmissions: submissionsActions.fetchSubmissions,
};

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentWillMount() {
      this.props.fetchCategories();
      this.props.fetchForms();
      this.props.fetchSubmissions();
    },
  }),
);

export const Router = enhance(RouterComponent);
