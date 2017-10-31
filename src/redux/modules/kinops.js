import { Record, List } from 'immutable';
import { bundle } from 'react-kinetic-core';

import { namespace, noPayload, withPayload, getAttributeValue, isMemberOf, getTeams, getRoles } from '../../utils';

export const types = {
  // App
  LOAD_APP: namespace('kinops', 'LOAD_APP'),
  SET_APP: namespace('kinops', 'SET_APP'),
  // Modal Forms
  OPEN_FORM: namespace('kinops', 'OPEN_FORM'),
  CLOSE_FORM: namespace('kinops', 'CLOSE_FORM'),
  COMPLETE_FORM: namespace('kinops', 'COMPLETE_FORM'),
  // Alerts
  FETCH_ALERTS: namespace('kinops', 'FETCH_ALERTS'),
  SET_ALERTS: namespace('kinops', 'SET_ALERTS'),
  SET_ALERTS_ERROR: namespace('kinops', 'SET_ALERTS_ERROR'),
};

// Find a Kapp by Space Attribute Value
const kappBySpaceAttribute = (state, slugAttributeName) =>
  !state.kinops.loading ?
    state.kinops.kapps
      .find(kapp => kapp.slug === getAttributeValue(state.kinops.space, slugAttributeName, null ))
  : null;

// Kapp Selectors
export const selectCurrentKapp = state =>
  !state.kinops.loading ?
    state.kinops.kapps
      .find(kapp => kapp.slug === `${bundle.kappSlug()}`)
  : null;
export const selectAdminKapp = state => kappBySpaceAttribute(state, 'Admin Kapp Slug');
export const selectQueueKapp = state => kappBySpaceAttribute(state, 'Queue Kapp Slug');
export const selectServicesKapp = state => kappBySpaceAttribute(state, 'Catalog Kapp Slug');
export const selectTeamsKapp = state => kappBySpaceAttribute(state, 'Teams Kapp Slug');

// Role Selectors
export const selectHasRoleDataAdmin = state => !state.kinops.loading ? isMemberOf(state.kinops.profile, 'Role::Data Admin') : false;
export const selectHasRoleSubmissionSupport = state => !state.kinops.loading ? isMemberOf(state.kinops.profile, 'Role::Submission Support') : false;
export const selectHasAccessToManagement = state =>
  !state.kinops.loading ?
    state.kinops.profile.spaceAdmin || selectHasRoleDataAdmin(state) || getTeams(state.kinops.profile).length > 0
  : false;
export const selectHasAccessToSupport = state =>
  !state.kinops.loading ? (state.kinops.profile.spaceAdmin || selectHasRoleSubmissionSupport(state)) : false;
export const selectIsGuest = state =>
  !state.kinops.loading ? (state.kinops.profile.spaceAdmin === false && getRoles(state.profile).length === 0) : false;

// Kapp List Selectors
export const selectPredefinedKapps = state =>
  !state.kinops.loading ? [selectTeamsKapp(state), selectServicesKapp(state), selectQueueKapp(state)]
    .filter(kapp => kapp != null)
    .filter(kapp => kapp !== selectCurrentKapp(state))
    : [];
export const selectAdditionalKapps = state =>
  !state.kinops.loading ?
    state.kinops.kapps
      .filter(kapp => kapp !== selectAdminKapp(state) && !selectPredefinedKapps(state).includes(kapp))
      .filter(kapp => kapp !== selectCurrentKapp(state))
  : [];

// System Forms
export const selectFeedbackFormSlug = state =>
  !state.kinops.loading ?
    getAttributeValue(state.kinops.space, 'Feedback Form Slug', null )
  : 'feedback';

export const selectAlertsFormSlug = state =>
  !state.kinops.loading ?
    getAttributeValue(state.kinops.space, 'Alerts Form Slug', null )
  : null;

export const selectInviteOthersFormSlug = state =>
  !state.kinops.loading ?
    getAttributeValue(state.kinops.space, 'Invite Others Form Slug', null )
  : null;

export const selectRequestAlertFormSlug = state =>
  !state.kinops.loading ?
    getAttributeValue(state.kinops.space, 'Request Alert Form Slug', null )
  : null;

export const selectSuggestAServiceFormSlug = state =>
  !state.kinops.loading ?
    getAttributeValue(state.kinops.space, 'Suggest a Service Form Slug', null )
  : null;

export const selectHelpFormSlug = state =>
  !state.kinops.loading ?
    getAttributeValue(state.kinops.space, 'Help Form Slug', null )
  : 'help';

export const selectChangeManagerFormSlug = state =>
  !state.kinops.loading ?
    getAttributeValue(state.kinops.space, 'Change Manager Form Slug', null )
  : 'help';

// Form Config Selectors
export const selectFeedbackFormConfig = state =>
  !state.kinops.loading ?
    {
      formSlug: selectFeedbackFormSlug(state),
      kappSlug: selectAdminKapp(state).slug,
      title: 'Provide Feedback',
      confirmationMessage: 'Thanks for your feedback. We\'ll get that routed to the right team.',
    }
  : {};

// Form Config Selectors
export const selectHelpFormConfig = state =>
  !state.kinops.loading ?
    {
      formSlug: selectHelpFormSlug(state),
      kappSlug: selectAdminKapp(state).slug,
      title: 'Get Help',
      confirmationMessage: 'We\'ll get you a response as soon as possible.',
    }
  : {};

export const actions = {
  // App
  loadApp: noPayload(types.LOAD_APP),
  setApp: withPayload(types.SET_APP),
  // Modal Forms
  openForm: withPayload(types.OPEN_FORM),
  closeForm: noPayload(types.CLOSE_FORM),
  completeForm: noPayload(types.COMPLETE_FORM),
  // Alerts
  fetchAlerts: noPayload(types.FETCH_ALERTS),
  setAlerts: withPayload(types.SET_ALERTS),
  setAlertsError: withPayload(types.SET_ALERTS_ERROR),
};

export const State = Record({
  space: Record(),
  kapps: List(),
  profile: Record(),
  alerts: {
    loading: true,
    data: List(),
    error: null,
  },
  modal: Record({
    form: null,
    isCompleted: false,
  }),
  loading: true,
});

export const reducer = (state = State(), { type, payload }) => {
  switch (type) {
    case types.SET_APP:
      return state
        .set('space', payload.space)
        .set('kapps', payload.kapps)
        .set('profile', payload.profile)
        .set('alerts', {loading: false, data: List(payload.alerts), error: null})
        .set('loading', false)
    case types.OPEN_FORM:
      return state.modal
        .set('form', payload)
    case types.CLOSE_FORM:
      return state.modal
        .set('form', null)
        .set('isCompleted', false)
    case types.COMPLETE_FORM:
      return state.modal
        .set('isCompleted', false)
    case types.FETCH_ALERTS:
      return state
        .set('alerts', ...{loading: true})
    case types.SET_ALERTS:
      return state
        .set('alerts', {loading: false, data: List(payload), error: null})
    case types.SET_ALERTS_ERROR:
      return state.set('loading', false).set('error', payload);
    default:
      return state;
  }
};

export default reducer;
