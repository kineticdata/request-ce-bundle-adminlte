import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Seq } from 'immutable';

import { selectCurrentKapp } from '../../redux/modules/kinops';

import { ContentWrapper } from '../../lib/react-adm-lte/src';

const { Header } = ContentWrapper;

export const PageHeaderComponent = props => {
  const { space, currentKapp, title, subTitle, breadcrumbs } = props;

  return(
    <Header title={title} subTitle={subTitle}>
      { breadcrumbs &&
        <ol className="breadcrumb">
          <li>
            <Link to="/">
              <span className="fa fa-home" />
              &nbsp;
              <span>{currentKapp.name || space.name}</span>
            </Link>
          </li>
          {
            Seq(breadcrumbs).butLast().map(
              breadcrumb =>
                <li key={breadcrumb.path}>
                  <Link to={breadcrumb.path}>{breadcrumb.title}</Link>
                </li>,
            )
          }
          <li className="active">
            {Seq(breadcrumbs).last().title}
          </li>
        </ol>
      }
    </Header>
  )
}

const mapStateToProps = state => {
  return{
    loading: state.kinops.alerts.loading,
    space: state.kinops.space,
    currentKapp: selectCurrentKapp(state),
  }
};

export const PageHeader = connect(mapStateToProps)(PageHeaderComponent);
