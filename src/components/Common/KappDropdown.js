import React from 'react'
import {connect} from 'react-redux'
import { bundle } from 'react-kinetic-core';
import { getAttributeValue } from '../../helpers';
import { actions as layoutActions } from '../../redux/modules/layout';
import * as selectors from '../../redux/modules/kinops';

import { MainHeader } from '../../lib/react-adm-lte/src';
const { GenericDropdown } = MainHeader;

const KappDropdownItem = ({href, icon, title}) =>
  <li >
    <a href={href}>
      <i className={`fa fa-fw ${icon}`}/> {title}
    </a>
  </li>

const KappDropdownComponent = ({
  profile, kapps, toggleKapps, isOpen,
  isGuest, hasAccessToManagement, hasAccessToSupport,
  currentKapp, adminKapp, predefinedKapps, additionalKapps,
}) => (
    <GenericDropdown
      open={isOpen}
      onToggle={toggleKapps}
      labelClass={'fa fa-th'}
    >
      <KappDropdownItem
        href={bundle.spaceLocation()}
        icon="fa-home"
        title="Home"
      />
      <li role="separator" className="divider"></li>
      {
        predefinedKapps.map(thisKapp =>
          <KappDropdownItem
            key={thisKapp.slug}
            href={bundle.kappLocation(thisKapp.slug)}
            icon={(getAttributeValue(thisKapp, 'Icon') || 'fa-book')}
            title={thisKapp.name}
          />
        )
      }
      {
        additionalKapps.map(thisKapp =>
          <KappDropdownItem
            key={thisKapp.slug}
            href={bundle.kappLocation(thisKapp.slug)}
            icon={(getAttributeValue(thisKapp, 'Icon') || 'fa-book')}
            title={thisKapp.name}
          />
        )
      }
      { (hasAccessToManagement || hasAccessToSupport) && <li role="separator" className="divider"></li> }
      { hasAccessToManagement &&
        <KappDropdownItem href={bundle.kappLocation(adminKapp.slug)} title="Admin Console" icon="fa-gear" />
      }
      { hasAccessToSupport &&
        <KappDropdownItem
          icon="fa-clipboard"
          title="Submission Support"
          href={`${bundle.kappLocation(adminKapp.slug)}/submission-support`}
        />
      }
    </GenericDropdown>
  );

const mapDispatchToProps = {
  toggleKapps: layoutActions.toggleKapps,
};

const mapStateToProps = state => ({
  isOpen: state.layout.kapps.open,
  profile: state.kinops.profile,
  kapps: state.kinops.kapps,
  hasAccessToManagement: selectors.selectHasAccessToManagement(state),
  hasAccessToSupport: selectors.selectHasAccessToSupport(state),
  isGuest: selectors.selectIsGuest(state),
  adminKapp: selectors.selectAdminKapp(state),
  predefinedKapps: selectors.selectPredefinedKapps(state),
  additionalKapps: selectors.selectAdditionalKapps(state),
  currentKapp: selectors.selectCurrentKapp(state),
});

export const KappDropdown = connect(mapStateToProps, mapDispatchToProps)(KappDropdownComponent);
