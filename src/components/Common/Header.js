import React from 'react'
import {connect} from 'react-redux'
import { push } from 'connected-react-router';
import { bundle } from 'react-kinetic-core';
import { getAttributeValue} from '../../helpers';
import { MainHeader } from '../../lib/react-adm-lte/src'
import { actions as layoutActions } from '../../redux/modules/layout'

import { Alerts } from './Alerts';
import { Profile } from './Profile';
import { KappDropdown } from './KappDropdown';

const { Logo, LogoText, Navbar, NavbarMenu, SidebarToggle } = MainHeader;

const HeaderComponent = ({ kinops, toggleSidebar, push, topNavigation }) => {
  const companyName = getAttributeValue(kinops.space.attributes, 'Company Name', kinops.space.name);
  const companyAbbr = companyName.replace(/[a-z]/g, '');
  const CompanyLogoSideNav = () =>
    <Logo href={bundle.kappLocation()}>
      <LogoText isLarge boldTitle={companyName} />
      <LogoText isMini boldTitle={companyAbbr} />
    </Logo>;

  const CompanyLogoTopNav = () =>
    <a href={bundle.kappLocation()} className="navbar-brand">
      {companyName}
    </a>;

  return (
    <MainHeader>
      { !topNavigation && <CompanyLogoSideNav /> }
      <Navbar>
        { topNavigation ? <CompanyLogoTopNav /> : <SidebarToggle onToggle={toggleSidebar}/> }
        <NavbarMenu>
          <Alerts />
          <KappDropdown />
          <Profile />
        </NavbarMenu>
      </Navbar>
    </MainHeader>
  )
}

const mapDispatchToProps = {
  push,
  toggleSidebar: layoutActions.toggleSidebar,
};

const mapStateToProps = state => ({
  kinops: state.kinops,
  topNavigation: state.layout.topNavigation,
});

export const Header = connect(mapStateToProps, mapDispatchToProps)(HeaderComponent);
