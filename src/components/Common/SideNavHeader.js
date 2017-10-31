import React from 'react'
import {connect} from 'react-redux'
import { bundle } from 'react-kinetic-core';
import { getAttributeValue} from '../../helpers';
import { MainHeader } from '../../lib/react-adm-lte/src'
import { actions as layoutActions } from '../../redux/modules/layout'

import { Alerts } from './Alerts';
import { Profile } from './Profile';
import { KappDropdown } from './KappDropdown';

const { Logo, LogoText, Navbar, NavbarMenu, SidebarToggle } = MainHeader;

const SideNavHeaderComponent = ({ kinops, toggleSidebar }) => {
  const companyName = getAttributeValue(kinops.space.attributes, 'Company Name', kinops.space.name);
  const companyAbbr = companyName.replace(/[a-z]/g, '');

  return (
    <MainHeader>
      <Logo href={bundle.kappLocation()}>
        <LogoText isLarge boldTitle={companyName} />
        <LogoText isMini boldTitle={companyAbbr} />
      </Logo>
      <Navbar>
        <SidebarToggle onToggle={toggleSidebar}/>
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
  toggleSidebar: layoutActions.toggleSidebarCollapse,
};

const mapStateToProps = state => ({
  kinops: state.kinops,
});

export const SideNavHeader = connect(mapStateToProps, mapDispatchToProps)(SideNavHeaderComponent);
