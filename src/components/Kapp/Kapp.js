import React from 'react';
import { connect } from 'react-redux';

import { HomePageSubmissions } from './HomePageSubmissions';
import { HeroImage } from './HeroImage';
import { SuggestedServices } from './SuggestedServices';

export const KappComponent = ({ loading }) => {
  return (
    !loading &&
    <div>
      <HeroImage />
      <section className="content">
        <div className="row">
          <HomePageSubmissions />
          <SuggestedServices />
        </div>
      </section>
    </div>
  );
};

const mapStateToProps = state => ({
  loading: state.kinops.loading || state.categories.loading || state.forms.loading || state.submissions.loading,
});

export const Kapp = connect(mapStateToProps)(KappComponent);
