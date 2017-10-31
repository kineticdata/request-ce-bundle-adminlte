import React from 'react';

export const Loading = ({ text }) =>
  <div className="loadingWrapper">
    <div className="loading">
      <div className="text-center">
        <i className="fa fa-spinner fa-spin fa-3x fa-fw m-b-2" />
        <p className="lead">
          { text || 'Loading...'}
        </p>
      </div>
    </div>
  </div>;
