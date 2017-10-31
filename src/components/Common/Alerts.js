import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { bundle } from 'react-kinetic-core';
import { MainHeader } from '../../lib/react-adm-lte/src'

import { isGuest } from '../../helpers/utils';
import { actions as alertActions } from '../../redux/modules/kinops';
import { actions as layoutActions } from '../../redux/modules/layout';

const { Notifications, NotificationItem } = MainHeader;

export const mapStateToProps = ({ kinops, layout }) => ({
  loading: kinops.alerts.loading,
  alerts: kinops.alerts.data,
  isAdmin: kinops.profile.spaceAdmin,
  isGuest: !kinops.loading ? isGuest(kinops.profile) : false,
  isOpen: layout.notifications.open
});

export const mapDispatchToProps = {
  fetchAlerts: alertActions.fetchAlerts,
  toggleAlerts: layoutActions.toggleNotifications,
};

export const AlertsComponent = ({alerts, loading, toggleAlerts, isOpen}) => {
  return(
    !loading &&
      <Notifications
        label={alerts.size}
        header={`You have ${alerts.size} notifications`}
        footer="View all alerts"
        onToggle={toggleAlerts}
        open={isOpen}
        onClickFooter={() => window.location = `${bundle.spaceLocation()}/#/alerts`}
      >
        { alerts.map(alert =>
          <NotificationItem
            key={alert.id}
            title={alert.values['Title']}
            onClick={() => window.location = `${bundle.spaceLocation()}/#/alerts/${alert.id}`}
          />
        )}
      </Notifications>
  );
}

export const Alerts = compose(
  connect(mapStateToProps, mapDispatchToProps),
)(AlertsComponent);
