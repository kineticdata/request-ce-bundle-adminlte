import React from 'react';
import { connect } from 'react-redux';
import { Box } from  '../../lib/react-adm-lte/src';

import { FormCardSmall } from '../Forms/FormCard';

const { Body, Header } = Box;

const SuggestedServicesComponent = ({ forms, loading }) => {
  return (
    !loading &&
      <div className="col-md-4">
        <Box warning>
          <Header border title="Suggested Services"/>
          <Body>
            <ul className="products-list product-list-in-box">
            {
              forms
                .filter(form => form.categories.indexOf('home-page-services') > -1)
                .take(5)
                .map(form => <FormCardSmall form={form} key={form.slug} />)
            }
            </ul>
          </Body>
        </Box>
      </div>
  );
};

const mapStateToProps = state => ({
  loading: state.kinops.loading || state.categories.loading || state.forms.loading || state.submissions.loading,
  forms: state.forms.data,
});


export const SuggestedServices = connect(mapStateToProps)(SuggestedServicesComponent);
