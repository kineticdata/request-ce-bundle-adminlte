import React from 'react';
import { CoreForm } from 'react-kinetic-core';
import { PageHeader } from '../Common/PageHeader';
import { SERVICES_KAPP as kappSlug } from '../../constants';

// Asynchronously import the global dependencies that are used in the embedded
// forms. Note that we deliberately do this as a const so that it should start
// immediately without making the application wait but it will likely be ready
// before users nagivate to the actual forms.
const globals = import('../../globals');

export const buildBreadcrumbs = (form, category, submissionLabel, match) => {
  if (match.url.startsWith('/request')) {
    return [
      { title: 'My Requests', path: '/requests' },
      { title: submissionLabel },
    ];
  } else if (category) {
    return [
      { title: 'Categories', path: '/categories' },
      { title: category.name, path: `/categories/${category.slug}` },
      { title: form.name },
    ];
  } else {
    return [{ title: form.name }];
  }
};

export const Form =
  ({ form, category, submissionId, submissionLabel, submissionHandle, match, handleCreated, handleCompleted }) =>
    <div>
      <PageHeader
        title={form ? form.name : submissionLabel}
        subTitle={form ? form.description : submissionHandle}
        breadcrumbs={buildBreadcrumbs(form, category, submissionLabel, match)}
      />
      <div className="content">
        {
          submissionId ? (
            <CoreForm
              submission={submissionId}
              globals={globals}
              completed={handleCompleted}
            />
          ) : (
            <CoreForm
              kapp={kappSlug}
              form={form.slug}
              globals={globals}
              created={handleCreated}
              completed={handleCompleted}
            />
          )
        }
      </div>
    </div>;
