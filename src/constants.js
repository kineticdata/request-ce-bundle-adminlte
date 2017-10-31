// Kapp slugs
export const SERVICES_KAPP = 'services';
export const ADMIN_KAPP = 'admin';

// Form slugs
export const CANCEL_FORM = 'request-to-cancel';
export const COMMENT_FORM = 'comment';
export const FEEDBACK_FORM = 'feedback';
export const HELP_FORM = 'help';

// Attribute names
export const STATUSES_ACTIVE = 'Statuses - Active';
export const STATUSES_INACTIVE = 'Statuses - Inactive';
export const STATUSES_CANCELLED = 'Statuses - Cancelled';
export const ATTRIBUTE_ICON = 'Icon';
export const ATTRIBUTE_ORDER = 'Sort Order';
export const ATTRIBUTE_PARENT = 'Parent';
export const ATTRIBUTE_SERVICE_DAYS_DUE = 'Service Days Due';
export const ATTRIBUTE_SERVICE_OWNING_TEAM = 'Service Owning Team';

// Field names
export const STATUS_FIELD = 'Status';
export const REQUESTED_BY_FIELD = 'Requested By';
export const REQUESTED_FOR_FIELD = 'Requested For';
export const REQUESTED_BY_DISPLAY_NAME_FIELD = 'Requested By Display Name';
export const REQUESTED_FOR_DISPLAY_NAME_FIELD = 'Requested For Display Name';

// Class names
export const DEFAULT_LABEL_CLASS = 'label-default';
export const WARNING_LABEL_CLASS = 'label-warning';
export const SUCCESS_LABEL_CLASS = 'label-success';
export const DANGER_LABEL_CLASS = 'label-danger';

// App values
export const CORE_STATE_DRAFT = 'Draft';
export const CORE_STATE_SUBMITTED = 'Submitted';
export const CORE_STATE_CLOSED = 'Closed';

// Misc config
export const SUBMISSION_COUNT_LIMIT = 1000;
export const SUBMISSION_FORM_TYPE = 'Service';
export const PAGE_SIZE = 10;
export const TIME_AGO_INTERVAL = 10000;
export const TIME_FORMAT = 'MMMM D, YYYY h:mm A';
export const DEFAULT_FORM_ICON = 'fa-sticky-note-o';
export const DEFAULT_CATEGORY_ICON = 'fa-cube';

// Utility forms
export const FEEDBACK_FORM_CONFIG = {
  formSlug: FEEDBACK_FORM,
  kappSlug: ADMIN_KAPP,
  title: 'Provide Feedback',
  confirmationMessage: 'Thanks for your feedback. We\'ll get that routed to the right team.',
};
export const COMMENT_FORM_CONFIG = {
  formSlug: COMMENT_FORM,
  kappSlug: SERVICES_KAPP,
  title: 'Add Comment',
  confirmationMessage: 'Your comment has been submitted.',
};
export const CANCEL_FORM_CONFIG = {
  formSlug: CANCEL_FORM,
  kappSlug: SERVICES_KAPP,
  title: 'Cancel Request',
  confirmationMessage: 'Your cancellation request has been received.',
};
export const HELP_FORM_CONFIG = {
  formSlug: HELP_FORM,
  kappSlug: ADMIN_KAPP,
  title: 'Get Help',
  confirmationMessage: 'We\'ll get you a response as soon as possible.',
};
