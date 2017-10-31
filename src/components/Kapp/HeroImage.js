import React from 'react';
import { connect } from 'react-redux';

import { getAttributeValue } from '../../helpers/utils';

const HeroImageComponent = ({ space, loading }) => {
  const bgImage = getAttributeValue('Background Image', space) ||
    'https://s3.amazonaws.com/kinops.io/registered-images/books.jpeg';

  return (
    !loading &&
    <div className="hero">
      <img className="hero-img" src={bgImage} alt='' />
      <div className="container">
        <div className="hero-content">
          <div className="hero-heading">
            Enterprise Request Management System for <small>{space.name}</small>
          </div>
        </div>
      </div>
    </div>
  );
};


const mapStateToProps = state => ({
  loading: state.kinops.loading || state.categories.loading || state.forms.loading || state.submissions.loading,
  space: state.kinops.space,
});


export const HeroImage = connect(mapStateToProps)(HeroImageComponent);
