import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';

import { actions as kinopsActions } from '../redux/modules/kinops';

import { Layout, ContentWrapper } from '../lib/react-adm-lte/src'
import { Loading } from './Common/Loading';
import { TopNavHeader } from './Common/TopNavHeader';
import { SideNavHeader } from './Common/SideNavHeader';
import { Sidebar } from './Common/Sidebar';
import { Footer } from './Common/Footer';
import { Router } from './Router';
import { ModalForm } from './Common/ModalForm';

import '../styles';

export const AppComponent = props => {
  if (props.loading) {
    return <Loading text="App is loading ..." />;
  }
  const { topNavigation } = props;
  return (
    <Layout {...props}>
      { topNavigation && <TopNavHeader /> }
      { !topNavigation && <SideNavHeader /> }
      { !topNavigation && <Sidebar /> }
      <ContentWrapper>
        <Route path="/" component={Router} />
        <ModalForm />
      </ContentWrapper>
      <Footer />
    </Layout>
  );
};

const mapStateToProps = state => {
  const { kinops, layout } = state;
  const { sidebarCollapsed, sidebarMini, boxed, fixed, topNavigation, skin } = layout
  return {
    loading: kinops.loading,
    sidebarCollapse: sidebarCollapsed,
    sidebarMini,
    boxed,
    fixed,
    topNavigation,
    skin,
  };
};

const mapDispatchToProps = {
  loadApp: kinopsActions.loadApp,
};

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentWillMount() {
      this.props.loadApp();
    },
  }),
);

export const App = enhance(AppComponent);
