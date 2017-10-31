import React from 'react';
import md5 from 'md5';
import moment from 'moment';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { bundle } from 'react-kinetic-core';
import { MainHeader } from '../../lib/react-adm-lte/src'

import * as constants from '../../constants';

import { actions as modalFormActions } from '../../redux/modules/modalForm';
import { actions as layoutActions } from '../../redux/modules/layout';
import { selectFeedbackFormConfig, selectHelpFormConfig } from '../../redux/modules/kinops'

const { User, UserHeader, UserBody, UserFooter } = MainHeader;
const { UserBodyItem, UserFooterItem } = MainHeader;


export const ProfileComponent = ({profile, toggleUser, isOpen, openForm, feedbackFormConfig, helpFormConfig }) => {
  return(
    <User
      open={isOpen}
      onToggle={toggleUser}
      imageUrl={`https://www.gravatar.com/avatar/${md5(profile.email || profile.username)}?d=mm`}
      label={profile.displayName || profile.username}
    >
      <UserHeader
        imageUrl={`https://www.gravatar.com/avatar/${md5(profile.email || profile.username)}?d=mm`}
        title={profile.displayName || profile.username}
        description={`Joined: ${moment(profile.createdAt).format(constants.TIME_FORMAT)}`} />
      <UserBody>
        <UserBodyItem href={`${bundle.spaceLocation()}?page=about`}>About</UserBodyItem>
        <UserBodyItem onClick={() => {openForm(feedbackFormConfig);toggleUser();}}>Feedback</UserBodyItem>
        <UserBodyItem onClick={() => {openForm(helpFormConfig);toggleUser();}}>Get Help</UserBodyItem>
      </UserBody>
      <UserFooter>
        <UserFooterItem
          href={`${bundle.spaceLocation()}?page=profile`}
          left
        >View Profile
        </UserFooterItem>
        <UserFooterItem
          href={`${bundle.spaceLocation()}/app/logout`}
          right>Sign out
        </UserFooterItem>
      </UserFooter>
    </User>
  );
}

export const mapStateToProps = state =>
  ({
    profile: state.kinops.profile,
    isOpen: state.layout.user.open,
    feedbackFormConfig: selectFeedbackFormConfig(state),
    helpFormConfig: selectHelpFormConfig(state),
  });

export const mapDispatchToProps = {
  openForm: modalFormActions.openForm,
  toggleUser: layoutActions.toggleUser,
};

export const Profile = compose(
  connect(mapStateToProps, mapDispatchToProps),
)(ProfileComponent);
