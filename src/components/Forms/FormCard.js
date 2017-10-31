import React from 'react';
import { Link } from 'react-router-dom';

import { Box } from '../../lib/react-adm-lte/src';

const { Header, Body } = Box;

export const FormCardLarge = ({ form }) =>
  <Box solid>
    <Header border title={form.name}>
      <Link className="btn btn-primary pull-right" to={`/forms/${form.slug}`}>Request</Link>
    </Header>
    <Body>
      <div className="row">
        <div className="col-sm-2">
          <div className="icon">
            <i className={`fa fa-fw fa-3x ${form.icon}`} />
          </div>
        </div>
        <div className="col-sm-10">
          <dl className="dl-horizontal">
            <dt>Service Description:</dt>
            <dd>{form.description}</dd>
            <dt>Approval Required:</dt>
            <dd>{form.approval || 'None'}</dd>
            <dt>Charge for Service:</dt>
            <dd>{form.charge || 'Free of Charge'}</dd>
            <dt>Estimated Completion</dt>
            <dd>{form.daysDue || 'none provied'}</dd>
          </dl>
        </div>
      </div>
    </Body>
  </Box>;

export const FormCardSmall = ({ form }) =>
  <li className="item">
    <div className="product-img">
      <div className="icn-frame">
        <i className={`fa fa-fw fa-3x ${form.icon || 'fa-fontawesome'}`} />
      </div>
    </div>
    <div className="product-info">
      <Link to={`/forms/${form.slug}`}>{form.name}</Link>
      <span className="product-description">{form.description}</span>
    </div>
  </li>;
