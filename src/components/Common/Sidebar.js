import React from 'react';
import md5 from 'md5';
import { stringify } from 'query-string';
import { List } from 'immutable';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { compose } from 'recompose';

import { actions as searchActions } from '../../redux/modules/search';
import { selectCurrentKapp } from '../../redux/modules/kinops';

import { MainSidebar } from '../../lib/react-adm-lte/src';

const { UserPanel, SearchForm, Menu, Item } = MainSidebar

const buildMenu = (items, parentId) => {
  return items
    .filter(item => item.parentId === parentId)
    .map(item => {
      const children = buildMenu(items, item.id)

      if (children.size > 0) {
        return (
          <Item
            key={item.id}
            isTreeview
            {...item}
            iconClass={item.iconClass || 'fa fa-circle-o'}>
            <Menu>
              {children}
            </Menu>
          </Item>
        )
      }

      return (
        <Item
          key={item.id}
          {...item}
          iconClass={item.iconClass || 'fa fa-circle-o'}
          />
      )
    })
}

export const SidebarComponent = props => {
  const { profile, categories, push, currentKapp } = props;
  const {catalogSearchInput, submitHandler, searchTerm } = props;

  const staticMenuItems = List([
    {id: '1', parentId: null, title: 'Quick Links', header: true},
    {id: '2', parentId: null, title: 'My Requests', iconClass: 'fa fa-shopping-cart', onClick: () => push("/requests")},
    profile.spaceAdmin &&
      {id: '3', parentId: null, title: `${currentKapp.name} Settings`, iconClass: 'fa fa-cog', onClick: () => push("/settings")},
    {id: '4', parentId: null, title: `${currentKapp.name} Categories`, header: true},
  ]);

  const categoryItems = categories.data
    .filter(category => category.name !== 'Home Page Services')
    .map(category =>
      ({
        id: category.slug,
        parentId: category.parent || null,
        title: category.name,
        iconClass: `fa ${category.icon}`,
        sortOrder: category.sortOrder,
        onClick: () => push(`/categories/${category.slug}`)
      }));

  const menuItems = staticMenuItems.concat(categoryItems);

  return(
    <MainSidebar>
      <UserPanel
        imageUrl={`https://www.gravatar.com/avatar/${md5(profile.email || profile.username)}?d=mm`}
        title={profile.displayName || profile.username}
        statusText=' Online'
        statusClass='text-success' />
      <SearchForm
        placeholder='Search...'
        onSubmit={submitHandler(props)}
        onChange={event => catalogSearchInput(event.target.value)}
        value={searchTerm}
      />
      <Menu isRoot>
        {buildMenu(menuItems, null)}
      </Menu>
    </MainSidebar>
  );
}

export const mapStateToProps = state => ({
  currentKapp: selectCurrentKapp(state),
  categories: state.categories,
  profile: state.kinops.profile,
  searchTerm: state.search.inputValue,
  submitHandler: props => event => {
    event.preventDefault();
    props.push(`/search?${stringify({ q: props.searchTerm })}`);
  },
});

export const mapDispatchToProps = {
  push,
  catalogSearchInput: searchActions.searchInputChange
};

export const Sidebar = compose(
  connect(mapStateToProps, mapDispatchToProps),
)(SidebarComponent);
