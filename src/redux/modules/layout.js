export const types = {
  SIDEBAR_COLLAPSE: '@kd/adminlte/layout/SIDEBAR_COLLAPSE',
  TOP_NAV_COLLAPSE: '@kd/adminlte/layout/TOP_NAV_COLLAPSE',
  SIDEBAR_MINI_TOGGLE: '@kd/adminlte/layout/SIDEBAR_MINI_TOGGLE',
  BOXED_TOGGLE: '@kd/adminlte/layout/BOXED_TOGGLE',
  FIXED_TOGGLE: '@kd/adminlte/layout/FIXED_TOGGLE',
  TOP_NAVIGATION_TOGGLE: '@kd/adminlte/layout/TOP_NAVIGATION_TOGGLE',
  CHANGE_SKIN: '@kd/adminlte/layout/CHANGE_SKIN',
  MESSAGES_TOGGLE: '@kd/adminlte/mainHeader/MESSAGES_TOGGLE',
  NOTIFICATIONS_TOGGLE: '@kd/adminlte/mainHeader/NOTIFICATIONS_TOGGLE',
  TASKS_TOGGLE: '@kd/adminlte/mainHeader/TASKS_TOGGLE',
  KAPPS_TOGGLE: '@kd/adminlte/mainHeader/KAPPS_TOGGLE',
  CATEGORIES_TOGGLE: '@kd/adminlte/mainHeader/CATEGORIES_TOGGLE',
  USER_TOGGLE: '@kd/adminlte/mainHeader/USER_TOGGLE',
};

export const actions = {
  toggleSidebarCollapse: () => ({ type: types.SIDEBAR_COLLAPSE }),
  toggleTopNavCollapse: () => ({ type: types.TOP_NAV_COLLAPSE }),
  toggleSidebarMini: () => ({ type: types.SIDEBAR_MINI_TOGGLE }),
  toggleBoxed: () => ({ type: types.BOXED_TOGGLE }),
  toggleFixed: () => ({ type: types.FIXED_TOGGLE }),
  toggleTopNavigation: () => ({ type: types.TOP_NAVIGATION_TOGGLE }),
  changeSkin: skin => ({ type: types.CHANGE_SKIN, payload: skin }),
  toggleMessages: () => ({ type: types.MESSAGES_TOGGLE }),
  toggleNotifications: () => ({ type: types.NOTIFICATIONS_TOGGLE }),
  toggleTasks: () => ({ type: types.TASKS_TOGGLE }),
  toggleKapps: () => ({ type: types.KAPPS_TOGGLE }),
  toggleCategories: () => ({ type: types.CATEGORIES_TOGGLE }),
  toggleUser: () => ({ type: types.USER_TOGGLE }),
};

export const defaultState = {
  hydrated: false,
  sidebarCollapsed: false,
  topNavCollapsed: true,
  sidebarMini: true,
  boxed: false,
  fixed: true,
  topNavigation: false,
  skin: 'skin-blue-light',
  messages: {
    open: false
  },
  notifications: {
    open: false
  },
  tasks: {
    open: false
  },
  kapps: {
    open: false
  },
  categories: {
    open: false
  },
  user: {
    open: false
  }
};

const reducer = (state = defaultState, action) => {
  if (!state.hydrated) {
    state = {...defaultState, ...state, hydrated: true}
  }
  switch (action.type) {
    case types.SIDEBAR_COLLAPSE:
      return { ...state, sidebarCollapsed: !state.sidebarCollapsed };
    case types.TOP_NAV_COLLAPSE:
      return { ...state, topNavCollapsed: !state.topNavCollapsed };
    case types.SIDEBAR_MINI_TOGGLE:
      return { ...state, sidebarMini: !state.sidebarMini };
    case types.BOXED_TOGGLE:
      return { ...state, boxed: !state.boxed };
    case types.FIXED_TOGGLE:
      return { ...state, fixed: !state.fixed };
    case types.TOP_NAVIGATION_TOGGLE:
      const shouldBeCollapsed = state.topNavigation ? false : true;
      return { ...state, topNavigation: !state.topNavigation, sidebarCollapsed: shouldBeCollapsed, sidebarMini: !shouldBeCollapsed };
    case types.CHANGE_SKIN:
      return { ...state, skin: action.payload };
    case types.MESSAGES_TOGGLE:
      return {
        ...state,
        messages: {
          ...state.messages,
          open: !state.messages.open
        }
      }
    case types.NOTIFICATIONS_TOGGLE:
      return {
        ...state,
        notifications: {
          ...state.notifications,
          open: !state.notifications.open
        }
      }
    case types.TASKS_TOGGLE:
      return {
        ...state,
        tasks: {
          ...state.tasks,
          open: !state.tasks.open
        }
      }
    case types.KAPPS_TOGGLE:
      return {
        ...state,
        kapps: {
          ...state.kapps,
          open: !state.kapps.open
        }
      }
    case types.CATEGORIES_TOGGLE:
      return {
        ...state,
        categories: {
          ...state.categories,
          open: !state.categories.open
        }
      }
    case types.USER_TOGGLE:
      return {
        ...state,
        user: {
          ...state.user,
          open: !state.user.open
        }
      }
    default:
      return state;
  }
};

export default reducer;
