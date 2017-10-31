import React from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import { push } from 'connected-react-router';
import { stringify } from 'query-string';
import { bundle } from 'react-kinetic-core';
import { getAttributeValue} from '../../helpers';
import { MainHeader } from '../../lib/react-adm-lte/src';

import { actions as layoutActions } from '../../redux/modules/layout';
import { actions as searchActions } from '../../redux/modules/search';
import { selectCurrentKapp } from '../../redux/modules/kinops';

import { Alerts } from './Alerts';
import { Profile } from './Profile';
import { KappDropdown } from './KappDropdown';

const { GenericDropdown } = MainHeader;

const { Navbar, NavbarMenu, TopNavMenuLeft, TopNavToggle, SearchForm } = MainHeader;

const TopNavHeaderComponent = props => {
  const { kinops, currentKapp, categories } = props;
  const { toggleTopNav, topNavOpen, toggleCategories, categoriesOpen } = props;
  const { submitHandler, searchTerm, catalogSearchInput } = props;

  const companyName = getAttributeValue(kinops.space.attributes, 'Company Name', kinops.space.name);

  const CompanyLogoTopNav = () =>
    <a href={bundle.kappLocation()} className="navbar-brand">
      <strong>{companyName}</strong>
    </a>;

  return (
    <MainHeader>
      <Navbar>
        <div className="navbar-header">
          <CompanyLogoTopNav />
          <TopNavToggle onToggle={toggleTopNav} />
        </div>
        <TopNavMenuLeft open={topNavOpen}>
          <li>
            <Link to="/requests">My Requests</Link>
          </li>
          <GenericDropdown
            open={categoriesOpen}
            onToggle={toggleCategories}
            label={` ${currentKapp.name} Categories`}
            iconClass="fa fa-caret-down"
          >
            {
              categories.data
                .filter(category => category.name !== 'Home Page Services')
                .map(category =>
                  <li key={category.slug}>
                    <Link to={`/categories/${category.slug}`}>
                      <i className={`fa ${category.icon}`} /> {category.name}
                    </Link>
                  </li>
                )
            }
          </GenericDropdown>
          <SearchForm
            placeholder='Search...'
            onSubmit={submitHandler(props)}
            onChange={event => catalogSearchInput(event.target.value)}
            value={searchTerm}
          />
        </TopNavMenuLeft>
        <NavbarMenu>
          <Alerts />
          <KappDropdown />
          <Profile />
        </NavbarMenu>
      </Navbar>
    </MainHeader>
  )
}

const mapStateToProps = state => ({
  currentKapp: selectCurrentKapp(state),
  topNavOpen: state.layout.topNavCollapsed,
  categoriesOpen: state.layout.categories.open,
  categories: state.categories,
  kinops: state.kinops,
  searchTerm: state.search.inputValue,
  submitHandler: props => event => {
    event.preventDefault();
    props.push(`/search?${stringify({ q: props.searchTerm })}`);
  },
});

const mapDispatchToProps = {
  push,
  toggleTopNav: layoutActions.toggleTopNavCollapse,
  toggleCategories: layoutActions.toggleCategories,
  catalogSearchInput: searchActions.searchInputChange,
};

export const TopNavHeader = connect(mapStateToProps, mapDispatchToProps)(TopNavHeaderComponent);
