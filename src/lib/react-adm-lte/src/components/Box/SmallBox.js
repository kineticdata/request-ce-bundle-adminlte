import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

const SmallBox = ({ boxColor, innerTitle, innerText, icon, linkTo, footerText }) =>
  <div className={classNames('small-box', boxColor || 'bg-agua')}>
    <div className="inner">
      <h3>{innerTitle}</h3>

      <p>{innerText}</p>
    </div>
    <div className="icon">
      <i className={classNames('fa', icon || 'fa-home')} />
    </div>
    { footerText &&
      <Link to={linkTo || '/'} className="small-box-footer">
        {footerText} <i className="fa fa-arrow-circle-right" />
      </Link>
    }
  </div>;

export default SmallBox;
